import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";

// Data mẫu tạm thời
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
  // ... thêm các sản phẩm khác
];

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Giả lập gọi API
  const fetchProducts = async () => {
    setLoading(true);

    setTimeout(() => {
      setProducts(sampleProducts); // sau này đổi thành API thật
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Danh sách sản phẩm</h3>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p>Đang tải...</p>
        </div>
      )}

      <Row>
        {products.map((item) => (
          <Col key={item.id} md={3} sm={6} xs={12} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={item.image}
                style={{ height: "180px", objectFit: "cover" }}
              />

              <Card.Body>
                <Card.Title className="fw-bold" style={{ fontSize: "1rem" }}>
                  {item.name}
                </Card.Title>

                <Card.Text className="text-primary fw-bold">
                  {item.price.toLocaleString()} đ
                </Card.Text>

                <Card.Text className="fw-bold">
                  {item.description.toLocaleString()}
                </Card.Text>

                <Card.Text className="text-muted" style={{ fontSize: "0.85rem" }}>
                  Kho: {item.stock}
                </Card.Text>

                <Button variant="primary" className="w-100">
                  Xem chi tiết
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductGrid;
