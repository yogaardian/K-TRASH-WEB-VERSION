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
        nama VARCHAR(100) NOT NULL,
        harga INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Seed initial data if table is empty
    const [existing] = await db.query('SELECT COUNT(*) as count FROM harga_sampah');
    if (existing[0].count === 0) {
      const initialData = [
        { jenis: 'anorganik', nama: 'Botol Plastik PET', harga: 4000 },
        { jenis: 'anorganik', nama: 'Kardus', harga: 2000 },
        { jenis: 'anorganik', nama: 'Besi', harga: 5000 },
        { jenis: 'anorganik', nama: 'Kaleng', harga: 4500 },
        { jenis: 'organik', nama: 'Daun', harga: 500 },
        { jenis: 'organik', nama: 'Sisa Makanan', harga: 300 },
        { jenis: 'elektronik', nama: 'Kabel Bekas', harga: 2000 },
        { jenis: 'elektronik', nama: 'Charger Bekas', harga: 1500 },
      ];
      
      for (const item of initialData) {
        await db.query(
          'INSERT INTO harga_sampah (jenis, nama, harga) VALUES (?, ?, ?)',
          [item.jenis, item.nama, item.harga]
        );
      }
      console.log('Seeded harga_sampah table with initial data');
    }
  } catch (err) {
    console.error('Error creating harga_sampah table:', err);
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

app.post('/transaction/waste-sale', async (req, res) => {
  const { user_id, amount } = req.body;
  const idempotencyKey = req.get('Idempotency-Key') || null;

  if (!user_id || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ status: 'fail', message: 'user_id dan amount positif wajib diisi' });
  }

  try {
    const result = await transactionService.recordWasteSale(user_id, amount, idempotencyKey);
    res.json({ status: 'success', balance: result.balance, transaction_id: result.transaction_id, idempotent: result.idempotent });
  } catch (err) {
    if (err.message === 'User not found') {
      return res.status(404).json({ status: 'fail', message: 'User tidak ditemukan' });
    }
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
      'SELECT nama, harga FROM harga_sampah WHERE jenis = ?',
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
      'SELECT nama, harga FROM harga_sampah WHERE jenis = ? AND sub = ?',
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
    const { jenis, nama, harga } = req.body;

    if (!jenis || !nama || harga == null) {
      return res.status(400).json({ status: 'fail', message: 'jenis, nama, harga wajib diisi' });
    }

    await db.query(
      'INSERT INTO harga_sampah (jenis, nama, harga) VALUES (?, ?, ?)',
      [jenis, nama, harga],
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
    const { jenis, nama, harga } = req.body;

    if (!jenis || !nama || harga == null) {
      return res.status(400).json({ status: 'fail', message: 'jenis, nama, harga wajib diisi' });
    }

    const [result] = await db.query(
      'UPDATE harga_sampah SET jenis = ?, nama = ?, harga = ? WHERE id = ?',
      [jenis, nama, harga, id],
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
      'SELECT id, user_id, driver_id, address, user_lat, user_lng, jenis_sampah, catatan, status FROM orders WHERE id = ?',
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
  try {
    const { driver_id, status } = req.body;
    const orderId = req.params.id;

    const allowed = ['assigned', 'on_the_way', 'arrived', 'completed'];

    if (!driver_id || !status) {
      return res.status(400).json({ status: 'fail', message: 'driver_id dan status wajib diisi' });
    }

    if (!allowed.includes(status)) {
      return res.status(400).json({ status: 'fail', message: 'Status tidak valid' });
    }

    const [orderResult] = await db.query('SELECT driver_id, status FROM orders WHERE id = ?', [orderId]);

    if (orderResult.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Order tidak ditemukan' });
    }

    const order = orderResult[0];
    if (order.driver_id !== driver_id) {
      return res.status(403).json({ status: 'fail', message: 'Driver tidak terdaftar untuk order ini' });
    }

    const transitions = {
      pending: ['assigned'],
      assigned: ['on_the_way', 'arrived', 'completed'],
      on_the_way: ['arrived', 'completed'],
      arrived: ['completed'],
      completed: [],
      cancelled: [],
    };

    if (!transitions[order.status]?.includes(status)) {
      return res.status(400).json({ status: 'fail', message: `Transisi status tidak diperbolehkan dari ${order.status} ke ${status}` });
    }

    await db.query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, orderId],
    );

    res.json({ status: 'success', message: 'Status order berhasil diperbarui' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
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

    if (!['assigned', 'on_the_way'].includes(order.status)) {
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

    const [orderResult] = await db.query('SELECT id, driver_id, status FROM orders WHERE id = ?', [orderId]);

    if (orderResult.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Order tidak ditemukan' });
    }

    const order = orderResult[0];

    const [loc] = await db.query(
      `SELECT lat, lng, created_at
       FROM driver_locations
       WHERE order_id = ?
       ORDER BY created_at DESC
       LIMIT 1`,
      [orderId],
    );

    res.json({
      status: order.status,
      driver_id: order.driver_id,
      location: loc[0] || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ================= WALLET =================
app.post('/admin/add-balance', async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { user_id, amount } = req.body;

    if (!user_id || !amount || amount <= 0) {
      return res.status(400).json({ status: 'fail', message: 'user_id dan amount positif wajib diisi' });
    }

    await connection.beginTransaction();

    // Check if user exists
    const [userResult] = await connection.query('SELECT id FROM users WHERE id = ?', [user_id]);
    if (userResult.length === 0) {
      await connection.rollback();
      return res.status(404).json({ status: 'fail', message: 'User tidak ditemukan' });
    }

    // Insert or update wallet
    await connection.query(`
      INSERT INTO wallets (user_id, balance) VALUES (?, ?)
      ON DUPLICATE KEY UPDATE balance = balance + VALUES(balance)
    `, [user_id, amount]);

    // Insert transaction
    await connection.query(`
      INSERT INTO transactions (user_id, amount, type, description, created_at)
      VALUES (?, ?, 'credit', 'Admin add balance', NOW())
    `, [user_id, amount]);

    await connection.commit();
    res.json({ status: 'success', message: 'Balance berhasil ditambahkan' });
  } catch (err) {
    if (connection) await connection.rollback();
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  } finally {
    if (connection) connection.release();
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

// ================= TRANSACTIONS =================
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