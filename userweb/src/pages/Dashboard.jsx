import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import "./css/Dashboard.css";

import HeroBg from "../assets/hero.png";
import UserAvatar from "../assets/pp.jpg";

const hargaSampah = [
  { icon: "🌿", nama: "Sampah Organik", harga: "Rp 2.000" },
  { icon: "🧴", nama: "Sampah Plastik", harga: "Rp 3.500" },
  { icon: "📄", nama: "Sampah Kertas", harga: "Rp 2.500" },
  { icon: "🥫", nama: "Logam", harga: "Rp 4.000" },
  { icon: "🍾", nama: "Sampah Kaca", harga: "Rp 1.500" },
];

const aktivitas = [
  {
    icon: "🚛",
    iconBg: "#dcfce7",
    judul: "Jemput sampah berhasil",
    waktu: "Sabtu, 18 Mei 2024 - 09:15 WIB",
    status: "Berhasil",
  },
  {
    icon: "💰",
    iconBg: "#dcfce7",
    judul: "Poin ditambahkan",
    sub: "+150 poin",
    waktu: "Sabtu, 18 Mei 2024 - 09:20 WIB",
    status: "Berhasil",
  },
  {
    icon: "🏷️",
    iconBg: "#dcfce7",
    judul: "Cek harga sampah",
    waktu: "Sabtu, 18 Mei 2024 - 08:45 WIB",
    status: "Berhasil",
  },
  {
    icon: "📅",
    iconBg: "#dcfce7",
    judul: "Request penjemputan",
    waktu: "Jumat, 17 Mei 2024 - 16:30 WIB",
    status: "Berhasil",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        {/* TOPBAR */}
        <header className="topbar">

          <div></div>

          <div className="topbar-right">

            <div
              className="notif-btn"
              onClick={() => navigate("/notifikasi")}
            >
              🔔
              <span className="notif-dot">2</span>
            </div>

            <div
              className="user-profile"
              onClick={() => navigate("/pengaturan")}
            >

              <div className="user-avatar">
                <img
                  src={UserAvatar}
                  alt="avatar"
                />
              </div>

              <div className="user-info">
                <span className="user-name">
                  User
                </span>

                <span className="user-id">
                  001
                </span>
              </div>

              <span className="dropdown-icon">
                ▼
              </span>

            </div>

          </div>
        </header>

        {/* CONTENT */}
        <div className="dashboard-content">

          {/* HERO */}
          <section className="hero-banner">

            <div className="hero-banner-text">

              <p className="hero-greeting">
                Selamat Datang, 👋
              </p>

              <h1 className="hero-heading">
                Jaga lingkungan mulai dari
                langkah kecil!
              </h1>

              <p className="hero-sub">
                Kelola sampah dengan mudah,
                pantau saldo poin, dan jadwalkan
                penjemputan kapan saja.
              </p>

            </div>

            <div className="hero-banner-img">
              <img
                src={HeroBg}
                alt="hero"
              />
            </div>

          </section>

          {/* SALDO CARD */}
          <div
            className="saldo-card"
            onClick={() => navigate("/saldo")}
          >

            <div className="saldo-card-top">

              <div className="saldo-icon-wrap">
                💳
              </div>

              <div>
                <p className="saldo-label">
                  Saldo Poin Kamu
                </p>

                <h2 className="saldo-amount">
                  Rp 75.000
                </h2>
              </div>

            </div>

            <div className="saldo-card-bottom">

              <span>Lihat Detail</span>

              <span>→</span>

            </div>

          </div>

          {/* GRID */}
          <div className="info-grid">

            {/* HARGA */}
            <section className="info-card">

              <div className="info-card-header">

                <h3>Harga Sampah per Kg</h3>

                <button
                  className="link-btn"
                  onClick={() => navigate("/harga")}
                >
                  Lihat Semua
                </button>

              </div>

              <div className="harga-list">

                {hargaSampah.map((item) => (

                  <div
                    key={item.nama}
                    className="harga-row"
                  >

                    <div className="harga-left">

                      <div className="harga-icon">
                        {item.icon}
                      </div>

                      <span className="harga-nama">
                        {item.nama}
                      </span>

                    </div>

                    <span className="harga-price">
                      {item.harga}
                      <span className="per-kg">
                        /kg
                      </span>
                    </span>

                  </div>

                ))}

              </div>

            </section>

            {/* AKTIVITAS */}
            <section className="info-card">

              <div className="info-card-header">

                <h3>Aktivitas Terbaru</h3>

                <button
                  className="link-btn"
                  onClick={() => navigate("/riwayat")}
                >
                  Lihat Semua
                </button>

              </div>

              <div className="aktivitas-list">

                {aktivitas.map((item, i) => (

                  <div
                    key={i}
                    className="aktivitas-row"
                  >

                    <div
                      className="aktivitas-icon"
                      style={{
                        background: item.iconBg,
                      }}
                    >
                      {item.icon}
                    </div>

                    <div className="aktivitas-info">

                      <p className="aktivitas-judul">
                        {item.judul}
                      </p>

                      {item.sub && (
                        <p className="aktivitas-sub">
                          {item.sub}
                        </p>
                      )}

                      <p className="aktivitas-waktu">
                        {item.waktu}
                      </p>

                    </div>

                    <span className="status-badge">
                      {item.status}
                    </span>

                  </div>

                ))}

              </div>

            </section>

          </div>

          {/* CTA */}
          <section className="cta-section">

            <div className="cta-left">

              <div className="cta-icon">
                ♻️
              </div>

              <div>

                <h3>
                  Jadwalkan Jemput Sampah Sekarang!
                </h3>

                <p>
                  Pilih jenis sampah dan tentukan
                  jadwal penjemputan dengan mudah.
                </p>

              </div>

            </div>

            <button
              className="cta-btn"
              onClick={() => navigate("/JemputSampah")}
            >
              Request Jemput Sampah →
            </button>

          </section>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;