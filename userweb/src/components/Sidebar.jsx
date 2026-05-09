import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/LogoK-Trash.png";
import "../pages/css/sidebar.css"; // Pastikan CSS dipisahkan

const navItems = [
  { icon: "🏠", label: "Beranda", path: "/dashboard" },
  { icon: "💳", label: "Saldo & Poin", path: "/saldo" },
  { icon: "🚛", label: "Jemput Sampah", path: "/JemputSampah" },
  { icon: "🏷️", label: "Harga Sampah", path: "/HargaSampah" },
  { icon: "🕐", label: "Riwayat", path: "/riwayat" },
  { icon: "🔔", label: "Notifikasi", path: "/notifikasi", badge: 2 },
  { icon: "⚙️", label: "Pengaturan", path: "/pengaturan" },
  { icon: "❓", label: "Bantuan", path: "/bantuan" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={() => navigate("/")}>
        <img src={Logo} alt="logo" className="sidebar-logo-img" />
        <span className="sidebar-logo-text">K-Trash</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`sidebar-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            <span className="sidebar-item-label">{item.label}</span>
            {item.badge && (
              <span className="sidebar-badge">{item.badge}</span>
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar-leaf">🌿</div>
    </aside>
  );
};

export default Sidebar;