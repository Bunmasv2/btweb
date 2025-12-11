import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Spinner,
  Modal,
  Form
} from "react-bootstrap";
import axios from "axios";
import "../styles/ProductGrid.css";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  // Upload preview
  const [previewImage, setPreviewImage] = useState(null);

  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    imageFile: null
  });

  // ======================
  // API CALLS
  // ======================

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://localhost:5001/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("GET error:", err);
    }
    setLoading(false);
  };

  const createProduct = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    formData.append("description", form.description);
    if (form.imageFile) formData.append("imageFile", form.imageFile);

    const res = await axios.post("https://localhost:5001/api/products", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return res.data;
  };

  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    formData.append("description", form.description);
    if (form.imageFile) formData.append("imageFile", form.imageFile);

    const res = await axios.put(
      `https://localhost:5001/api/products/${form.id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return res.data;
  };

  const deleteProduct = async (id) => {
    await axios.delete(`https://localhost:5001/api/products/${id}`);
  };

  // load first time
  useEffect(() => {
    fetchProducts();
  }, []);

  // ======================
  // HANDLE EVENTS
  // ======================

  const openAdd = () => {
    setEditing(null);
    setForm({
      id: null,
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      imageFile: null
    });
    setPreviewImage(null);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category,
      stock: p.stock,
      description: p.description,
      imageFile: null
    });
    setPreviewImage(p.imageUrl);
    setShowModal(true);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, imageFile: file });

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (editing) {
      await updateProduct();
    } else {
      await createProduct();
    }

    setShowModal(false);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xóa sản phẩm?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  // UI
  return (
    <div className="container mt-4">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h3 className="fw-bold">Quản lý sản phẩm</h3>

    <Button variant="primary" className="add-btn d-flex align-items-center gap-2" onClick={openAdd}>
      <i className="bi bi-plus-circle"></i> Thêm sản phẩm
    </Button>
  </div>

  {loading ? (
    <div className="text-center mt-5">
      <Spinner animation="border" />
    </div>
  ) : (
    <Row>
      {products.map((p) => (
        <Col md={3} className="mb-4" key={p.id}>
          <Card className="product-card">
            <Card.Img src={p.imageUrl} className="product-img" />

            <Card.Body>
              <span className="category-badge">{p.category}</span>

              <div className="product-title">{p.name}</div>

              <div className="price-text mb-3">
                {p.price.toLocaleString()} đ
              </div>

              <div className="d-flex justify-content-between">
                <Button size="sm" variant="outline-primary" onClick={() => openEdit(p)}>
                  <i className="bi bi-pencil-square"></i> Sửa
                </Button>

                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(p.id)}>
                  <i className="bi bi-trash"></i> Xoá
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )}

  {/* Modal */}
  <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>{editing ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tồn kho</Form.Label>
              <Form.Control
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Danh mục</Form.Label>
              <Form.Control
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </Form.Group>
          </Col>

          {/* Cột 2 */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Ảnh sản phẩm</Form.Label>
              <Form.Control type="file" onChange={onFileChange} />

              {previewImage && (
                <img src={previewImage} className="modal-preview-img" />
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Hủy
      </Button>
      <Button variant="primary" onClick={handleSave}>
        {editing ? "Cập nhật" : "Thêm"}
      </Button>
    </Modal.Footer>
  </Modal>
</div>

  );
};

export default ProductGrid;
