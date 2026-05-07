import React, { useState, useEffect } from "react";
import axios from "axios";
// Cukup impor semua dari "react-bootstrap" dalam satu baris untuk menghindari konflik
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Table,
  Modal,
} from "react-bootstrap";

function GarbageManagement() {
  const [garbageData, setGarbageData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentJenis, setCurrentJenis] = useState("anorganik");

  // State untuk form tambah/edit
  const [formData, setFormData] = useState({
    id: "",
    jenis: "anorganik",
    nama: "",
    harga: "",
  });

  // URL API Backend
  const API_URL = "http://localhost:3000";

  // 1. Ambil data dari database
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/harga/${currentJenis}`);
      setGarbageData(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentJenis]); // Akan reload jika filter kategori berubah

  // 2. Fungsi Simpan (Tambah/Edit)
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Logika Update (PATCH)
        await axios.patch(`${API_URL}/admin/harga/${formData.id}`, formData);
      } else {
        // Logika Simpan Baru (POST)
        await axios.post(`${API_URL}/admin/harga`, formData);
      }
      setShowModal(false);
      fetchData();
      alert("Data berhasil diproses!");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan pada server. Pastikan API CORS sudah aktif.");
    }
  };

  // 3. Fungsi Hapus
  const handleDelete = async (id) => {
    if (window.confirm("Hapus jenis sampah ini?")) {
      try {
        await axios.delete(`${API_URL}/admin/harga/${id}`);
        fetchData();
      } catch (error) {
        console.error("Gagal menghapus:", error);
      }
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strappe-table-with-hover">
              <Card.Header>
                <Card.Title as="h4">Manajemen Data Sampah</Card.Title>
                <Row>
                  <Col md="3">
                    <Form.Select 
                      className="mt-2"
                      value={currentJenis}
                      onChange={(e) => setCurrentJenis(e.target.value)}
                    >
                      <option value="anorganik">Anorganik</option>
                      <option value="organik">Organik</option>
                      <option value="elektronik">Elektronik</option>
                    </Form.Select>
                  </Col>
                </Row>
                <p className="card-category mt-2">
                  Total tersedia: {garbageData.length} jenis sampah
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <div className="px-4 mb-3">
                  <Row className="align-items-center">
                    <Col md="4">
                      <Button
                        variant="success"
                        className="btn-fill"
                        onClick={() => {
                          setFormData({ id: "", jenis: currentJenis, nama: "", harga: "" });
                          setShowModal(true);
                        }}
                      >
                        + Tambah Jenis Sampah
                      </Button>
                    </Col>
                    <Col md="8">
                      <InputGroup>
                        <Form.Control placeholder="Cari Jenis Sampah..." type="text" />
                      </InputGroup>
                    </Col>
                  </Row>
                </div>

                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Kategori</th>
                      <th>Jenis Sampah</th>
                      <th>Harga / Kg</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan="4" className="text-center">Memuat data...</td></tr>
                    ) : garbageData.length === 0 ? (
                      <tr><td colSpan="4" className="text-center">Data Kosong</td></tr>
                    ) : (
                      garbageData.map((item, index) => (
                        <tr key={item.id || index}>
                          <td className="text-capitalize">{currentJenis}</td>
                          <td>{item.nama}</td>
                          <td>Rp {item.harga ? parseInt(item.harga).toLocaleString() : 0}</td>
                          <td>
                            <Button
                              variant="warning"
                              size="sm"
                              className="mr-2 btn-fill"
                              onClick={() => {
                                setFormData({
                                  id: item.id,
                                  jenis: currentJenis,
                                  nama: item.nama,
                                  harga: item.harga,
                                });
                                setShowModal(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              className="btn-fill"
                              onClick={() => handleDelete(item.id)}
                            >
                              Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* MODAL FORM TAMBAH/EDIT */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Edit Data" : "Tambah Data"} Sampah</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                as="select"
                value={formData.jenis}
                onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
              >
                <option value="anorganik">Anorganik</option>
                <option value="organik">Organik</option>
                <option value="elektronik">Elektronik</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Jenis Sampah</Form.Label>
              <Form.Control
                placeholder="Contoh: Botol Plastik PET"
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Harga per Kg (Rp)</Form.Label>
              <Form.Control
                placeholder="Contoh: 4000"
                type="number"
                required
                value={formData.harga}
                onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Batal
            </Button>
            <Button variant="primary" type="submit" className="btn-fill">
              Simpan Data
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default GarbageManagement;