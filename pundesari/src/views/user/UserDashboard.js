import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

function UserDashboard() {
  const history = useHistory();
  const [balance, setBalance] = useState(0);
  const [isBalanceLoading, setIsBalanceLoading] = useState(true);
  
  const username = localStorage.getItem("nama") || "User";
  const userId = localStorage.getItem("userId") || 1;

  useEffect(() => {
    axios.get(`http://localhost:3000/wallet/${userId}`)
      .then(res => {
        setBalance(res.data.balance || 0);
        setIsBalanceLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsBalanceLoading(false);
      });
  }, [userId]);

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      <Container className="py-4">
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col xs="auto">
            <div 
              style={{ width: "45px", height: "45px", backgroundColor: "white", borderRadius: "12px", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", cursor: "pointer" }}
              onClick={() => history.push("/user/history")}
            >
              <i className="nc-icon nc-notes text-dark"></i>
            </div>
          </Col>
          <Col>
            <h5 style={{ fontWeight: "bold", margin: 0 }}>Halo, {username} 👋</h5>
            <small className="text-muted">ID: {userId}</small>
          </Col>
          <Col xs="auto">
            <div 
              style={{ width: "45px", height: "45px", borderRadius: "50%", backgroundImage: "url('https://i.pravatar.cc/150?u=a')", backgroundSize: "cover", cursor: "pointer" }}
              onClick={() => history.push("/user/profile")}
            ></div>
          </Col>
        </Row>

        {/* Wallet Card */}
        <Card style={{ background: "linear-gradient(135deg, #2E7D32, #4CAF50)", borderRadius: "20px", color: "white", border: "none", boxShadow: "0 10px 20px rgba(76, 175, 80, 0.3)" }}>
          <Card.Body className="p-4">
            <Row>
              <Col>
                <p style={{ margin: 0, opacity: 0.9 }}>Saldo K-Trash</p>
                <h2 style={{ fontWeight: "bold", margin: "5px 0 0 0", color: "white" }}>
                  {isBalanceLoading ? "Memuat..." : `Rp ${balance.toLocaleString('id-ID')}`}
                </h2>
              </Col>
              <Col xs="auto" className="d-flex align-items-center">
                <div style={{ backgroundColor: "rgba(255,255,255,0.2)", padding: "10px", borderRadius: "12px" }}>
                  <i className="nc-icon nc-money-coins" style={{ fontSize: "24px" }}></i>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Pickup Banner */}
        <div 
          className="mt-4 p-4 position-relative overflow-hidden" 
          style={{ backgroundColor: "#E8F5E9", borderRadius: "20px", border: "1px solid #C8E6C9", cursor: "pointer" }}
          onClick={() => history.push("/user/pickup")}
        >
          <Row className="align-items-center">
            <Col md="8">
              <Badge style={{ backgroundColor: "#4CAF50", padding: "5px 10px", marginBottom: "10px" }}>Layanan Tersedia</Badge>
              <h5 style={{ fontWeight: "bold", color: "#2E7D32", marginBottom: "5px" }}>Jemput Sampah Sekarang!</h5>
              <p style={{ margin: 0, color: "#388E3C", fontSize: "14px" }}>Tukarkan sampahmu menjadi saldo K-Trash dengan mudah.</p>
            </Col>
            <Col md="4" className="text-right d-none d-md-block">
              <i className="nc-icon nc-delivery-fast text-success" style={{ fontSize: "60px", opacity: 0.5 }}></i>
            </Col>
          </Row>
        </div>

        {/* Category & List (Simplified for phase 1) */}
        <h5 className="mt-5 mb-3" style={{ fontWeight: "bold", color: "#2D3142" }}>Kategori Sampah</h5>
        <Row>
          <Col md="4" className="mb-3">
            <Card style={{ borderRadius: "15px", border: "none", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <Card.Body className="text-center">
                <i className="nc-icon nc-apple text-success mb-2" style={{ fontSize: "30px" }}></i>
                <h6 style={{ fontWeight: "bold" }}>Organik</h6>
                <small className="text-muted">Sisa makanan, daun</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4" className="mb-3">
            <Card style={{ borderRadius: "15px", border: "none", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <Card.Body className="text-center">
                <i className="nc-icon nc-box text-warning mb-2" style={{ fontSize: "30px" }}></i>
                <h6 style={{ fontWeight: "bold" }}>Anorganik</h6>
                <small className="text-muted">Plastik, kertas, kaca</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4" className="mb-3">
            <Card style={{ borderRadius: "15px", border: "none", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <Card.Body className="text-center">
                <i className="nc-icon nc-bulb-63 text-danger mb-2" style={{ fontSize: "30px" }}></i>
                <h6 style={{ fontWeight: "bold" }}>Elektronik</h6>
                <small className="text-muted">Kabel, baterai, HP</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserDashboard;
