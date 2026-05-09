import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";

import BgImage from "../assets/Bgregister.png";
import Logo from "../assets/LogoK-Trash.png";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

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

        {/* LOGO */}
        <div className="logo-wrapper">
          <img
            src={Logo}
            alt="logo"
            className="logo-img"
          />

          <h1 className="logo-text">
            K-Trash
          </h1>
        </div>

        {/* SWITCH */}
        <div className="auth-switch">

          <button className="login-switch active">
            Login
          </button>

          <button
            className="register-switch"
            onClick={() => navigate("/register")}
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

          {/* FORM */}
          <form className="login-form">

            {/* EMAIL */}
            <div className="input-group">

              <Mail
                size={20}
                className="input-icon"
              />

              <input
                type="email"
                placeholder="Masukkan Email"
              />

            </div>

            {/* PASSWORD */}
            <div className="input-group">

              <Lock
                size={20}
                className="input-icon"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Masukkan Password"
              />

              <button
                type="button"
                className="eye-button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
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
            <button className="login-submit-btn" onClick={() => navigate("/dashboard")}>
              Masuk Sekarang 
            </button>

            {/* REGISTER */}
            <div className="bottom-register">
              Belum punya akun?

              <span
                onClick={() =>
                  navigate("/register")
                }
              >
                {" "}
                Daftar Sekarang
              </span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;