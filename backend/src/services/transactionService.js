const db = require('../db');

const HOLD_SETTING_KEY = 'minimum_hold_balance';

function safeNumber(value) {
  return Number(value) || 0;
}

function calculateAvailableBalance(saldo, saldoHold) {
  return Math.max(safeNumber(saldo) - safeNumber(saldoHold), 0);
}

async function getMinimumHoldBalance() {
  const [rows] = await db.query(
    'SELECT setting_value FROM app_settings WHERE setting_key = ?',
    [HOLD_SETTING_KEY],
  );

  if (rows.length === 0) {
    return 50000;
  }

  return safeNumber(rows[0].setting_value);
}

async function setMinimumHoldBalance(amount) {
  await db.query(
    `INSERT INTO app_settings (setting_key, setting_value)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
    [HOLD_SETTING_KEY, String(amount)],
  );
  return safeNumber(amount);
}

async function getUserBalance(userId) {
  const [rows] = await db.query(
    'SELECT saldo, saldo_hold FROM users WHERE id = ?',
    [userId],
  );

  if (rows.length === 0) {
    throw new Error('User not found');
  }

  const saldo = safeNumber(rows[0].saldo);
  const saldo_hold = safeNumber(rows[0].saldo_hold);
  const available_balance = calculateAvailableBalance(saldo, saldo_hold);

  return {
    total_balance: saldo,
    hold_balance: saldo_hold,
    available_balance,
  };
}

async function getUserTransactions(userId) {
  const [rows] = await db.query(
    `SELECT st.*, u.nama AS approved_by_name, c.nama AS created_by_name, o.address, o.status as order_status
     FROM saldo_transactions st
     LEFT JOIN users u ON st.approved_by = u.id
     LEFT JOIN users c ON st.created_by = c.id
     LEFT JOIN orders o ON st.order_id = o.id
     WHERE st.user_id = ?
     ORDER BY st.created_at DESC`,
    [userId],
  );

  return rows;
}

async function getPendingTransactions() {
  const [rows] = await db.query(
    `SELECT st.*, u.nama AS user_name, u.email AS user_email, o.address, o.status as order_status
     FROM saldo_transactions st
     JOIN users u ON st.user_id = u.id
     LEFT JOIN orders o ON st.order_id = o.id
     WHERE st.status = 'pending'
     ORDER BY st.created_at DESC`,
  );

  return rows;
}

async function getAllTransactions() {
  const [rows] = await db.query(
    `SELECT st.*, u.nama AS user_name, o.address, o.status as order_status
     FROM saldo_transactions st
     LEFT JOIN users u ON st.user_id = u.id
     LEFT JOIN orders o ON st.order_id = o.id
     ORDER BY st.created_at DESC`,
  );

  return rows;
}

async function getHoldSummary() {
  const [rows] = await db.query(
    `SELECT
      COALESCE(SUM(saldo_hold), 0) AS total_hold,
      COALESCE(SUM(saldo), 0) AS total_balance
     FROM users
     WHERE role = 'user'`,
  );

  return {
    total_hold: safeNumber(rows[0].total_hold),
    total_balance: safeNumber(rows[0].total_balance),
  };
}

async function createPendingTransaction(userId, orderId, amount, description, createdBy) {
  const [existing] = await db.query(
    `SELECT id FROM saldo_transactions
     WHERE order_id = ? AND type = 'waste_income' AND status = 'pending' LIMIT 1`,
    [orderId],
  );

  if (existing.length > 0) {
    return existing[0].id;
  }

  const [insertResult] = await db.query(
    `INSERT INTO saldo_transactions
     (user_id, order_id, type, amount, status, description, created_by, created_at)
     VALUES (?, ?, 'waste_income', ?, 'pending', ?, ?, NOW())`,
    [userId, orderId, amount, description, createdBy],
  );

  return insertResult.insertId;
}

async function approveTransaction(transactionId, adminId) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [rows] = await connection.query(
      'SELECT * FROM saldo_transactions WHERE id = ? FOR UPDATE',
      [transactionId],
    );
    if (rows.length === 0) {
      throw new Error('Transaction not found');
    }

    const tx = rows[0];
    if (tx.status !== 'pending') {
      throw new Error('Transaction is not pending');
    }

    const [userRows] = await connection.query(
      'SELECT saldo, saldo_hold FROM users WHERE id = ? FOR UPDATE',
      [tx.user_id],
    );
    if (userRows.length === 0) {
      throw new Error('User not found');
    }

    const currentSaldo = safeNumber(userRows[0].saldo);
    const newSaldo = currentSaldo + safeNumber(tx.amount);
    const minimumHold = await getMinimumHoldBalance();
    const newHold = Math.min(newSaldo, minimumHold);

    await connection.query(
      'UPDATE users SET saldo = ?, saldo_hold = ? WHERE id = ?',
      [newSaldo, newHold, tx.user_id],
    );

    if (tx.order_id) {
      await connection.query('UPDATE orders SET status = ? WHERE id = ?', ['approved', tx.order_id]);
    }

    await connection.query(
      'UPDATE saldo_transactions SET status = ?, approved_by = ? WHERE id = ?',
      ['approved', adminId, transactionId],
    );

    await connection.commit();

    return {
      total_balance: newSaldo,
      hold_balance: newHold,
      available_balance: calculateAvailableBalance(newSaldo, newHold),
    };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

async function rejectTransaction(transactionId, adminId) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [rows] = await connection.query(
      'SELECT * FROM saldo_transactions WHERE id = ? FOR UPDATE',
      [transactionId],
    );
    if (rows.length === 0) {
      throw new Error('Transaction not found');
    }

    const tx = rows[0];
    if (tx.status !== 'pending') {
      throw new Error('Transaction is not pending');
    }

    if (tx.order_id) {
      await connection.query('UPDATE orders SET status = ? WHERE id = ?', ['rejected', tx.order_id]);
    }

    await connection.query(
      'UPDATE saldo_transactions SET status = ?, approved_by = ? WHERE id = ?',
      ['rejected', adminId, transactionId],
    );

    await connection.commit();
    return {
      status: 'rejected',
    };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

async function topupUser(userId, amount, description, adminId) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [userRows] = await connection.query(
      'SELECT saldo, saldo_hold FROM users WHERE id = ? FOR UPDATE',
      [userId],
    );
    if (userRows.length === 0) {
      throw new Error('User not found');
    }

    const currentSaldo = safeNumber(userRows[0].saldo);
    const newSaldo = currentSaldo + safeNumber(amount);
    const minimumHold = await getMinimumHoldBalance();
    const newHold = Math.min(newSaldo, minimumHold);

    await connection.query(
      'UPDATE users SET saldo = ?, saldo_hold = ? WHERE id = ?',
      [newSaldo, newHold, userId],
    );

    await connection.query(
      `INSERT INTO saldo_transactions
       (user_id, order_id, type, amount, status, description, created_by, approved_by, created_at)
       VALUES (?, NULL, 'topup_manual', ?, 'approved', ?, ?, ?, NOW())`,
      [userId, amount, description || 'Top up manual', adminId, adminId],
    );

    await connection.commit();

    return {
      total_balance: newSaldo,
      hold_balance: newHold,
      available_balance: calculateAvailableBalance(newSaldo, newHold),
    };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

module.exports = {
  getUserBalance,
  getUserTransactions,
  getPendingTransactions,
  getAllTransactions,
  getHoldSummary,
  getMinimumHoldBalance,
  setMinimumHoldBalance,
  createPendingTransaction,
  approveTransaction,
  rejectTransaction,
  topupUser,
};
