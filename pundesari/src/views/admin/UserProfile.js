import React from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
  InputGroup,
} from "react-bootstrap";

function User() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col md="8">
                    <h4 className="title">Data Costumer</h4>
                    <p className="card-category">Total costumer = 1 orang</p>
                  </Col>
                  <Col md="4" className="text-md-right">
                    <Button variant="success" className="btn-fill">
                      Tambah User
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <Card.Body>
                <Row className="align-items-center mb-3">
                  <Col md="6" className="mb-2 mb-md-0">
                    <InputGroup>
                      <Form.Control placeholder="Cari User" type="text" />
                    </InputGroup>
                  </Col>
                  <Col md="6" className="text-md-right">
                    <Button variant="outline-secondary">Filter</Button>
                  </Col>
                </Row>

                <div className="table-responsive">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">Kode</th>
                        <th className="border-0">Nama</th>
                        <th className="border-0">Jumlah Sampah (Kg)</th>
                        <th className="border-0">Alamat</th>
                        <th className="border-0">Saldo</th>
                        <th className="border-0">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>001</td>
                        <td>Bodida</td>
                        <td>12 Kg</td>
                        <td>Sigunggung</td>
                        <td>Rp 75.000</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="mr-2"
                            backgroundColor="#f0ad4e"
                          >
                            Edit
                          </Button>
                          <Button variant="danger" size="sm">
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
