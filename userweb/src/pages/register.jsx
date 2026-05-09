import React, { useState } from "react";
import "./css/register.css";

import { useNavigate } from "react-router-dom";
import BgRegister from "../assets/Bgregister.png";
import Logo from "../assets/LogoK-Trash.png";

import {
    Mail,
    Lock,
    User,
    Phone,
    Eye,
    EyeOff,
} from "lucide-react";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div
            className="register-page"
            style={{
                backgroundImage: `url(${BgRegister})`,
            }}
        >
            {/* OVERLAY */}
            <div className="overlay"></div>

            {/* TOP NAV */}
            <div className="top-navbar">
                <div className="logo-wrapper">
                    <img src={Logo} alt="logo" className="logo-img" />
                    <h1 className="logo-text">K-Trash</h1>
                </div>

                <div className="auth-switch">
                    <button className="login-switch" onClick={() => navigate("/login")}>
                        Login
                    </button>
                    <button className="register-switch active">
                        Daftar
                    </button>
                </div>
            </div>

            {/* REGISTER CARD */}
            <div className="register-container">
                <div className="register-card">
                    <h1 className="register-title">
                        <span>Buat Akun Baru</span>
                    </h1>

                    <p className="register-subtitle">
                        Bergabung dengan K-Trash dan mulai
                        kelola sampah dengan lebih mudah.
                    </p>

                    {/* FORM */}
                    <form className="register-form">
                        {/* NAMA */}
                        <div className="input-group">
                            <User size={20} className="input-icon" />

                            <input
                                type="text"
                                placeholder="Nama Lengkap"
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="input-group">
                            <Mail size={20} className="input-icon" />

                            <input
                                type="email"
                                placeholder="Email"
                            />
                        </div>

                        {/* PHONE */}
                        <div className="input-group">
                            <Phone size={20} className="input-icon" />

                            <input
                                type="text"
                                placeholder="Nomor HP"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="input-group">
                            <Lock size={20} className="input-icon" />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
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

                        {/* KONFIRMASI PASSWORD */}
                        <div className="input-group">
                            <Lock size={20} className="input-icon" />

                            <input
                                type="password"
                                placeholder="Konfirmasi Password"
                            />
                        </div>

                        {/* CHECKBOX */}
                        <div className="checkbox-group">
                            <input type="checkbox" />

                            <p>
                                Saya setuju dengan{" "}
                                <span>Syarat & Ketentuan</span> dan{" "}
                                <span>Kebijakan Privasi</span>
                            </p>
                        </div>

                        {/* BUTTON */}
                        <button className="register-btn">
                            Daftar Sekarang →
                        </button>

                        {/* LOGIN */}
                        <div className="bottom-login">
                            Sudah punya akun?
                            <span onClick={() => navigate("/login")} style={{ cursor: 'pointer' }}>
                                Login Sekarang
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;