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

const sampleProducts = [
  {
    "id": 1,
    "name": "Laptop Dell Inspiron 15",
    "price": 15990000,
    "category": "Laptop",
    "image": "/images/products/dell-inspiron-15.jpg",
    "stock": 12,
    "description": "Cũm ngon"
  },
  {
    "id": 2,
    "name": "iPhone 15 Pro Max",
    "price": 31990000,
    "category": "Điện thoại",
    "image": "/images/products/iphone-15-pro-max.jpg",
    "stock": 8,
    "description": "You are very sweet"
  },
  {
    "id": 3,
    "name": "Samsung Galaxy S24 Ultra",
    "price": 28990000,
    "category": "Điện thoại",
    "image": "/images/products/galaxy-s24-ultra.jpg",
    "stock": 10,
    "description": "Hẹ hẹ ... WHy"
  }
];

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
    image: ""
  });

  // ======================
  // API CALLS
  // ======================

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:2908/products");
      console.log(res.data.data)
      setProducts(res.data.data);
    } catch (err) {
      console.error("GET error:", err);
    }
    setLoading(false);
  };

  const createProduct = async () => {
    const res = await axios.post("http://localhost:2908/products", {
      name: form.name,
      price: form.price,
      category: form.category,
      stock: form.stock,
      description: form.description,
      image: form.image
    });

    return res.data;
  };

  const updateProduct = async () => {
    const res = await axios.put(
      `http://localhost:2908/products/${form.id}`,
      {
        name: form.name,
        price: form.price,
        category: form.category,
        stock: form.stock,
        description: form.description,
        image: form.image
      }
    );

    return res.data;
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:2908/products/${id}`);
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
      image: ""
    });
    setPreviewImage(null);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      id: p._id,
      name: p.name,
      price: p.price,
      category: p.category,
      stock: p.stock,
      description: p.description,
      image: p.image
    });
    setPreviewImage(p.image);
    setShowModal(true);
  };

  const onImageChange = (e) => {
    const url = e.target.value;
    setForm({ ...form, image: url });
    setPreviewImage(url);
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
      {products?.map((p) => (
        <Col md={3} className="mb-4" key={p._id}>
          <Card className="product-card">
{p.image.length < 100 ? (
  /* TRƯỜNG HỢP ĐÚNG (< 100 ký tự): Hiển thị link ảnh online */
<img 
  src={p.image}
  alt="Mô tả ngắn gọn về nội dung bức ảnh" 
/>
) : (
  /* TRƯỜNG HỢP SAI (>= 100 ký tự): Xử lý trường hợp khác (ví dụ ảnh Base64 hoặc placeholder) */
  <Card.Img 
    src={p.image} 
    className="product-img" 
  />
)}
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

                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(p._id)}>
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
              <Form.Label>Ảnh sản phẩm (URL)</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nhập URL ảnh sản phẩm"
                value={form.image}
                onChange={onImageChange} 
              />

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
