
import React, { useState } from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";

function Saldo() {

  // halaman
  const [halaman, setHalaman] = useState(1);

  // data user
  const [users, setUsers] = useState([
    {
      kode: "USR01",
      nama: "Budi",
      alamat: "Pundesari",
      saldo: 20000,
    },
    {
      kode: "USR02",
      nama: "Siti",
      alamat: "Malang",
      saldo: 75000,
    },
    {
      kode: "USR03",
      nama: "Yoga",
      alamat: "Batu",
      saldo: 120000,
    },
    {
      kode: "USR04",
      nama: "Rina",
      alamat: "Pujon",
      saldo: 35000,
    },
    {
      kode: "USR05",
      nama: "Doni",
      alamat: "Kediri",
      saldo: 90000,
    },
    {
      kode: "USR06",
      nama: "Ayu",
      alamat: "Blitar",
      saldo: 150000,
    },
    {
      kode: "USR07",
      nama: "Fajar",
      alamat: "Surabaya",
      saldo: 80000,
    },
    {
      kode: "USR08",
      nama: "Nina",
      alamat: "Jombang",
      saldo: 65000,
    },
  ]);

  // form top up
  const [kodeUser, setKodeUser] = useState("");
  const [tambahSaldo, setTambahSaldo] = useState("");

  // total saldo mengendap
  const totalMengendap = users.reduce((total, user) => {

    if (user.saldo >= 50000) {
      return total + 50000;
    }

    return total + user.saldo;

  }, 0);

  // top up saldo
  const handleTopUp = () => {

    if (kodeUser === "" || tambahSaldo === "") {
      alert("Isi semua data!");
      return;
    }

    const dataBaru = users.map((user) => {

      if (user.kode === kodeUser) {

        return {
          ...user,
          saldo: user.saldo + parseInt(tambahSaldo),
        };

      }

      return user;
    });

    setUsers(dataBaru);

    setKodeUser("");
    setTambahSaldo("");

    alert("Top Up Berhasil");
  };

  return (
    <>
      <Container fluid>

        {/* HEADER */}
        <Row>
          <Col md="12">
            <Card>
              <Card.Body>

                <h2>Menu Saldo</h2>

                <p>
                  Pengaturan saldo user dan hold saldo bulanan
                </p>

              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* HALAMAN 1 */}
        {halaman === 1 && (

          <Row>
            <Col md="12">
              <Card>
                <Card.Body>

                  <h4>1. Saldo Mengendap</h4>

                  <h5 className="mt-3">
                    Total Saldo Mengendap :
                    Rp {totalMengendap.toLocaleString()}
                  </h5>

                  <div className="table-responsive mt-4">

                    <Table className="table-hover table-striped">

                      <thead>
                        <tr>
                          <th>Kode</th>
                          <th>Nama</th>
                          <th>Alamat</th>
                          <th>Saldo</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>

                        {users.map((user, index) => (

                          <tr key={index}>

                            <td>{user.kode}</td>
                            <td>{user.nama}</td>
                            <td>{user.alamat}</td>

                            <td>
                              Rp {user.saldo.toLocaleString()}
                            </td>

                            <td>
                              {user.saldo < 50000
                                ? "Mengendap"
                                : "Sebagian Bisa Diambil"}
                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </Table>

                  </div>

                  <div className="text-right mt-3">

                    <Button
                      variant="success"
                      onClick={() => setHalaman(2)}
                    >
                      Selanjutnya
                    </Button>

                  </div>

                </Card.Body>
              </Card>
            </Col>
          </Row>

        )}

        {/* HALAMAN 2 */}
        {halaman === 2 && (

          <Row>
            <Col md="12">
              <Card>
                <Card.Body>

                  <h4>2. Saldo Bisa Diambil</h4>

                  <div className="table-responsive mt-4">

                    <Table className="table-hover table-striped">

                      <thead>
                        <tr>
                          <th>Kode</th>
                          <th>Nama</th>
                          <th>Total Saldo</th>
                          <th>Hold 50k</th>
                          <th>Bisa Diambil</th>
                        </tr>
                      </thead>

                      <tbody>

                        {users
                          .filter((user) => user.saldo > 50000)
                          .map((user, index) => (

                            <tr key={index}>

                              <td>{user.kode}</td>
                              <td>{user.nama}</td>

                              <td>
                                Rp {user.saldo.toLocaleString()}
                              </td>

                              <td>Rp 50.000</td>

                              <td>
                                Rp {(user.saldo - 50000).toLocaleString()}
                              </td>

                            </tr>

                          ))}

                      </tbody>

                    </Table>

                  </div>

                  <div className="d-flex justify-content-between mt-3">

                    <Button
                      variant="secondary"
                      onClick={() => setHalaman(1)}
                    >
                      Sebelumnya
                    </Button>

                    <Button
                      variant="success"
                      onClick={() => setHalaman(3)}
                    >
                      Selanjutnya
                    </Button>

                  </div>

                </Card.Body>
              </Card>
            </Col>
          </Row>

        )}

        {/* HALAMAN 3 */}
        {halaman === 3 && (

          <Row>
            <Col md="12">
              <Card>
                <Card.Body>

                  <h4>3. Top Up Saldo Manual</h4>

                  <Row className="mt-4">

                    <Col md="4">

                      <Form.Group>

                        <Form.Label>
                          Pilih User
                        </Form.Label>

                        <Form.Control
                          as="select"
                          value={kodeUser}
                          onChange={(e) =>
                            setKodeUser(e.target.value)
                          }
                        >

                          <option value="">
                            -- Pilih User --
                          </option>

                          {users.map((user, index) => (

                            <option
                              key={index}
                              value={user.kode}
                            >
                              {user.nama}
                            </option>

                          ))}

                        </Form.Control>

                      </Form.Group>

                    </Col>

                    <Col md="4">

                      <Form.Group>

                        <Form.Label>
                          Tambah Saldo
                        </Form.Label>

                        <Form.Control
                          type="number"
                          placeholder="Masukkan Saldo"
                          value={tambahSaldo}
                          onChange={(e) =>
                            setTambahSaldo(e.target.value)
                          }
                        />

                      </Form.Group>

                    </Col>

                  </Row>

                  <Button
                    variant="success"
                    className="mt-3"
                    onClick={handleTopUp}
                  >
                    Simpan Top Up
                  </Button>

                  <div className="mt-4">

                    <Button
                      variant="secondary"
                      onClick={() => setHalaman(2)}
                    >
                      Sebelumnya
                    </Button>

                  </div>

                </Card.Body>
              </Card>
            </Col>
          </Row>

        )}

      </Container>
    </>
  );
}

export default Saldo;

