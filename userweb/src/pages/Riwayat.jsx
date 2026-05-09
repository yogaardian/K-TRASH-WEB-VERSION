import React from "react";
import Sidebar from "../components/Sidebar"; // Pastikan huruf S besar sesuai file di disk
import "./css/Riwayat.css";

const Riwayat = () => {
  const dataRiwayat = [
    { tanggal: "31 Mei 2024", waktu: "10:30 WIB", jenis: "Setor Sampah", kategori: "Organik", deskripsi: "Setoran sampah: Sayuran (Berat: 2,5 kg)", jumlah: "+ Rp 3.250", status: "Selesai" },
    { tanggal: "30 Mei 2024", waktu: "15:45 WIB", jenis: "Jemput Sampah", kategori: null, deskripsi: "Penjemputan sampah (Lokasi: Jl. Melati No. 10)", jumlah: "-", status: "Selesai" },
    { tanggal: "29 Mei 2024", waktu: "09:15 WIB", jenis: "Setor Sampah", kategori: "Anorganik", deskripsi: "Setoran sampah: Botol plastik (Berat: 3,2 kg)", jumlah: "+ Rp 4.800", status: "Selesai" },
    { tanggal: "28 Mei 2024", waktu: "16:20 WIB", jenis: "Penarikan Saldo", kategori: null, deskripsi: "Penarikan saldo ke rekening (BCA - 1234 **** 5678)", jumlah: "- Rp 50.000", status: "Berhasil" },
    { tanggal: "27 Mei 2024", waktu: "11:05 WIB", jenis: "Setor Sampah", kategori: "Organik", deskripsi: "Setoran sampah: Daun kering (Berat: 1,0 kg)", jumlah: "+ Rp 1.300", status: "Selesai" },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        <div className="riwayat-container">
          {/* Header Section */}
          <div className="riwayat-header">
            <div className="header-title">
              <h1>Riwayat 🌿</h1>
              <p>Berikut adalah riwayat transaksi dan aktivitas kamu.</p>
            </div>
          </div>

          {/* Filter Section */}
          <div className="filter-wrapper">
            <div className="filter-categories">
              <button className="btn-filter active">Semua</button>
              <button className="btn-filter">♻️ Setor Sampah</button>
              <button className="btn-filter">🚚 Jemput Sampah</button>
              <button className="btn-filter">💰 Penarikan Saldo</button>
              <button className="btn-filter">...</button>
            </div>
            <div className="filter-date-search">
              <div className="date-picker">📅 01 Mei 2024 - 31 Mei 2024 ▾</div>
              <button className="btn-outline-filter">🔍 Filter</button>
            </div>
          </div>

          {/* Table Section */}
          <div className="table-card">
            <table className="riwayat-table">
              <thead>
                <tr>
                  <th>Tanggal & Waktu</th>
                  <th>Jenis Aktivitas</th>
                  <th>Deskripsi</th>
                  <th>Jumlah</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataRiwayat.map((item, index) => (
                  <tr key={index}>
                    <td className="col-date">
                      <div className="icon-calendar">📅</div>
                      <div>
                        <p className="txt-main">{item.tanggal}</p>
                        <p className="txt-sub">{item.waktu}</p>
                      </div>
                    </td>
                    <td className="col-type">
                      <div className="type-content">
                        <span className="type-icon">{item.jenis.includes("Setor") ? "♻️" : item.jenis.includes("Jemput") ? "🚚" : "💳"}</span>
                        <p className="txt-main">{item.jenis}</p>
                        {item.kategori && <span className={`badge-kat ${item.kategori.toLowerCase()}`}>{item.kategori}</span>}
                      </div>
                    </td>
                    <td className="col-desc">
                      <p className="txt-desc">{item.deskripsi}</p>
                    </td>
                    <td className="col-amount">
                      <p className={`txt-amount ${item.jumlah.includes("+") ? "plus" : "minus"}`}>
                        {item.jumlah}
                      </p>
                    </td>
                    <td>
                      <span className={`status-pill ${item.status.toLowerCase()}`}>{item.status}</span>
                    </td>
                    <td><span className="chevron-icon">›</span></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer Table / Pagination */}
            <div className="table-footer">
              <p>Menampilkan 1 - 7 dari 25 riwayat</p>
              <div className="pagination">
                <button className="page-btn">‹</button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span>...</span>
                <button className="page-btn">4</button>
                <button className="page-btn">›</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Riwayat;