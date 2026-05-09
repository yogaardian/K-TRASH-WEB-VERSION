import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./css/StatusPenjemputan.css";
import UserAvatar from "../assets/pp.jpg";

const StatusPenjemputan = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a delay for the search animation
    const timer = setTimeout(() => {
      navigate("/tracking");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
        <div className="status-content">
          <div className="status-header">
            <div className="header-text">
              <h1>Menunggu Petugas 🌿</h1>
              <p>Terima kasih! Permintaan penjemputanmu telah kami terima.<br/>Petugas terdekat sedang kami cari untukmu.</p>
            </div>
            <img src={require("../assets/hero.png")} alt="truck" className="header-img" />
          </div>

          {/* STEPPER STATUS */}
          <div className="status-stepper">
            <div className="step active">
              <div className="step-icon">🔍</div>
              <div className="step-info">
                <p className="step-title">Mencari Petugas</p>
                <p className="step-desc">Sedang mencari petugas terdekat</p>
              </div>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <div className="step-icon grayscale">👤</div>
              <div className="step-info">
                <p className="step-title gray">Petugas Ditemukan</p>
                <p className="step-desc">Menunggu konfirmasi petugas</p>
              </div>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <div className="step-icon grayscale">🚛</div>
              <div className="step-info">
                <p className="step-title gray">Menuju Lokasi</p>
                <p className="step-desc">Petugas dalam perjalanan</p>
              </div>
            </div>
          </div>

          <div className="status-grid">
            {/* SEARCH ANIMATION CARD */}
            <div className="search-card">
              <div className="search-circle">
                <div className="radar"></div>
                <img src={require("../assets/hero.png")} alt="truck" className="radar-truck" />
              </div>
              <h3>Mencari petugas terdekat...</h3>
              <p>Mohon tunggu sebentar, ya.
                <br />
                Kamu akan otomatis dialihkan
                setelah petugas ditemukan.</p>
              <div className="notif-pill">
                🔔 Kamu akan mendapatkan notifikasi setelah petugas ditemukan.
              </div>
            </div>

            {/* DETAIL PENJEMPUTAN */}
            <div className="detail-card">
              <h3>Detail Penjemputan</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div className="info-text">
                    <p className="info-label">Lokasi Penjemputan</p>
                    <p className="info-value">Jl. Melati No. 12, Surabaya, Jawa Timur</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🕒</span>
                  <div className="info-text">
                    <p className="info-label">Waktu Penjemputan</p>
                    <p className="info-value">Hari ini, 18 Mei 2024 (09:15 - 11:00 WIB)</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🚛</span>
                  <div className="info-text">
                    <p className="info-label">Tipe Pengangkutan</p>
                    <p className="info-value">Jemput Sampah</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📝</span>
                  <div className="info-text">
                    <p className="info-label">Catatan</p>
                    <p className="info-value">Blok A, depan rumah pagar hitam</p>
                  </div>
                </div>
              </div>

              <div className="tips-box-light">
                <span className="tips-emoji">💡</span>
                <div className="tips-content">
                  <p><b>Tips</b></p>
                  <p>Pastikan sampah sudah dipilah dan siap untuk dijemput agar proses lebih cepat dan mudah.</p>
                </div>
                <div className="tips-bins">🗑️🗑️</div>
              </div>
            </div>
          </div>

          {/* BOTTOM ACTIONS */}
          <div className="status-footer">
            <div className="help-text">
              🎧 <b>Perlu bantuan?</b>
              <p>Kamu bisa membatalkan orderan atau menghubungi kami kapan saja.</p>
            </div>
            <div className="action-buttons">
              <button className="btn-outline-cancel" onClick={() => navigate("/jemputsampah")}>
                ✖ Batalkan Orderan
              </button>
              <button className="btn-solid-chat">💬 Hubungi Kami</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StatusPenjemputan;