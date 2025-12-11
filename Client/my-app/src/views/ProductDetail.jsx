import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <Container className="mt-4">
            <h2>{product.name}</h2>
            <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: "300px", borderRadius: "10px" }} 
            />
            <h4 className="mt-3 text-primary fw-bold">
                {product.price.toLocaleString()} VNĐ
            </h4>
            <p className="mt-2">{product.description}</p>
        </Container>
    );
}
