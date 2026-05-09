import React from "react";
import Sidebar from "../components/Sidebar";
import "./css/Tracking.css";
import UserAvatar from "../assets/pp.jpg";
import PetugasAvatar from "../assets/pp.jpg"; // Gunakan foto petugas jika ada

const Tracking = () => {
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
                <div className="tracking-content">
                    <div className="tracking-header">
                        <div className="header-text">
                            <h1>Menunggu Petugas 🌿</h1>
                            <p>Terima kasih! Permintaan penjemputanmu telah kami terima.<br />Petugas terdekat sedang kami cari untukmu.</p>
                        </div>
                        <div className="header-illustration">
                            <img src={require("../assets/hero.png")} alt="truck" />
                        </div>
                    </div>

                    {/* STATUS STEPPER */}
                    <div className="status-stepper">

                        {/* STEP 1 */}
                        <div className="step completed">

                            <div className="step-icon">
                                🔍
                            </div>

                            <div className="step-info">
                                <p className="step-title">
                                    Mencari Petugas
                                </p>

                                <p className="step-desc">
                                    Sedang mencari petugas terdekat
                                </p>
                            </div>

                        </div>

                        <div className="step-line active-line"></div>

                        {/* STEP 2 */}
                        <div className="step active">

                            <div className="step-icon">
                                👤
                            </div>

                            <div className="step-info">
                                <p className="step-title">
                                    Petugas Ditemukan
                                </p>

                                <p className="step-desc">
                                    Menunggu konfirmasi petugas
                                </p>
                            </div>

                        </div>

                        <div className="step-line"></div>

                        {/* STEP 3 */}
                        <div className="step disabled">

                            <div className="step-icon">
                                🚛
                            </div>

                            <div className="step-info">
                                <p className="step-title">
                                    Menuju Lokasi
                                </p>

                                <p className="step-desc">
                                    Petugas dalam perjalanan
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="tracking-grid">
                        {/* KARTU PETUGAS */}
                        <div className="card-petugas">
                            <p className="card-label">Petugas Ditemukan!</p>
                            <p className="card-sublabel">Petugas sedang menuju lokasi penjemputanmu.</p>

                            <div className="petugas-profile">
                                <img src={PetugasAvatar} alt="petugas" className="avatar-petugas" />
                                <div className="petugas-info">
                                    <h3>Budi Santoso ✅</h3>
                                    <p className="rating">⭐ 4.9 (128 penilaian)</p>
                                </div>
                            </div>

                            <div className="petugas-details">
                                <div className="detail-item">
                                    <span className="icon">📞</span>
                                    <div className="text">
                                        <p className="label">No. Handphone</p>
                                        <p className="value">0812-3456-7890</p>
                                    </div>
                                    <button className="call-btn">📞</button>
                                </div>
                                <div className="detail-item">
                                    <span className="icon">🚛</span>
                                    <div className="text">
                                        <p className="label">Kendaraan</p>
                                        <p className="value">L 1234 ABC</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <span className="icon">🕒</span>
                                    <div className="text">
                                        <p className="label">Estimasi Tiba</p>
                                        <p className="value">10 - 15 menit lagi</p>
                                    </div>
                                </div>
                            </div>

                            <div className="trust-badge">
                                <span className="shield">🛡️</span>
                                <div>
                                    <p className="trust-title">Aman & Terpercaya</p>
                                    <p className="trust-desc">Semua petugas kami telah melalui proses verifikasi dan pelatihan.</p>
                                </div>
                            </div>
                        </div>

                        {/* MAPS LOKASI */}
                        <div className="card-maps">
                            <p className="card-label">Lokasi Petugas</p>
                            <p className="card-sublabel">Lihat pergerakan petugas menuju lokasimu secara real-time.</p>

                            <div className="map-placeholder">
                                {/* Kamu bisa mengganti ini dengan Google Maps API nantinya */}
                                <div className="distance-overlay">
                                    <span className="user-icon">👤</span>
                                    <p>Jarak ke lokasi kamu <b>2,1 KM</b></p>
                                </div>
                            </div>
                            <p className="map-footer">🕒 Lokasi akan diperbarui secara otomatis setiap beberapa detik</p>
                        </div>
                    </div>

                    {/* FOOTER ACTION */}
                    <div className="tracking-footer">
                        <div className="tips-box">
                            <span className="leaf">🍃</span>
                            <div className="tips-text">
                                <p><b>Siapkan sampahmu</b></p>
                                <p>Pastikan sampah sudah dipilah dan siap dijemput agar proses lebih cepat dan mudah.</p>
                            </div>
                        </div>
                        <div className="action-btns">
                            <button className="btn-cancel">✖ Batalkan Pesanan</button>
                            <button className="btn-chat">💬 Hubungi Petugas</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Tracking;