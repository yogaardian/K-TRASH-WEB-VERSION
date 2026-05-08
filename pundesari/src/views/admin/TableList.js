
import React, { useState, useEffect } from "react";
import axios from "axios";

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

  // data user
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/role/driver');
        setUsers(response.data.map(user => ({
          id: user.id,
          nama: user.nama,
          hp: user.nomor_hp,
          status: "Aktif", // Placeholder
        })));
      } catch (error) {
        console.error('Failed to fetch drivers:', error);
      }
      setLoading(false);
    };
    fetchDrivers();
  }, []);

  // tampil / sembunyi form
  const [showForm, setShowForm] = useState(false);

  // form input
  const [nama, setNama] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState("");

  // tambah user
  const tambahUser = () => {

    if (nama === "" || hp === "" || status === "") {
      alert("Isi semua data!");
      return;
    }

    const nomorBaru = users.length + 1;

    const userBaru = {
      id: nomorBaru < 10 ? `0${nomorBaru}` : nomorBaru,
      nama: nama,
      hp: hp,
      status: status,
    };

    setUsers([...users, userBaru]);

    // reset form
    setNama("");
    setHp("");
    setStatus("");

    // tutup form
    setShowForm(false);
  };

  // hapus user
  const hapusUser = (id) => {
    const dataBaru = users.filter((user) => user.id !== id);
    setUsers(dataBaru);
  };

  return (
    <>
      <Container fluid>

        {/* Header */}
        <Row>
          <Col md="12">
            <Card>
              <Card.Body>

                <Row className="align-items-center">

                  <Col md="8">
                    <h4 className="title">Data Petugas</h4>

                    <p className="card-category">
                      Total costumer = {users.length} orang
                    </p>
                  </Col>

                  <Col md="4" className="text-md-right">

                    <Button
                      variant="success"
                      className="btn-fill"
                      onClick={() => setShowForm(true)}
                    >
                      Tambah User
                    </Button>

                  </Col>

                </Row>

              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FORM TAMBAH */}
        {showForm && (

          <Row>
            <Col md="12">
              <Card>
                <Card.Body>

                  <h5 className="mb-3">Tambah User</h5>

                  <Row>

                    <Col md="4">
                      <Form.Group>
                        <Form.Label>Nama</Form.Label>

                        <Form.Control
                          type="text"
                          placeholder="Masukkan Nama"
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md="4">
                      <Form.Group>
                        <Form.Label>No HP</Form.Label>

                        <Form.Control
                          type="text"
                          placeholder="Masukkan No HP"
                          value={hp}
                          onChange={(e) => setHp(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md="4">
                      <Form.Group>
                        <Form.Label>Status</Form.Label>

                        <Form.Control
                          type="text"
                          placeholder="Aktif / Offline"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                  </Row>

                  <Button
                    variant="success"
                    className="mt-3 mr-2"
                    onClick={tambahUser}
                  >
                    Simpan
                  </Button>

                  <Button
                    variant="secondary"
                    className="mt-3"
                    onClick={() => setShowForm(false)}
                  >
                    Batal
                  </Button>

                </Card.Body>
              </Card>
            </Col>
          </Row>

        )}

        {/* Table */}
        <Row>
          <Col md="12">
            <Card>
              <Card.Body>

                <Row className="align-items-center mb-3">

                  <Col md="6" className="mb-2 mb-md-0">
                    <InputGroup>
                      <Form.Control
                        placeholder="Cari User"
                        type="text"
                      />
                    </InputGroup>
                  </Col>

                  <Col md="6" className="text-md-right">
                    <Button variant="outline-secondary">
                      Filter
                    </Button>
                  </Col>

                </Row>

                <div className="table-responsive">

                  <Table className="table-hover table-striped">

                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>No HP</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>

                    <tbody>

                      {loading ? (
                        <tr><td colSpan="5" className="text-center">Memuat data...</td></tr>
                      ) : users.length === 0 ? (
                        <tr><td colSpan="5" className="text-center">Data Kosong</td></tr>
                      ) : (
                        users.map((user, index) => (
                          <tr key={user.id}>

                            <td>{user.id}</td>
                            <td>{user.nama}</td>
                            <td>{user.hp}</td>
                            <td>{user.status}</td>

                            <td>

                              <Button
                                variant="warning"
                              size="sm"
                              className="mr-2"
                            >
                              Edit
                            </Button>

                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => hapusUser(user.id)}
                            >
                              Hapus
                            </Button>

                          </td>

                        </tr>
                      ))
                      )}

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
