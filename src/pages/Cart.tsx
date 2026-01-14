import React, { useState } from "react";
import { Layout, Typography, Modal, Empty, Grid, message } from "antd";
import { observer } from "mobx-react-lite";
import { cartStore } from "../stores/cartStore";
import { useNavigate } from "react-router-dom";
import { CartTable } from "../components/cart/CartTable";
import { CartList } from "../components/cart/CartList";
import "../styles/Cart.css";

const { Content } = Layout;
const { Title } = Typography;

const Cart: React.FC = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint();

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
            <CartTable onPayment={handlePayment} />
          ) : (
            <CartList onPayment={handlePayment} disabled={isModalOpen} />
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
