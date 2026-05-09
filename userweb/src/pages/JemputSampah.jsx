import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./css/JemputSampah.css";
import UserAvatar from "../assets/pp.jpg";

const JemputSampah = () => {
  const navigate = useNavigate();
  const [selectedTipe, setSelectedTipe] = useState("jemput");

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        {/* TOPBAR */}
        <header className="topbar">
          <button className="back-circle-btn" onClick={() => navigate(-1)}>←</button>
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
        <div className="jemput-content">
          <div className="jemput-header">
            <h1>Jemput Sampah 🌿</h1>
            <p>Pilih jenis sampah dan atur penjemputan dengan mudah.</p>
          </div>

          <div className="jemput-grid">
            {/* SISI KIRI */}
            <div className="jemput-left">
              <section className="section-box">
                <h3>1. Pilih Tipe Pengangkutan</h3>
                <div className={`tipe-card ${selectedTipe === "jemput" ? "active" : ""}`} onClick={() => setSelectedTipe("jemput")}>
                  <div className="tipe-icon">🚛</div>
                  <div className="tipe-info">
                    <p className="tipe-title">Jemput Sampah</p>
                    <p className="tipe-desc">Petugas kami akan datang menjemput sampahmu</p>
                  </div>
                  <div className="tipe-check">{selectedTipe === "jemput" ? "✅" : ""}</div>
                </div>

                <div className={`tipe-card ${selectedTipe === "antar" ? "active" : ""}`} onClick={() => setSelectedTipe("antar")}>
                  <div className="tipe-icon">🗑️</div>
                  <div className="tipe-info">
                    <p className="tipe-desc">Kamu antar sendiri sampah ke tempat drop point terdekat</p>
                  </div>
                  <div className="tipe-arrow">→</div>
                </div>
              </section>

              <section className="section-box">
                <h3>3. Catatan untuk Petugas (Opsional)</h3>
                <textarea 
                  className="catatan-input" 
                  placeholder="Contoh: Blok / Unit, Patokan, atau catatan lainnya..."
                  maxLength="250"
                ></textarea>
                <span className="char-count">0 / 250</span>
              </section>

              <div className="tips-banner">
                <span className="tips-icon">💡</span>
                <div className="tips-text">
                  <p><b>Tips</b></p>
                  <p>Pastikan lokasi dan catatan sudah benar agar petugas lebih mudah menemukan lokasi Anda.</p>
                </div>
                <img src={require("../assets/hero.png")} alt="trash-bin" className="tips-img" />
              </div>
            </div>

            {/* SISI KANAN */}
            <div className="jemput-right">
              <section className="section-box">
                <h3>2. Alamat Penjemputan</h3>
                <div className="search-map-box">
                  <span className="loc-icon">📍</span>
                  <input type="text" placeholder="Masukkan alamat penjemputan" />
                  <button className="icon-btn">🔍</button>
                  <button className="icon-btn">🎯</button>
                </div>
                <div className="map-view">
                  <div className="map-marker">📍</div>
                  <button className="use-loc-btn">🎯 Gunakan lokasi saya</button>
                </div>
              </section>

              <section className="section-box">
                <h3>4. Pilih Jenis Sampah</h3>
                <p className="sub-heading">Pilih jenis sampah yang akan dijemput</p>
                
                <div className="jenis-list">
                  {[
                    { id: 1, name: "Sampah Organik", desc: "Sampah yang berasal dari makhluk hidup", img: "🍎" },
                    { id: 2, name: "Sampah Anorganik", desc: "Sampah yang tidak mudah terurai", img: "🥤" },
                    { id: 3, name: "Sampah Lainnya", desc: "Sampah jenis lainnya", img: "📦" }
                  ].map((item) => (
                    <div key={item.id} className="jenis-item">
                      <input type="checkbox" id={`jenis-${item.id}`} />
                      <div className="jenis-icon-circle">♻️</div>
                      <div className="jenis-text">
                        <p className="jenis-name">{item.name}</p>
                        <p className="jenis-desc">{item.desc}</p>
                      </div>
                      <span className="jenis-img-preview">{item.img}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="jemput-actions">
            <button className="btn-batal" onClick={() => navigate(-1)}>Batal</button>
            <button className="btn-berikutnya" onClick={() => navigate("/StatusPenjemputan")}>
              Berikutnya →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JemputSampah;