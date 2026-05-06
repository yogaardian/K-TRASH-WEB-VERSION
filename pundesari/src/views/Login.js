import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Isi semua data");
      return;
    }

    try {
      // Mengirim request ke backend
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });

      if (response.data.status === "success") {
        // 1. Simpan data sesi ke LocalStorage agar bisa diakses dashboard tujuan
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("nama", response.data.nama);
        localStorage.setItem("role", response.data.role); // 'admin', 'petugas', atau 'user'
        localStorage.setItem("userId", response.data.id);

        // 2. Logika Pengalihan (Redirect) berdasarkan Role
        const userRole = response.data.role;

        if (userRole === "admin") {
          // Mengarah ke Admin Dashboard [source: 2]
          history.push("/admin/dashboard");
        } 
        else if (userRole === "petugas") {
          // Mengarah ke Driver/Petugas Dashboard [source: 4]
          history.push("/driver/dashboard");
        } 
        else if (userRole === "user") {
          // Mengarah ke User Dashboard [source: 3]
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
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      background: "linear-gradient(rgba(255, 255, 255, 0.85), rgba(76, 175, 80, 0.2))",
      fontFamily: "'Inter', sans-serif" 
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md="5" lg="4">
            <div className="text-center mb-4">
              <img src="/LogoK-Trash.png" alt="K-Trash Logo" style={{ height: "120px" }} />
            </div>
            <Card className="card-user" style={{ borderRadius: "25px", boxShadow: "0 10px 20px rgba(0,0,0,0.1)", border: "none" }}>
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h4 style={{ color: "#2E7D32", fontWeight: "bold", marginBottom: "5px" }}>Selamat Datang! 🌿</h4>
                  <p className="text-muted" style={{ fontSize: "14px" }}>Masuk untuk melanjutkan ke K-Trash Web</p>
                </div>
                
                {error && <div className="alert alert-danger" style={{ borderRadius: "15px", fontSize: "14px" }}>{error}</div>}

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" style={{ borderRadius: "20px 0 0 20px", backgroundColor: "rgba(76, 175, 80, 0.08)", border: "1px solid rgba(76, 175, 80, 0.2)", borderRight: "none" }}>
                          <i className="nc-icon nc-single-02" style={{ color: "#2E7D32" }}></i>
                        </span>
                      </div>
                      <Form.Control
                        placeholder="Username / Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ borderRadius: "0 20px 20px 0", backgroundColor: "rgba(76, 175, 80, 0.08)", border: "1px solid rgba(76, 175, 80, 0.2)", borderLeft: "none", paddingLeft: "0" }}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" style={{ borderRadius: "20px 0 0 20px", backgroundColor: "rgba(76, 175, 80, 0.08)", border: "1px solid rgba(76, 175, 80, 0.2)", borderRight: "none" }}>
                          <i className="nc-icon nc-key-25" style={{ color: "#2E7D32" }}></i>
                        </span>
                      </div>
                      <Form.Control
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ borderRadius: "0 20px 20px 0", backgroundColor: "rgba(76, 175, 80, 0.08)", border: "1px solid rgba(76, 175, 80, 0.2)", borderLeft: "none", paddingLeft: "0" }}
                      />
                    </div>
                  </Form.Group>
                  <div className="text-right mb-4">
                    <a href="#pablo" onClick={(e) => {e.preventDefault(); alert('Fitur lupa password akan segera hadir');}} style={{ color: "#2E7D32", fontSize: "13px", textDecoration: "none", fontWeight: "500" }}>
                      Lupa password?
                    </a>
                  </div>
                  <Button
                    className="btn-fill w-100"
                    type="submit"
                    style={{ 
                      borderRadius: "25px", 
                      background: "linear-gradient(to right, #8BC34A, #2E7D32)", 
                      border: "none",
                      padding: "12px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      boxShadow: "0 4px 6px rgba(46, 125, 50, 0.2)"
                    }}
                  >
                    Masuk <i className="nc-icon nc-minimal-right ml-2"></i>
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <div className="text-center mt-4">
              <p className="text-muted" style={{ fontSize: "13px", fontWeight: "500" }}>
                <i className="nc-icon nc-check-2 text-success" style={{ marginRight: "5px" }}></i>
                Aman, Terpercaya, dan Ramah Lingkungan
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
