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
                    <h4 className="title">Data Petugas</h4>
                    <p className="card-category">Total costumer = 2 orang</p>
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
                        <th className="border-0">ID</th>
                        <th className="border-0">Nama</th>
                        <th className="border-0">No HP</th>
                        <th className="border-0">Status</th>
                        <th className="border-0">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>Andi</td>
                        <td>0812-3456-7890</td>
                        <td>Aktif</td>
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
                    <tbody>
                      <tr>
                        <td>02</td>
                        <td>Rudi</td>
                        <td>0821-9876-5432</td>
                        <td>Offline</td>
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
