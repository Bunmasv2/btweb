import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from "react-bootstrap";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    const sampleProducts = [
  {
    "id": 1,
    "name": "Laptop Dell Inspiron 15",
    "price": 15990000,
    "category": "Laptop",
    "image": "/images/products/dell-inspiron-15.jpg",
    "stock": 12,
    "description": "Laptop Dell Inspiron 15 với hiệu năng ổn định."
  },
  {
    "id": 2,
    "name": "iPhone 15 Pro Max",
    "price": 31990000,
    "category": "Điện thoại",
    "image": "/images/products/iphone-15-pro-max.jpg",
    "stock": 8,
    "description": "iPhone 15 Pro Max mạnh mẽ với chip A17."
  },
  {
    "id": 3,
    "name": "Samsung Galaxy S24 Ultra",
    "price": 28990000,
    "category": "Điện thoại",
    "image": "/images/products/galaxy-s24-ultra.jpg",
    "stock": 10,
    "description": "S24 Ultra với S-Pen và camera zoom 10x."
  }
  // ... thêm các sản phẩm khác
];

    return (
        <Container className="mt-4">
            <Row>
                {sampleProducts.map((p) => (
                    <Col key={p.id} md={3} className="mb-4">
                        <ProductCard product={p} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
