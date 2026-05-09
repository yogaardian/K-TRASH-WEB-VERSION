import React from "react";
// Perbaikan: Gunakan 'Sidebar' dengan huruf kapital sesuai nama file di folder Anda
import Sidebar from "../components/Sidebar"; 
import "./css/Pengaturan.css";
// Gunakan asset yang tersedia di folder Anda
import HeroImage from "../assets/hero.png"; 

const Pengaturan = () => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar tetap ditampilkan di sisi kiri */}
      <Sidebar />
      
      <main className="dashboard-main">
        <div className="settings-content">
          {/* Bagian Header Pengaturan */}
          <div className="settings-header">
            <div className="header-text-wrapper">
              <h1>Pengaturan 🌿</h1>
              <p>Kelola informasi akun, keamanan, dan preferensi kamu.</p>
            </div>
            {/* Dekorasi daun sesuai gambar */}
            <div className="header-decoration">🍃🍃🍃</div>
          </div>

          <div className="settings-grid">
            {/* KOLOM KIRI: Profil & Keamanan */}
            <div className="settings-column">
              <div className="profile-main-card">
                <div className="avatar-container">
                  <div className="avatar-circle">
                    <img src={HeroImage} alt="User Profile" />
                    <button className="edit-avatar-btn">📷</button>
                  </div>
                </div>
                <div className="profile-basic-info">
                  <h3>User <span className="badge-active">Aktif</span></h3>
                  <p className="user-email">user001@email.com</p>
                  <p className="user-phone">0812-3456-7890</p>
                </div>
              </div>

              <div className="settings-card">
                <div className="card-title">
                  <span className="icon-bg green">🛡️</span>
                  <div>
                    <h4>Keamanan Akun</h4>
                    <p>Atur keamanan akun kamu</p>
                  </div>
                </div>
                <div className="settings-list">
                  <div className="settings-item">
                    <span className="item-icon">🔓</span>
                    <div className="item-info">
                      <p className="item-name">Ubah Password</p>
                      <p className="item-desc">Perbarui password akun</p>
                    </div>
                    <span className="chevron-right">›</span>
                  </div>
                  <div className="settings-item">
                    <span className="item-icon">🔐</span>
                    <div className="item-info">
                      <p className="item-name">Verifikasi Dua Langkah</p>
                      <p className="item-desc">Tambah lapisan keamanan akun</p>
                    </div>
                    <div className="item-action">
                      <span className="label-status">Nonaktif</span>
                      <span className="chevron-right">›</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KOLOM KANAN: Informasi Akun & Notifikasi */}
            <div className="settings-column">
              <div className="settings-card">
                <div className="card-title">
                  <span className="icon-bg blue">👤</span>
                  <div>
                    <h4>Informasi Akun</h4>
                    <p>Informasi dasar akun kamu</p>
                  </div>
                </div>
                <div className="settings-list">
                  {["Informasi Pribadi", "Alamat", "Email", "Nomor Telepon"].map((text, i) => (
                    <div className="settings-item" key={i}>
                      <span className="item-icon">📄</span>
                      <div className="item-info">
                        <p className="item-name">{text}</p>
                        <p className="item-desc">Kelola detail {text.toLowerCase()} kamu</p>
                      </div>
                      <span className="chevron-right">›</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="settings-card">
                <div className="card-title">
                  <span className="icon-bg yellow">🔔</span>
                  <div>
                    <h4>Notifikasi</h4>
                    <p>Atur preferensi notifikasi kamu</p>
                  </div>
                </div>
                <div className="settings-list">
                  <div className="settings-item">
                    <span className="item-icon">📱</span>
                    <div className="item-info">
                      <p className="item-name">Notifikasi Push</p>
                      <p className="item-desc">Terima notifikasi di aplikasi</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Keluar di Bagian Bawah */}
          <div className="logout-section">
            <div className="logout-content">
              <div className="logout-icon-box">➡️</div>
              <div className="logout-text">
                <p className="logout-title">Keluar Akun</p>
                <p className="logout-desc">Keluar dari akun K-Trash pada perangkat ini</p>
              </div>
            </div>
            <span className="chevron-right red">›</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pengaturan;