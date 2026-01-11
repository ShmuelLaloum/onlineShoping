import React from "react";
import { Layout, Menu, Button, Badge } from "antd";
import {
  ShoppingCartOutlined,
  LogoutOutlined,
  ShopOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/authStore";
import { cartStore } from "../stores/cartStore";

const { Header } = Layout;

export const Navbar: React.FC = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!authStore.isAuthenticated) return null;

  const menuItems = [];

  if (authStore.isAdmin) {
    menuItems.push({
      key: "/admin",
      icon: <DashboardOutlined />,
      label: "Admin Dashboard",
      onClick: () => navigate("/admin"),
    });
  } else {
    menuItems.push({
      key: "/products",
      icon: <ShopOutlined />,
      label: "Products",
      onClick: () => navigate("/products"),
    });
    menuItems.push({
      key: "/cart",
      icon: (
        <Badge count={cartStore.totalItems} size="small" offset={[5, 0]}>
          <ShoppingCartOutlined style={{ fontSize: "18px" }} />
        </Badge>
      ),
      label: "Cart",
      onClick: () => navigate("/cart"),
    });
  }

  const handleLogout = () => {
    authStore.logout();
    navigate("/login");
  };

  return (
    <Header className="navbar-header">
      <div className="navbar-logo">Mini Shop</div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="navbar-menu"
      />
      <div className="navbar-user">
        <span>Hello, {authStore.currentUser?.username}</span>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Header>
  );
});
