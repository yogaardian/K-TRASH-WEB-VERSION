import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/login.css";
import Logo from "../assets/LogoK-Trash.png";
import BgImage from "../assets/Bgregister.png";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Isi semua data");
      return;
    }

    setLoading(true);
    try {
      // Mengirim request ke backend
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });

      if (response.data.status === "success") {
        // 1. Simpan data sesi ke LocalStorage
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("nama", response.data.nama);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userId", response.data.id);

        // 2. Logika Pengalihan berdasarkan Role
        const userRole = response.data.role;

        if (userRole === "admin") {
          history.push("/admin/dashboard");
        } 
        else if (userRole === "petugas") {
          history.push("/driver/dashboard");
        } 
        else if (userRole === "user") {
          history.push("/user/dashboard");
        } 
        else {
          setError("Role tidak dikenali. Hubungi admin.");
        }
      } else {
        setError("Login gagal. Periksa kembali email dan password Anda.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan pada server atau koneksi terputus.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
    >
      {/* OVERLAY */}
      <div className="overlay"></div>

      {/* TOP NAVBAR */}
      <div className="top-navbar">
        <div className="logo-wrapper">
          <img src={Logo} alt="logo" className="logo-img" />
          <h1 className="logo-text">K-Trash</h1>
        </div>

        <div className="auth-switch">
          <button className="login-switch active">
            Login
          </button>
          <button
            className="register-switch"
            onClick={() => history.push("/Register")}
          >
            Daftar
          </button>
        </div>
      </div>

      {/* LOGIN CARD */}
      <div className="login-container">
        <div className="login-card">
          {/* TITLE */}
          <h1 className="login-title">
            <span>Selamat Datang</span>
          </h1>

          <p className="login-subtitle">
            Masuk ke akun K-Trash Anda dan mulai
            kelola sampah dengan lebih mudah.
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert-error" style={{
              backgroundColor: "#fee",
              color: "#c33",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px"
            }}>
              {error}
            </div>
          )}

          {/* FORM */}
          <form className="login-form" onSubmit={handleLogin}>
            {/* EMAIL */}
            <div className="input-group">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <Lock size={20} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* REMEMBER */}
            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                Ingat Saya
              </label>

              <span className="forgot-password">
                Lupa Password?
              </span>
            </div>

            {/* BUTTON */}
            <button 
              className="login-submit-btn" 
              type="submit"
              disabled={loading}
            >
              {loading ? "Memuat..." : "Masuk Sekarang"}
            </button>

            {/* REGISTER */}
            <div className="bottom-register">
              Belum punya akun?
              <span onClick={() => history.push("/Register")} style={{ cursor: 'pointer' }}>
                {" "}Daftar Sekarang
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
