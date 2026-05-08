
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
} from "react-bootstrap";

function Saldo() {

  // halaman
  const [halaman, setHalaman] = useState(1);

  // data user
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data with wallets
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/role/user');
        const usersWithBalance = await Promise.all(
          response.data.map(async (user) => {
            try {
              const balanceRes = await axios.get(`http://localhost:3000/wallet/${user.id}`);
              return {
                kode: `USR${String(user.id).padStart(2, '0')}`,
                id: user.id,
                nama: user.nama,
                alamat: "-",
                saldo: balanceRes.data.balance || 0,
              };
            } catch (error) {
              return {
                kode: `USR${String(user.id).padStart(2, '0')}`,
                id: user.id,
                nama: user.nama,
                alamat: "-",
                saldo: 0,
              };
            }
          })
        );
        setUsers(usersWithBalance);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

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
  const handleTopUp = async () => {

    if (kodeUser === "" || tambahSaldo === "") {
      alert("Isi semua data!");
      return;
    }

    try {
      const user = users.find(u => u.kode === kodeUser);
      if (user) {
        await axios.post('http://localhost:3000/admin/add-balance', {
          user_id: user.id,
          amount: parseInt(tambahSaldo),
        });
        
        // Refresh data
        const updatedUser = {
          ...user,
          saldo: user.saldo + parseInt(tambahSaldo),
        };
        setUsers(users.map(u => u.id === user.id ? updatedUser : u));
        setKodeUser("");
        setTambahSaldo("");
        alert("Top Up Berhasil");
      }
    } catch (error) {
      console.error('Failed to add balance:', error);
      alert("Gagal menambah saldo");
    }
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
                        {loading ? (
                          <tr><td colSpan="5" className="text-center">Memuat data...</td></tr>
                        ) : users.length === 0 ? (
                          <tr><td colSpan="5" className="text-center">Data Kosong</td></tr>
                        ) : (
                          users.map((user, index) => (
                            <tr key={user.id}>

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
                          ))
                        )}

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

