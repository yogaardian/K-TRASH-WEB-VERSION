import React from "react";
import Sidebar from "../components/Sidebar";
import "./css/Saldo.css";
import UserAvatar from "../assets/pp.jpg";

const Saldo = () => {
  const transaksi = [
    { tanggal: "18 Mei 2024", waktu: "10:30 WIB", deskripsi: "Jemput Sampah", sub: "Sampah Organik", jenis: "Pemasukan", nominal: "Rp 15.000", status: "Berhasil", icon: "🚛" },
    { tanggal: "17 Mei 2024", waktu: "14:20 WIB", deskripsi: "Jemput Sampah", sub: "Sampah Anorganik", jenis: "Pemasukan", nominal: "Rp 10.000", status: "Berhasil", icon: "🚛" },
    { tanggal: "16 Mei 2024", waktu: "09:15 WIB", deskripsi: "Jemput Sampah", sub: "Sampah Lainnya", jenis: "Pemasukan", nominal: "Rp 20.000", status: "Berhasil", icon: "🚛" },
    { tanggal: "15 Mei 2024", waktu: "11:45 WIB", deskripsi: "Penarikan Saldo", sub: "Ke Rekening BCA **** 1234", jenis: "Pengeluaran", nominal: "Rp 30.000", status: "Berhasil", icon: "💳" },
    { tanggal: "14 Mei 2024", waktu: "16:50 WIB", deskripsi: "Bonus Harian", sub: "Login harian", jenis: "Pemasukan", nominal: "Rp 5.000", status: "Berhasil", icon: "🎁" },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="greeting-pill">
            <span className="user-emoji">👤</span>
            <div className="greeting-text">
              <p>Halo User1 👋</p>
              <span>daur ulang sampahmu yuk!</span>
            </div>
          </div>
          <div className="topbar-right">
            <div className="notif-btn">🔔 <span className="notif-dot">2</span></div>
            <div className="user-profile-small">
              <img src={UserAvatar} alt="avatar" />
              <div className="user-meta">
                <p className="name">User</p>
                <p className="id">001</p>
              </div>
              <span>▼</span>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="saldo-content">
          <div className="content-header">
            <h1>Saldo & Riwayat 🌿</h1>
            <p>Pantau saldo poin kamu dan lihat riwayat transaksi dengan mudah.</p>
          </div>

          {/* STATS CARDS */}
          <div className="stats-grid">
            <div className="main-saldo-card">
              <div className="card-info">
                <p>Saldo Kamu</p>
                <h2>Rp 75.000</h2>
              </div>
              <div className="card-icon-bg">💳</div>
              <div className="recycle-bg">♻️</div>
            </div>
            
            <div className="summary-card">
              <div className="icon-circle green">📥</div>
              <p>Total Pemasukan</p>
              <h3>Rp 120.000</h3>
              <span>Dari transaksi berhasil</span>
            </div>

            <div className="summary-card">
              <div className="icon-circle red">📤</div>
              <p>Total Pengeluaran</p>
              <h3>Rp 45.000</h3>
              <span>Penarikan & lainnya</span>
            </div>

            <div className="summary-card">
              <div className="icon-circle blue">✅</div>
              <p>Transaksi Berhasil</p>
              <h3>24</h3>
              <span>Transaksi</span>
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className="table-container">
            <div className="table-header">
              <div className="tabs">
                <button className="tab active">Riwayat Transaksi</button>
                <button className="tab">Riwayat Penarikan</button>
              </div>
              <div className="filters">
                <button className="filter-btn">📅 Semua Tanggal <span>▼</span></button>
                <button className="filter-btn">🔍 Filter</button>
              </div>
            </div>

            <table className="riwayat-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Deskripsi</th>
                  <th>Jenis</th>
                  <th>Nominal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transaksi.map((item, index) => (
                  <tr key={index}>
                    <td className="col-waktu">
                      <p>{item.tanggal}</p>
                      <span>{item.waktu}</span>
                    </td>
                    <td className="col-desc">
                      <div className="desc-icon">{item.icon}</div>
                      <div className="desc-text">
                        <p>{item.deskripsi}</p>
                        <span>{item.sub}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge-jenis ${item.jenis.toLowerCase()}`}>
                        {item.jenis}
                      </span>
                    </td>
                    <td className="col-nominal">{item.nominal}</td>
                    <td><span className="badge-status">{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="table-footer-info">ⓘ Saldo akan otomatis bertambah setelah transaksi pemasukan berhasil.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Saldo;