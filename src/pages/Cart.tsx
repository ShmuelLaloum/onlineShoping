import React, { useState } from "react";
import {
  Layout,
  Table,
  Button,
  Typography,
  Modal,
  Image,
  message,
  Empty,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { cartStore } from "../stores/cartStore";
import type { CartItem } from "../types";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;

const Cart: React.FC = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      key: "image",
      render: (src: string) => (
        <Image
          src={src}
          width={50}
          height={50}
          style={{ objectFit: "cover" }}
        />
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
      render: (_: any, record: CartItem) =>
        `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: CartItem) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => cartStore.removeItem(record.id)}
        />
      ),
    },
  ];

  const handlePayment = () => {
    setIsModalOpen(true);
  };

  const confirmPayment = () => {
    setIsModalOpen(false);
    message.success("Payment successful! Thank you for your purchase.");
    cartStore.clearCart();
    navigate("/products");
  };

  return (
    <Content className="page-content">
      <Title level={2} className="page-title">
        Your Shopping Cart
      </Title>

      {cartStore.items.length === 0 ? (
        <Empty description="Your cart is empty" />
      ) : (
        <>
          <Table
            dataSource={cartStore.items}
            columns={columns}
            rowKey="id"
            pagination={false}
            footer={() => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Text strong style={{ fontSize: "18px", marginRight: "20px" }}>
                  Total: ${cartStore.totalPrice.toFixed(2)}
                </Text>
                <Button type="primary" size="large" onClick={handlePayment}>
                  Pay Now
                </Button>
              </div>
            )}
          />
        </>
      )}

      <Modal
        title="Simulated Payment"
        open={isModalOpen}
        onOk={confirmPayment}
        onCancel={() => setIsModalOpen(false)}
        okText="Pay Now"
      >
        <p>
          Total Amount: <strong>${cartStore.totalPrice.toFixed(2)}</strong>
        </p>
        <p>This is a fake payment gateway.</p>
      </Modal>
    </Content>
  );
});

export default Cart;
