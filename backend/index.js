require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/db');
const transactionService = require('./src/services/transactionService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Initialize DB and seed accounts
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('DB Connected');
    connection.release();
    await seedDefaultAccounts();
  } catch (err) {
    console.error('DB Error:', err);
  }
})();

db.on('error', (err) => {
  console.error('DB pool error', err);
});

// ================= SEED =================
async function seedDefaultAccounts() {
  const users = [
    {
      nama: 'Petugas Demo',
      email: 'petugas@test.com',
      password: '123456',
      role: 'driver',
      nomor_hp: '081234567890',
    },
    {
      nama: 'User Demo',
      email: 'user@test.com',
      password: '123456',
      role: 'user',
      nomor_hp: '081234567891',
    },
    {
      nama: 'Admin Demo',
      email: 'admin@test.com',
      password: '123456',
      role: 'admin',
      nomor_hp: '081234567892',
    },
  ];

  for (const u of users) {
    try {
      const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [u.email]);
      if (existing.length === 0) {
        await db.query(
          'INSERT INTO users (nama,email,password,role,nomor_hp) VALUES (?,?,?,?,?)',
          [u.nama, u.email, u.password, u.role, u.nomor_hp],
        );
      }
    } catch (err) {
      console.error('Seed error for user', u.email, err);
    }
  }

  // Create harga_sampah table if not exists
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS harga_sampah (
        id INT AUTO_INCREMENT PRIMARY KEY,
        jenis VARCHAR(50) NOT NULL,
        sub_jenis VARCHAR(100) NOT NULL,
        harga INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Seed initial data if table is empty
    const [existing] = await db.query('SELECT COUNT(*) as count FROM harga_sampah');
    if (existing[0].count === 0) {
      const initialData = [
        { jenis: 'anorganik', sub_jenis: 'Botol Plastik PET', harga: 4000 },
        { jenis: 'anorganik', sub_jenis: 'Kardus', harga: 2000 },
        { jenis: 'anorganik', sub_jenis: 'Besi', harga: 5000 },
        { jenis: 'anorganik', sub_jenis: 'Kaleng', harga: 4500 },
        { jenis: 'organik', sub_jenis: 'Daun', harga: 500 },
        { jenis: 'organik', sub_jenis: 'Sisa Makanan', harga: 300 },
        { jenis: 'elektronik', sub_jenis: 'Kabel Bekas', harga: 2000 },
        { jenis: 'elektronik', sub_jenis: 'Charger Bekas', harga: 1500 },
      ];
      
      for (const item of initialData) {
        await db.query(
          'INSERT INTO harga_sampah (jenis, sub_jenis, harga) VALUES (?, ?, ?)',
          [item.jenis, item.sub_jenis, item.harga]
        );
      }
      console.log('Seeded harga_sampah table with initial data');
    }
  } catch (err) {
    console.error('Error creating harga_sampah table:', err);
  }

  // Ensure orders table has columns needed for completed order details
  try {
    const [orderColumns] = await db.query("SHOW COLUMNS FROM orders");
    const columnNames = orderColumns.map(col => col.Field);

    if (!columnNames.includes('sampah_data')) {
      await db.query('ALTER TABLE orders ADD COLUMN sampah_data LONGTEXT NULL');
    }
    if (!columnNames.includes('total_berat')) {
      await db.query('ALTER TABLE orders ADD COLUMN total_berat DECIMAL(10,2) NULL');
    }
    if (!columnNames.includes('total_harga')) {
      await db.query('ALTER TABLE orders ADD COLUMN total_harga INT NULL');
    }

    const [statusColumn] = await db.query("SHOW COLUMNS FROM orders WHERE Field = 'status'");
    if (statusColumn.length > 0) {
      const statusType = statusColumn[0].Type;
      if (!statusType.includes('approved') || !statusType.includes('rejected')) {
        await db.query(`ALTER TABLE orders MODIFY status ENUM('pending','searching_driver','assigned','on_the_way','arrived','completed','cancelled','approved','rejected') COLLATE utf8mb4_general_ci DEFAULT 'pending'`);
      }
    }

    console.log('Ensured orders table has sampah_data, total_berat, total_harga columns and status enum includes approved/rejected');
  } catch (err) {
    console.error('Error ensuring orders schema:', err);
  }

  // Ensure users table has saldo and saldo_hold columns
  try {
    const [userColumns] = await db.query('SHOW COLUMNS FROM users');
    const userColumnNames = userColumns.map(col => col.Field);

    if (!userColumnNames.includes('saldo')) {
      await db.query('ALTER TABLE users ADD COLUMN saldo DECIMAL(15,2) NOT NULL DEFAULT 0 AFTER role');
    }
    if (!userColumnNames.includes('saldo_hold')) {
      await db.query('ALTER TABLE users ADD COLUMN saldo_hold DECIMAL(15,2) NOT NULL DEFAULT 0 AFTER saldo');
    }

    const minimumHold = 50000;
    await db.query('UPDATE users SET saldo_hold = LEAST(saldo, ?) WHERE saldo_hold = 0', [minimumHold]);
    console.log('Ensured users table has saldo and saldo_hold columns');
  } catch (err) {
    console.error('Error ensuring users schema:', err);
  }

  // Ensure case table app_settings and saldo_transactions exists
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS app_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `);
    const [settingRows] = await db.query('SELECT COUNT(*) as count FROM app_settings WHERE setting_key = ?', ['minimum_hold_balance']);
    if (settingRows[0].count === 0) {
      await db.query('INSERT INTO app_settings (setting_key, setting_value) VALUES (?, ?)', ['minimum_hold_balance', '50000']);
    }

    await db.query(`
      CREATE TABLE IF NOT EXISTS saldo_transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        order_id INT NULL,
        type ENUM('waste_income','topup_manual','withdraw','adjustment','penalty') NOT NULL,
        amount DECIMAL(15,2) NOT NULL,
        status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
        description TEXT NULL,
        created_by INT NULL,
        approved_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `);
    console.log('Ensured app_settings and saldo_transactions tables exist');
  } catch (err) {
    console.error('Error ensuring saldo schema:', err);
  }
}

// ================= BASIC =================
app.get('/', (req, res) => {
  res.send('API jalan 🚀');
});

app.get('/ping', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/user/balance/:id', async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) {
    return res.status(400).json({ status: 'fail', message: 'User id tidak valid' });
  }

  try {
    const balance = await transactionService.getUserBalance(userId);
    res.json(balance);
  } catch (err) {
    if (err.message === 'User not found') {
      return res.status(404).json({ status: 'fail', message: 'User tidak ditemukan' });
    }
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/user/transactions/:id', async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) {
    return res.status(400).json({ status: 'fail', message: 'User id tidak valid' });
  }

  try {
    const transactions = await transactionService.getUserTransactions(userId);
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/admin/pending-transactions', async (req, res) => {
  try {
    const transactions = await transactionService.getPendingTransactions();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/admin/transactions', async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/admin/hold-summary', async (req, res) => {
  try {
    const summary = await transactionService.getHoldSummary();
    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/admin/settings/hold-balance', async (req, res) => {
  try {
    const amount = await transactionService.getMinimumHoldBalance();
    res.json({ minimum_hold_balance: amount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.patch('/admin/settings/hold-balance', async (req, res) => {
  try {
    const { amount } = req.body;
    if (amount == null || Number(amount) <= 0) {
      return res.status(400).json({ status: 'fail', message: 'amount wajib lebih besar dari 0' });
    }

    const updated = await transactionService.setMinimumHoldBalance(Number(amount));
    res.json({ status: 'success', minimum_hold_balance: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.post('/admin/topup', async (req, res) => {
  try {
    const { user_id, amount, description, admin_id } = req.body;
    if (!user_id || amount == null || Number(amount) <= 0) {
      return res.status(400).json({ status: 'fail', message: 'user_id dan amount positif wajib diisi' });
    }

    const result = await transactionService.topupUser(Number(user_id), Number(amount), description || 'Top up manual', admin_id || null);
    res.json({ status: 'success', message: 'Top up berhasil', balance: result });
  } catch (err) {
    if (err.message === 'User not found') {
      return res.status(404).json({ status: 'fail', message: 'User tidak ditemukan' });
    }
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.patch('/admin/approve-transaction/:id', async (req, res) => {
  try {
    const transactionId = Number(req.params.id);
    const { admin_id } = req.body;

    if (!transactionId) {
      return res.status(400).json({ status: 'fail', message: 'Transaction id tidak valid' });
    }

    const balance = await transactionService.approveTransaction(transactionId, admin_id || null);
    res.json({ status: 'success', message: 'Transaksi disetujui', balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.patch('/admin/reject-transaction/:id', async (req, res) => {
  try {
    const transactionId = Number(req.params.id);
    const { admin_id } = req.body;

    if (!transactionId) {
      return res.status(400).json({ status: 'fail', message: 'Transaction id tidak valid' });
    }

    const result = await transactionService.rejectTransaction(transactionId, admin_id || null);
    res.json({ status: 'success', message: 'Transaksi ditolak', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});


// ================= AUTH =================
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email dan password wajib diisi'
      });
    }

    // Check if email is actually an email or username
    let query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    let params = [email, password];

    // If not found, try as username (nama)
    const [result] = await db.query(query, params);
    if (result.length === 0) {
      query = 'SELECT * FROM users WHERE nama = ? AND password = ?';
      const [result2] = await db.query(query, [email, password]);
      if (result2.length > 0) {
        res.json({
          status: 'success',
          id: result2[0].id,
          nama: result2[0].nama,
          role: result2[0].role,
        });
        return;
      }
    } else {
      res.json({
        status: 'success',
        id: result[0].id,
        nama: result[0].nama,
        role: result[0].role,
      });
      return;
    }

    res.json({ status: 'fail' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { nama, email, password, role, nomor_hp } = req.body;

    await db.query(
      'INSERT INTO users (nama,email,password,role,nomor_hp) VALUES (?,?,?,?,?)',
      [nama, email, password, role, nomor_hp],
    );

    res.json({ status: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ================= HARGA =================
app.get('/harga/:jenis', async (req, res) => {
  try {
    const jenis = req.params.jenis;

    const [result] = await db.query(
      'SELECT id, sub_jenis, harga FROM harga_sampah WHERE jenis = ?',
      [jenis],
    );

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/harga/:jenis/:sub', async (req, res) => {
  try {
    const jenis = req.params.jenis;
    const sub = req.params.sub;

    const [result] = await db.query(
      'SELECT id, sub_jenis, harga FROM harga_sampah WHERE jenis = ? AND sub_jenis = ?',
      [jenis, sub],
    );

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /harga - Add new waste type
app.post('/harga', async (req, res) => {
  try {
    const { jenis, sub_jenis, harga } = req.body;

    if (!jenis || !sub_jenis || harga == null) {
      return res.status(400).json({ status: 'fail', message: 'jenis, sub_jenis, harga wajib diisi' });
    }

    await db.query(
      'INSERT INTO harga_sampah (jenis, sub_jenis, harga) VALUES (?, ?, ?)',
      [jenis, sub_jenis, harga],
    );

    res.json({ status: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// PUT /harga/:id - Update waste type
app.put('/harga/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { jenis, sub_jenis, harga } = req.body;

    if (!jenis || !sub_jenis || harga == null) {
      return res.status(400).json({ status: 'fail', message: 'jenis, sub_jenis, harga wajib diisi' });
    }

    const [result] = await db.query(
      'UPDATE harga_sampah SET jenis = ?, sub_jenis = ?, harga = ? WHERE id = ?',
      [jenis, sub_jenis, harga, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'fail', message: 'Harga sampah tidak ditemukan' });
    }

    res.json({ status: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// DELETE /harga/:id - Delete waste type
app.delete('/harga/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await db.query(
      'DELETE FROM harga_sampah WHERE id = ?',
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'fail', message: 'Harga sampah tidak ditemukan' });
    }

    res.json({ status: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ================= USERS =================
app.get('/users/role/:role', async (req, res) => {
  try {
    const role = req.params.role;

    const [result] = await db.query(
      'SELECT id, nama, email, nomor_hp FROM users WHERE role = ?',
      [role],
    );

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ================= STATS =================
app.get('/stats/dashboard', async (req, res) => {
  try {
    // Total active orders (pending + assigned + on_the_way + arrived)
    const [activeOrders] = await db.query(
      "SELECT COUNT(*) as total FROM orders WHERE status IN ('pending', 'assigned', 'on_the_way', 'arrived')"
    );

    // Total petugas (drivers)
    const [totalPetugas] = await db.query(
      "SELECT COUNT(*) as total FROM users WHERE role = 'driver'"
    );

    // Total sampah (sum of berat from completed orders or something, but since no berat, maybe count completed orders)
    // Assuming we need total weight, but since not stored, perhaps sum from transactions or estimate
    // For now, let's say total completed orders as "total sampah"
    const [totalSampah] = await db.query(
      "SELECT COUNT(*) as total FROM orders WHERE status = 'completed'"
    );

    // Riwayat (total completed orders)
    const [riwayat] = await db.query(
      "SELECT COUNT(*) as total FROM orders WHERE status = 'completed'"
    );

    res.json({
      totalOrders: activeOrders[0].total,
      totalPetugas: totalPetugas[0].total,
      totalSampah: totalSampah[0].total, // placeholder
      riwayat: riwayat[0].total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// New endpoint for total users with all roles
app.get('/stats/total-users', async (req, res) => {
  console.log('Endpoint /stats/total-users called');
  try {
    const [totalUsers] = await db.query(
      "SELECT COUNT(*) as total FROM users"
    );

    console.log('Total users result:', totalUsers);
    res.json({
      totalUsers: totalUsers[0].total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// New endpoint for daily transactions (resets at midnight)
app.get('/stats/daily-transactions', async (req, res) => {
  try {
    const [dailyTransactions] = await db.query(
      "SELECT SUM(amount) as total FROM saldo_transactions WHERE DATE(created_at) = CURDATE() AND status = 'approved'"
    );

    res.json({
      dailyTransactions: dailyTransactions[0].total || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /orders/recent - Get recent orders for dashboard
app.get('/orders/recent', async (req, res) => {
  try {
    const [recentOrders] = await db.query(
      "SELECT id, status, created_at FROM orders ORDER BY created_at DESC LIMIT 10"
    );

    const formatted = recentOrders.map(order => ({
      judul: `Order #${order.id} - ${order.status}`,
      waktu: new Date(order.created_at).toLocaleString(),
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /orders/user/:userId - Get orders for specific user
app.get('/orders/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const [userOrders] = await db.query(
      "SELECT id, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 10",
      [userId]
    );

    res.json(userOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ================= CREATE ORDER =================
app.post('/orders', async (req, res) => {
  try {
    const { user_id, address, user_lat, user_lng, jenis_sampah, catatan } = req.body;

    const sql = `
      INSERT INTO orders (user_id, address, user_lat, user_lng, jenis_sampah, catatan, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;

    const [result] = await db.query(sql, [user_id, address, user_lat, user_lng, jenis_sampah, catatan]);

    res.json({ status: 'success', order_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ================= LIST ORDER =================
app.get('/orders/pending', async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT o.*, u.nama as user_name FROM orders o JOIN users u ON o.user_id = u.id WHERE o.status = 'pending'"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ================= ORDER DETAIL =================
app.get('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;

    const [result] = await db.query(
      'SELECT id, user_id, driver_id, address, user_lat, user_lng, jenis_sampah, catatan, status, sampah_data, total_berat, total_harga FROM orders WHERE id = ?',
      [orderId],
    );

    if (result.length === 0) {
      return res.status(404).json({ status: 'fail' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ================= ACCEPT ORDER =================
app.patch('/orders/accept/:id', async (req, res) => {
  try {
    const { driver_id } = req.body;
    const orderId = req.params.id;

    const sql = `
      UPDATE orders
      SET driver_id = ?, status = 'assigned'
      WHERE id = ? AND status = 'pending'
    `;

    const [result] = await db.query(sql, [driver_id, orderId]);

    if (result.affectedRows === 0) {
      return res.status(400).json({ status: 'fail', message: 'Order sudah diambil' });
    }

    res.json({ status: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ================= UPDATE STATUS =================
app.patch('/orders/status/:id', async (req, res) => {
  let connection;
  try {
    const { driver_id, status, sampah_data, total_berat, total_harga } = req.body;
    const orderId = req.params.id;

    const allowed = ['assigned', 'on_the_way', 'arrived', 'completed'];

    if (!driver_id || !status) {
      return res.status(400).json({ status: 'fail', message: 'driver_id dan status wajib diisi' });
    }

    if (!allowed.includes(status)) {
      return res.status(400).json({ status: 'fail', message: 'Status tidak valid' });
    }

    connection = await db.getConnection();
    await connection.beginTransaction();

    const [orderResult] = await connection.query('SELECT driver_id, status, user_id FROM orders WHERE id = ? FOR UPDATE', [orderId]);
    if (orderResult.length === 0) {
      await connection.rollback();
      return res.status(404).json({ status: 'fail', message: 'Order tidak ditemukan' });
    }

    const order = orderResult[0];
    if (order.driver_id !== driver_id) {
      await connection.rollback();
      return res.status(403).json({ status: 'fail', message: 'Driver tidak terdaftar untuk order ini' });
    }

    const transitions = {
      pending: ['assigned'],
      assigned: ['on_the_way', 'arrived', 'completed'],
      on_the_way: ['arrived', 'completed'],
      arrived: ['completed'],
      completed: [],
      cancelled: [],
      approved: [],
      rejected: [],
    };

    if (!transitions[order.status]?.includes(status)) {
      await connection.rollback();
      return res.status(400).json({ status: 'fail', message: `Transisi status tidak diperbolehkan dari ${order.status} ke ${status}` });
    }

    if (status === 'completed') {
      if (!sampah_data || total_berat == null || total_harga == null) {
        await connection.rollback();
        return res.status(400).json({ status: 'fail', message: 'sampah_data, total_berat, total_harga wajib diisi saat menyelesaikan order' });
      }

      await connection.query(
        'UPDATE orders SET status = ?, sampah_data = ?, total_berat = ?, total_harga = ? WHERE id = ?',
        [status, JSON.stringify(sampah_data), total_berat, total_harga, orderId],
      );

      await transactionService.createPendingTransaction(
        order.user_id,
        orderId,
        total_harga,
        `Transaksi sampah order #${orderId}`,
        driver_id,
      );
    } else {
      await connection.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
    }

    await connection.commit();
    res.json({ status: 'success', message: 'Status order berhasil diperbarui' });
  } catch (err) {
    if (connection) await connection.rollback();
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  } finally {
    if (connection) connection.release();
  }
});

