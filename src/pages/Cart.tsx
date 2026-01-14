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
  List,
  Grid,
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
  const screens = Grid.useBreakpoint();

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
          {screens.md ? (
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
                  <Text
                    strong
                    style={{ fontSize: "18px", marginRight: "20px" }}
                  >
                    Total: ${cartStore.totalPrice.toFixed(2)}
                  </Text>
                  <Button type="primary" size="large" onClick={handlePayment}>
                    Pay Now
                  </Button>
                </div>
              )}
            />
          ) : (
            <div style={{ paddingBottom: "20px" }}>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={cartStore.items}
                footer={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      marginTop: "20px",
                    }}
                  >
                    <Text
                      strong
                      style={{
                        fontSize: "18px",
                        marginBottom: "10px",
                        display: "block",
                      }}
                    >
                      Total: ${cartStore.totalPrice.toFixed(2)}
                    </Text>
                    <Button
                      type="primary"
                      size="large"
                      block
                      onClick={handlePayment}
                    >
                      Pay Now
                    </Button>
                  </div>
                }
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    style={{
                      background: "white",
                      marginTop: "10px",
                      padding: "15px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                    extra={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        <Image
                          width={80}
                          height={80}
                          src={item.image}
                          style={{ objectFit: "cover", borderRadius: "4px" }}
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
                        <Text strong style={{ fontSize: "16px" }}>
                          {item.name}
                        </Text>
                      }
                      description={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
                          <Text>Price: ${item.price.toFixed(2)}</Text>
                          <Text>Quantity: {item.quantity}</Text>
                          <Text strong style={{ color: "black" }}>
                            Total: ${(item.price * item.quantity).toFixed(2)}
                          </Text>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          )}
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
