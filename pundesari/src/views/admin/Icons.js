import React from "react";

// react-bootstrap components
import { Button, Card, Container, Row, Col, Form, InputGroup, Table } from "react-bootstrap";

function Icons() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Transaksi</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row className="align-items-center mb-3">
                  <Col md="4" className="mb-2 mb-md-0">
                    <InputGroup>
                      <Form.Control placeholder="05/04/2024 - 06/04/2024" type="text" />
                    </InputGroup>
                  </Col>
                  <Col md="5" className="mb-2 mb-md-0">
                    <InputGroup>
                      <Form.Control placeholder="Cari Transaksi" type="text" />
                    </InputGroup>
                  </Col>
                  <Col md="3" className="text-md-right">
                    <Button variant="outline-secondary">Filter</Button>
                  </Col>
                </Row>

                <div className="table-responsive">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">Tanggal</th>
                        <th className="border-0">Kode User</th>
                        <th className="border-0">Nama</th>
                        <th className="border-0">Total Sampah</th>
                        <th className="border-0">Total Harga</th>
                        <th className="border-0">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>05/04</td>
                        <td>001</td>
                        <td>Bodida</td>
                        <td>3 Kg</td>
                        <td>Rp 5.000</td>
                        <td>
                          <Button variant="success" size="sm" className="mr-2">
                            Detail
                          </Button>
                          <Button variant="danger" size="sm">
                            Hapus
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>06/04</td>
                        <td>002</td>
                        <td>Siti</td>
                        <td>2 Kg</td>
                        <td>Rp 3.000</td>
                        <td>
                          <Button variant="success" size="sm" className="mr-2">
                            Detail
                          </Button>
                          <Button variant="danger" size="sm">
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <Row className="align-items-center mt-3">
                  <Col>
                    <nav>
                      <ul className="pagination mb-0">
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                        <li className="page-item"><a className="page-link" href="#">&gt;</a></li>
                      </ul>
                    </nav>
                  </Col>
                  <Col className="text-right">
                    <p className="mb-0">Menampilkan 1-2 dari 120 transaksi</p>
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

export default Icons;