// ================= DRIVER LOCATION =================
app.post('/driver/location', async (req, res) => {
  try {
    const { driver_id, order_id, lat, lng } = req.body;

    if (!driver_id || !order_id || lat == null || lng == null) {
      return res.status(400).json({ status: 'fail', message: 'driver_id, order_id, lat, lng wajib diisi' });
    }

    const [result] = await db.query(
      'SELECT driver_id, status FROM orders WHERE id = ?',
      [order_id],
    );

    if (result.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Order tidak ditemukan' });
    }

    const order = result[0];

    if (order.driver_id !== driver_id) {
      return res.status(403).json({ status: 'fail', message: 'Driver tidak sesuai order' });
    }

    if (!['assigned', 'on_the_way', 'arrived'].includes(order.status)) {
      return res.status(400).json({ status: 'fail', message: 'Order belum aktif atau tidak dalam status yang boleh dikirim lokasi' });
    }

    await db.query(
      'INSERT INTO driver_locations (driver_id, order_id, lat, lng) VALUES (?, ?, ?, ?)',
      [driver_id, order_id, lat, lng],
    );

    res.json({ status: 'success', message: 'Lokasi driver tersimpan' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ================= TRACKING =================
app.get('/tracking/:order_id', async (req, res) => {
  try {
    const orderId = req.params.order_id;

    const [orderResult] = await db.query('SELECT id, driver_id, status, user_lat, user_lng, address FROM orders WHERE id = ?', [orderId]);

    if (orderResult.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Order tidak ditemukan' });
    }

    const order = orderResult[0];

    const [locations] = await db.query(
      `SELECT lat, lng, created_at
       FROM driver_locations
       WHERE order_id = ?
       ORDER BY created_at ASC`,
      [orderId],
    );

    const [driverRows] = await db.query(
      'SELECT nama, nomor_hp FROM users WHERE id = ?',
      [order.driver_id],
    );

    const driverInfo = driverRows[0] || {};
    const latestDriverLocation = locations.length ? locations[locations.length - 1] : null;

    console.log('DRIVER LOCATION:', latestDriverLocation?.lat, latestDriverLocation?.lng);
    console.log('USER LOCATION:', order.user_lat, order.user_lng);

    res.json({
      status: 'success',
      order_status: order.status,
      driver_id: order.driver_id,
      driver_name: driverInfo.nama || 'Petugas',
      driver_phone: driverInfo.nomor_hp || '-',
      user_lat: order.user_lat ? Number(order.user_lat) : null,
      user_lng: order.user_lng ? Number(order.user_lng) : null,
      address: order.address,
      driver_lat: latestDriverLocation ? Number(latestDriverLocation.lat) : null,
      driver_lng: latestDriverLocation ? Number(latestDriverLocation.lng) : null,
      locations: locations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ================= WALLET =================
app.post('/admin/add-balance', async (req, res) => {
  try {
    const { user_id, amount, description, admin_id } = req.body;

    if (!user_id || amount == null || Number(amount) <= 0) {
      return res.status(400).json({ status: 'fail', message: 'user_id dan amount positif wajib diisi' });
    }

    const result = await transactionService.topupUser(Number(user_id), Number(amount), description || 'Admin add balance', admin_id || null);
    res.json({ status: 'success', message: 'Balance berhasil ditambahkan', balance: result });
  } catch (err) {
    if (err.message === 'User not found') {
      return res.status(404).json({ status: 'fail', message: 'User tidak ditemukan' });
    }
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/wallet/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;

    const [result] = await db.query(`
      SELECT balance FROM wallets WHERE user_id = ?
    `, [userId]);

    const balance = result.length > 0 ? result[0].balance : 0;

    res.json({ balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.post('/withdraw', async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { user_id, amount } = req.body;

    if (!user_id || !amount || amount < 50000) {
      return res.status(400).json({ status: 'fail', message: 'user_id dan amount minimal 50000 wajib diisi' });
    }

    await connection.beginTransaction();

    // Get current balance
    const [walletResult] = await connection.query('SELECT balance FROM wallets WHERE user_id = ?', [user_id]);
    const currentBalance = walletResult.length > 0 ? walletResult[0].balance : 0;

    if (currentBalance < amount) {
      await connection.rollback();
      return res.status(400).json({ status: 'fail', message: 'Saldo tidak cukup' });
    }

    // Deduct balance
    await connection.query(`
      UPDATE wallets SET balance = balance - ? WHERE user_id = ?
    `, [amount, user_id]);

    // Insert transaction
    await connection.query(`
      INSERT INTO transactions (user_id, amount, type, description, created_at)
      VALUES (?, ?, 'debit', 'Withdraw', NOW())
    `, [user_id, amount]);

    await connection.commit();
    res.json({ status: 'success', message: 'Withdraw berhasil' });
  } catch (err) {
    if (connection) await connection.rollback();
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  } finally {
    if (connection) connection.release();
  }
});

// ================= APPROVE ORDER & UPDATE SALDO =================
app.patch('/orders/approve/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { approved } = req.body; // true or false

    const [orderResult] = await db.query(
      'SELECT user_id, total_harga, status FROM orders WHERE id = ?',
      [orderId]
    );

    if (orderResult.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Order tidak ditemukan' });
    }

    const order = orderResult[0];

    if (order.status !== 'completed') {
      return res.status(400).json({ status: 'fail', message: 'Order belum completed' });
    }

    if (approved) {
      // Update order status to approved
      await db.query('UPDATE orders SET status = ? WHERE id = ?', ['approved', orderId]);

      // Add to user saldo
      await db.query('UPDATE users SET saldo = saldo + ? WHERE id = ?', [order.total_harga, order.user_id]);

      // Create transaction record
      await db.query(
        'INSERT INTO transactions (user_id, type, amount, description, created_at) VALUES (?, ?, ?, ?, NOW())',
        [order.user_id, 'credit', order.total_harga, `Penjualan sampah order #${orderId}`]
      );

      res.json({ status: 'success', message: 'Order disetujui dan saldo user ditambahkan' });
    } else {
      // Reject order
      await db.query('UPDATE orders SET status = ? WHERE id = ?', ['rejected', orderId]);
      res.json({ status: 'success', message: 'Order ditolak' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});
app.get('/transactions', async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT t.*, u.nama as user_name
      FROM transactions t
      JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC
    `);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server jalan di port ${PORT} pada 0.0.0.0`);
});