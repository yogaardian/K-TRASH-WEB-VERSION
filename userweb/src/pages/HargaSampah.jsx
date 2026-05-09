import React from "react";
import Sidebar from "../components/Sidebar";
import "./css/HargaSampah.css";
import UserAvatar from "../assets/pp.jpg";

const HargaSampah = () => {
  const dataOrganik = [
    { nama: "Sisa makanan", harga: "Rp 1.000 /Kg" },
    { nama: "Kulit buah & sayuran", harga: "Rp 1.000 /Kg" },
    { nama: "Daun kering", harga: "Rp 1.000 /Kg" },
    { nama: "Ranting pohon", harga: "Rp 1.300 /Kg" },
    { nama: "Rumput", harga: "Rp 1.000 /Kg" },
    { nama: "Tanaman mati", harga: "Rp 1.000 /Kg" },
  ];

  const dataAnorganik = [
    { nama: "Botol plastik (PET)", harga: "Rp 4.000 /Kg" },
    { nama: "Botol sabun (HDPE)", harga: "Rp 3.000 /Kg" },
    { nama: "Pipa / Kabel (PVC)", harga: "Rp 2.000 /Kg" },
    { nama: "Kantong kresek (LDPE)", harga: "Rp 3.500 /Kg" },
    { nama: "Tutup botol, sedotan (PP)", harga: "Rp 2.500 /Kg" },
    { nama: "Styrofoam, tempat makanan (PS)", harga: "Rp 1.500 /Kg" },
    { nama: "Plastik campur (bungkus sachet)", harga: "Rp 1.000 /Kg" },
    { nama: "Kardus", harga: "Rp 4.000 /Kg" },
    { nama: "Kertas HVS", harga: "Rp 3.000 /Kg" },
    { nama: "Majalah", harga: "Rp 3.000 /Kg" },
  ];

  const dataLainnya = [
    { nama: "Peralatan komunikasi", harga: "Rp 4.000 /Kg" },
    { nama: "Peralatan rumah tangga kecil", harga: "Rp 3.000 /Kg" },
    { nama: "Peralatan rumah tangga besar", harga: "Rp 3.000 /Kg" },
    { nama: "Limbah baterai", harga: "Rp 3.000 /Kg" },
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
        <div className="harga-content">
          <div className="harga-header">
            <div className="header-text">
              <h1>Harga Sampah 🌿</h1>
              <p>Berikut adalah daftar harga sampah berdasarkan kategorinya.</p>
            </div>
            <img src={require("../assets/hero.png")} alt="trash-bin" className="header-illustration-img" />
          </div>

          <div className="harga-grid">
            {/* KATEGORI ORGANIK */}
            <div className="harga-card">
              <div className="card-top">
                <div className="category-icon green">🌿</div>
                <div className="category-info">
                  <h3>Sampah Organik</h3>
                  <p>Sampah yang berasal dari makhluk hidup dan mudah terurai secara alami.</p>
                </div>
              </div>
              <div className="list-container">
                <div className="list-header">
                  <span>Nama Sampah</span>
                  <span>Harga per Kg</span>
                </div>
                {dataOrganik.map((item, index) => (
                  <div className="list-row" key={index}>
                    <span className="item-name">{item.nama}</span>
                    <span className="item-price">{item.harga}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* KATEGORI ANORGANIK */}
            <div className="harga-card">
              <div className="card-top">
                <div className="category-icon blue">♻️</div>
                <div className="category-info">
                  <h3>Sampah Anorganik</h3>
                  <p>Sampah yang tidak mudah terurai dan dapat didaur ulang.</p>
                </div>
              </div>
              <div className="list-container">
                <div className="list-header">
                  <span>Nama Sampah</span>
                  <span>Harga per Kg</span>
                </div>
                {dataAnorganik.map((item, index) => (
                  <div className="list-row" key={index}>
                    <span className="item-name">{item.nama}</span>
                    <span className="item-price">{item.harga}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* KATEGORI LAINNYA */}
            <div className="harga-card">
              <div className="card-top">
                <div className="category-icon yellow">🟡</div>
                <div className="category-info">
                  <h3>Sampah Lainnya</h3>
                  <p>Sampah yang tidak termasuk dalam kategori organik maupun anorganik.</p>
                </div>
              </div>
              <div className="list-container">
                <div className="list-header">
                  <span>Nama Sampah</span>
                  <span>Harga per Kg</span>
                </div>
                {dataLainnya.map((item, index) => (
                  <div className="list-row" key={index}>
                    <span className="item-name">{item.nama}</span>
                    <span className="item-price">{item.harga}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <footer className="harga-info-footer">
            <span className="info-icon">ℹ️</span>
            <p>Harga dapat berubah sewaktu-waktu sesuai dengan kondisi pasar dan kebijakan K-Trash.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default HargaSampah;