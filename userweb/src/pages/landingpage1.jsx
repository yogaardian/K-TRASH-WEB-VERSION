import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./css/landingpage.css";

import HeroImage from "../assets/hero.png";
import Logo from "../assets/LogoK-Trash.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-wrapper">
            <img src={Logo} alt="logo" className="logo-img" />
            <h1 className="logo-text">K-Trash</h1>
          </div>

          <ul className="nav-menu">
            <li className="active">Beranda</li>
            <li>Fitur</li>
            <li>Cara Kerja</li>
            <li>Tentang Kami</li>
            <li>Kontak</li>
          </ul>

          <button className="login-btn" onClick={() => navigate("/register")}>
            <span className="login-icon"></span> Masuk / Daftar
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-left">
          <div className="badge">🌱 Solusi Cerdas untuk Lingkungan Bersih</div>

          <h1 className="hero-title">
            Kelola Sampah,
            <br />
            Jadi Lebih Mudah,
            <br />
            <span>Bermanfaat,</span>
            <br />
            <span>dan Berkelanjutan</span>
          </h1>

          <p className="hero-description">
            K-Trash membantu Anda mengelola sampah dengan praktis. Pantau saldo,
            request jemput, dan lihat harga sampah dengan transparan.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Mulai Sekarang →</button>
            <button className="secondary-btn">Pelajari Lebih Lanjut</button>
          </div>

          <div className="hero-features">
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <p>Saldo Aman &amp; Transparan</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🚛</div>
              <p>Jemput Sampah Cepat &amp; Mudah</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🏷️</div>
              <p>Harga Jelas per Kg</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img src={HeroImage} alt="Hero" className="hero-image" />
        </div>
      </section>

      {/* FITUR UTAMA */}
      <section className="feature-section">
        <div className="section-title">
          <span className="section-badge">FITUR UTAMA</span>
          <h2>
            Semua yang Anda Butuhkan
            <br />
            dalam Satu Genggaman
          </h2>
        </div>

        <div className="feature-cards">
          <div className="feature-card">
            <div className="card-icon-wrap">
              <span className="card-icon">💳</span>
            </div>
            <h3>1. Lihat Saldo</h3>
            <p>
              Pantau saldo Anda secara real-time setiap saat. Transaksi aman dan
              riwayat jelas.
            </p>
            <button className="card-btn">Lihat Saldo</button>
          </div>

          <div className="feature-card">
            <div className="card-icon-wrap">
              <span className="card-icon">🚛</span>
            </div>
            <h3>2. Request Jemput Sampah</h3>
            <p>
              Ajukan penjemputan dengan mudah. Pilih jadwal, jenis sampah, dan
              lokasi Anda.
            </p>
            <button className="card-btn">Request Jemput</button>
          </div>

          <div className="feature-card">
            <div className="card-icon-wrap">
              <span className="card-icon">🏷️</span>
            </div>
            <h3>3. Harga Sampah per Kg</h3>
            <p>
              Lihat daftar harga terbaru per kg. Transparan dan selalu
              diperbarui.
            </p>
            <button className="card-btn">Lihat Harga</button>
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section className="work-section">
        <div className="work-header">
          <h2>Cara Kerja K-Trash</h2>
          <p>Mudah, Cepat, dan Efisien</p>
        </div>

        <div className="work-steps">
          <div className="step">
            <div className="step-illustration">
              <span className="step-emoji">📱</span>
            </div>
            <div className="step-number">1</div>
            <h4>Daftar &amp; Masuk</h4>
            <p>Buat akun dan lengkapi data diri untuk mulai menggunakan K-Trash.</p>
          </div>

          <div className="step-arrow">- - - →</div>

          <div className="step">
            <div className="step-illustration">
              <span className="step-emoji">📅</span>
            </div>
            <div className="step-number">2</div>
            <h4>Request Jemput</h4>
            <p>Pilih jenis sampah, tentukan jadwal, dan konfirmasi penjemputan.</p>
          </div>

          <div className="step-arrow">- - - →</div>

          <div className="step">
            <div className="step-illustration">
              <span className="step-emoji">🚛</span>
            </div>
            <div className="step-number">3</div>
            <h4>Sampah Dijemput</h4>
            <p>Petugas kami akan menjemput sampah sesuai jadwal yang telah ditentukan.</p>
          </div>

          <div className="step-arrow">- - - →</div>

          <div className="step">
            <div className="step-illustration">
              <span className="step-emoji">💰</span>
            </div>
            <div className="step-number">4</div>
            <h4>Saldo Bertambah</h4>
            <p>Sampah ditimbang, saldo Anda bertambah sesuai harga per kg.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-wrapper">
              <img src={Logo} alt="logo" className="logo-img" />
              <h1 className="logo-text">K-Trash</h1>
            </div>
            <p className="footer-text">
              Platform digital untuk pengelolaan sampah yang lebih efisien,
              transparan, dan berkelanjutan.
            </p>
            <div className="footer-socials">
              <span className="social-icon">📘</span>
              <span className="social-icon">📸</span>
              <span className="social-icon">🐦</span>
              <span className="social-icon">▶️</span>
            </div>
          </div>

          <div>
            <h3>Menu</h3>
            <ul>
              <li>Beranda</li>
              <li>Fitur</li>
              <li>Cara Kerja</li>
              <li>Tentang Kami</li>
              <li>Kontak</li>
            </ul>
          </div>

          <div>
            <h3>Lainnya</h3>
            <ul>
              <li>FAQ</li>
              <li>Kebijakan Privasi</li>
              <li>Syarat &amp; Ketentuan</li>
            </ul>
          </div>

          <div>
            <h3>Kontak Kami</h3>
            <ul>
              <li>
                <span className="contact-icon">📍</span> Jl. Green City No. 123, Surabaya, Indonesia
              </li>
              <li>
                <span className="contact-icon">✉️</span> info@ktrash.id
              </li>
              <li>
                <span className="contact-icon">📞</span> 0812-3456-7890
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
