import React from "react";
import { List, Button, Image, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { cartStore } from "../../stores/cartStore";
import { observer } from "mobx-react-lite";

const { Text } = Typography;

import type { CartListProps } from "../../types/componentProps";

export const CartList: React.FC<CartListProps> = observer(({ onPayment }) => {
  return (
    <div className="cart-list-container">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={cartStore.items}
        footer={
          <div className="cart-list-footer">
            <Text strong className="cart-list-total-text">
              Total: ${cartStore.totalPrice.toFixed(2)}
            </Text>
            <Button type="primary" size="large" block onClick={onPayment}>
              Pay Now
            </Button>
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.id}
            className="cart-list-item"
            extra={
              <div className="cart-item-actions">
                <Image
                  width={80}
                  height={80}
                  src={item.image}
                  className="cart-item-image"
                />
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => cartStore.removeItem(item.id)}
                >
                  Remove
                </Button>
              </div>
            }
          >
            <List.Item.Meta
              title={
                <Text strong className="cart-item-title">
                  {item.name}
                </Text>
              }
              description={
                <div className="cart-item-desc">
                  <Text>Price: ${item.price.toFixed(2)}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text strong className="cart-item-total">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
});
