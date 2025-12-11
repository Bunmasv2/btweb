import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();

    const goToDetail = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <Card className="shadow-sm">
            <Card.Img 
                variant="top" 
                src={product.image} 
                style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-primary fw-bold">
                    {product.price.toLocaleString()} VNĐ
                </Card.Text>
                <Button variant="primary" onClick={goToDetail}>
                    Xem chi tiết
                </Button>
            </Card.Body>
        </Card>
    );
}
