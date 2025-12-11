// ProductCard.jsx
import React from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { FiEye, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const ProductCard = ({ item, onView, onEdit, onDelete, onAdd }) => {
  return (
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

        <Card.Text className="text-danger fw-bold">
          {item.price.toLocaleString()} đ
        </Card.Text>

        <Card.Text className="text-muted" style={{ fontSize: "0.85rem" }}>
          Kho: {item.stock}
        </Card.Text>

        {/* Nhóm nút Xem – Sửa – Xóa */}
        <ButtonGroup className="w-100 mb-2 gap-2">
          <Button variant="info" onClick={() => onView?.(item)}>
            <FiEye size={16} /> Xem
          </Button>

          <Button variant="warning" onClick={() => onEdit?.(item)}>
            <FiEdit2 size={16} /> Sửa
          </Button>

          <Button variant="danger" onClick={() => onDelete?.(item.id)}>
            <FiTrash2 size={16} /> Xóa
          </Button>
        </ButtonGroup>

        {/* Nút Add riêng */}
        <Button variant="success" className="w-100" onClick={() => onAdd?.(item)}>
          <FiPlus size={18} /> Thêm
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
