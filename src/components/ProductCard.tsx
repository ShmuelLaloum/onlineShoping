import React from "react";
import { Card, Button, Typography, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import type { Product } from "../types";
import { cartStore } from "../stores/cartStore";

const { Meta } = Card;
const { Text } = Typography;

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = () => {
    cartStore.addItem(product);
    message.success(`${product.name} added to cart!`);
  };

  return (
    <Card
      hoverable
      cover={
        <img
          alt={product.name}
          src={product.image}
          className="product-card-image"
        />
      }
      actions={[
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
          block
        >
          Add to Cart
        </Button>,
      ]}
    >
      <Meta
        title={product.name}
        description={
          <div className="product-desc-container">
            <Text type="secondary" ellipsis={{ tooltip: product.description }}>
              {product.description}
            </Text>
            <Text strong className="product-price">
              ${product.price.toFixed(2)}
            </Text>
          </div>
        }
      />
    </Card>
  );
};
