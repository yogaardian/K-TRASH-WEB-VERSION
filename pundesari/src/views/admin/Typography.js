import React from "react";

// react-bootstrap components
import { Card, Container, Row, Col, Button, Form, InputGroup, Table } from "react-bootstrap";

function Typography() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Data Sampah</Card.Title>
                <p className="card-category">Total sampah = 5 sampah</p>
              </Card.Header>
              <Card.Body>
                <Row className="align-items-center mb-3">
                  <Col md="4" className="mb-2 mb-md-0">
                    <Button variant="success" className="btn-fill">
                      + Tambah Harga
                    </Button>
                  </Col>
                  <Col md="5" className="mb-2 mb-md-0">
                    <InputGroup>
                      <Form.Control placeholder="Cari Jenis Sampah" type="text" />
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
                        <th className="border-0">Kategori</th>
                        <th className="border-0">Jenis Sampah</th>
                        <th className="border-0">Harga / Kg</th>
                        <th className="border-0">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Anorganik</td>
                        <td>PET</td>
                        <td>Rp 4.000</td>
                        <td>
                          <Button variant="warning" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="danger" size="sm">
                            Hapus
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>Anorganik</td>
                        <td>HDPE (botol sabun)</td>
                        <td>Rp 3.500</td>
                        <td>
                          <Button variant="warning" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="danger" size="sm">
                            Hapus
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>Anorganik</td>
                        <td>PVC</td>
                        <td>Rp 1.500</td>
                        <td>
                          <Button variant="warning" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="danger" size="sm">
                            Hapus
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>Anorganik</td>
                        <td>LDPE (kantong kresek)</td>
                        <td>Rp 1.200</td>
                        <td>
                          <Button variant="warning" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="danger" size="sm">
                            Hapus
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>Anorganik</td>
                        <td>Plastik Campur</td>
                        <td>Rp 1.000</td>
                        <td>
                          <Button variant="warning" size="sm" className="mr-2">
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
                    <p className="mb-0">Menampilkan 1-5 dari 5 jenis</p>
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

export default Typography;
