import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

function History() {
  const history = useHistory();
  // Simulated global history data
  const data = [
    { nama: "Botol Plastik", kg: 2 },
    { nama: "Kardus", kg: 1.5 }
  ];
  const total = 15000;

  const handleSave = () => {
    alert("Transaksi berhasil disimpan");
    history.push("/user/dashboard");
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh", padding: "20px 0" }}>
      <Container>
        <div className="d-flex align-items-center mb-4">
          <i 
            className="nc-icon nc-minimal-left" 
            style={{ fontSize: "24px", cursor: "pointer", marginRight: "15px" }}
            onClick={() => history.push("/user/dashboard")}
          ></i>
          <h4 style={{ fontWeight: "bold", color: "#333", margin: "0" }}>Riwayat & Konfirmasi</h4>
        </div>
        <Card style={{ borderRadius: "15px", border: "none", boxShadow: "0 5px 10px rgba(0,0,0,0.05)" }}>
          <Card.Header style={{ backgroundColor: "#4CAF50", color: "white", borderRadius: "15px 15px 0 0", padding: "15px 20px" }}>
            <Card.Title as="h4" className="mb-0 text-white" style={{color: 'white'}}>Konfirmasi Transaksi</Card.Title>
          </Card.Header>
          <Card.Body className="p-4">
            <h5 style={{ fontWeight: "bold", fontSize: "16px" }}>Detail Sampah</h5>
            <div className="mt-3 mb-4">
              {data.map((item, index) => (
                <div key={index} className="py-2 border-bottom">
                  {item.nama} - {item.kg} Kg
                </div>
              ))}
            </div>
            
            <h5 style={{ fontWeight: "bold", fontSize: "18px", color: "#2E7D32" }}>
              Total: Rp {total.toLocaleString('id-ID')}
            </h5>

            <Button 
              className="w-100 mt-4" 
              style={{ backgroundColor: "#4CAF50", border: "none", padding: "12px", borderRadius: "10px", fontSize: "16px", fontWeight: "bold" }}
              onClick={handleSave}
            >
              Simpan
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default History;
