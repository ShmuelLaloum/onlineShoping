import React from "react";
import { Table, Button, Image, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { CartItem } from "../../types";
import { cartStore } from "../../stores/cartStore";
import { observer } from "mobx-react-lite";

const { Text } = Typography;

interface CartTableProps {
  onPayment: () => void;
}

export const CartTable: React.FC<CartTableProps> = observer(({ onPayment }) => {
  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      key: "image",
      render: (src: string) => (
        <Image src={src} width={50} height={50} className="cart-item-image" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      key: "total",
      render: (_: unknown, record: CartItem) =>
        `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: CartItem) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => cartStore.removeItem(record.id)}
        />
      ),
    },
  ];

  return (
    <Table
      dataSource={cartStore.items}
      columns={columns}
      rowKey="id"
      pagination={false}
      footer={() => (
        <div className="cart-table-footer">
          <Text strong className="cart-total-text">
            Total: ${cartStore.totalPrice.toFixed(2)}
          </Text>
          <Button type="primary" size="large" onClick={onPayment}>
            Pay Now
          </Button>
        </div>
      )}
    />
  );
});
