import React from "react";

// react-bootstrap components
import { Badge, Button, Card, Container, Row, Col, Form, InputGroup, Table } from "react-bootstrap";

function Maps() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const confirmationData = [
    {
      id: 1,
      nama: "Bodida",
      jenisSampah: "PET",
      berat: "3 Kg",
      totalHarga: "Rp 12.000",
      status: "Pending",
    },
    {
      id: 2,
      nama: "Hasan",
      jenisSampah: "Kardus",
      berat: "5 Kg",
      totalHarga: "Rp 10.000",
      status: "Pending",
    },
    {
      id: 3,
      nama: "Triana",
      jenisSampah: "Kertas",
      berat: "2 Kg",
      totalHarga: "Rp 4.000",
      status: "Disetujui",
    },
    {
      id: 4,
      nama: "Umar",
      jenisSampah: "Besi",
      berat: "7 Kg",
      totalHarga: "Rp 17.500",
      status: "Pending",
    },
    {
      id: 5,
      nama: "Asep Budi",
      jenisSampah: "Kaleng",
      berat: "1 Kg",
      totalHarga: "Rp 4.000",
      status: "Pending",
    },
    {
      id: 6,
      nama: "Sinta",
      jenisSampah: "PP",
      berat: "3 Kg",
      totalHarga: "Rp 8.000",
      status: "Disetujui",
    },
    {
      id: 7,
      nama: "Umar",
      jenisSampah: "Besi",
      berat: "4 Kg",
      totalHarga: "Rp 14.000",
      status: "Pending",
    },
  ];

  const getStatusBadge = (status) => {
    if (status === "Pending") {
      return <Badge bg="warning" text="dark">Pending</Badge>;
    } else if (status === "Disetujui") {
      return <Badge bg="success">Disetujui</Badge>;
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Setatus Konfirmasi</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row className="align-items-center mb-3">
                  <Col md="12" className="text-right">
                    <InputGroup className="ml-auto" style={{ maxWidth: "250px" }}>
                      <Form.Control
                        placeholder="Cari..."
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <div className="table-responsive">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">Nama</th>
                        <th className="border-0">Jenis Sampah</th>
                        <th className="border-0">Berat</th>
                        <th className="border-0">Total Harga</th>
                        <th className="border-0">Status</th>
                        <th className="border-0">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {confirmationData.map((data) => (
                        <tr key={data.id}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: "50%",
                                  backgroundColor: "#ddd",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#666",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                }}
                              >
                                {data.nama.charAt(0)}
                              </div>
                              {data.nama}
                            </div>
                          </td>
                          <td>{data.jenisSampah}</td>
                          <td>{data.berat}</td>
                          <td>{data.totalHarga}</td>
                          <td>{getStatusBadge(data.status)}</td>
                          <td>
                            {data.status === "Pending" && (
                              <>
                                <Button variant="success" size="sm" className="mr-2">
                                  Setujui
                                </Button>
                                <Button variant="danger" size="sm">
                                  Tolak
                                </Button>
                              </>
                            )}
                            {data.status === "Disetujui" && (
                              <Button variant="danger" size="sm">
                                Tolak
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                <Row className="align-items-center mt-3">
                  <Col>
                    <nav>
                      <ul className="pagination mb-0">
                        <li className="page-item"><a className="page-link" href="#">«</a></li>
                        <li className="page-item"><a className="page-link" href="#">‹</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">8</a></li>
                        <li className="page-item"><a className="page-link" href="#">9</a></li>
                        <li className="page-item"><a className="page-link" href="#">›</a></li>
                        <li className="page-item"><a className="page-link" href="#">»</a></li>
                      </ul>
                    </nav>
                  </Col>
                  <Col className="text-right">
                    <p className="mb-0">Menampilkan 1 - 6 dari 27 transaksi</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Maps;