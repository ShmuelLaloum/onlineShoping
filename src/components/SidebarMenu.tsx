import React from "react";
import { Menu, Badge } from "antd";
import {
  ShoppingCartOutlined,
  LogoutOutlined,
  ShopOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/authStore";
import { cartStore } from "../stores/cartStore";

interface SidebarMenuProps {
  onItemClick?: () => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = observer(
  ({ onItemClick }) => {
    const navigate = useNavigate();
    const location = useLocation();

    if (!authStore.isAuthenticated) return null;

    const menuItems = [];

    if (authStore.isAdmin) {
      menuItems.push({
        key: "/admin",
        icon: <DashboardOutlined />,
        label: "Admin Dashboard",
        onClick: () => {
          navigate("/admin");
          onItemClick?.();
        },
      });
    } else {
      menuItems.push({
        key: "/products",
        icon: <ShopOutlined />,
        label: "Products",
        onClick: () => {
          navigate("/products");
          onItemClick?.();
        },
      });
      menuItems.push({
        key: "/cart",
        icon: (
          <Badge count={cartStore.totalItems} size="small" offset={[5, 0]}>
            <ShoppingCartOutlined style={{ fontSize: "18px" }} />
          </Badge>
        ),
        label: "Cart",
        onClick: () => {
          navigate("/cart");
          onItemClick?.();
        },
      });
    }

    // Logout item
    menuItems.push({
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: () => {
        authStore.logout();
        navigate("/login");
        onItemClick?.();
      },
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* User Info Section for Sidebar */}
        <div
          style={{
            padding: "20px",
            color: "white",
            textAlign: "center",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <UserOutlined
              style={{
                fontSize: "24px",
                background: "rgba(255,255,255,0.1)",
                padding: "10px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div style={{ fontWeight: "bold" }}>
            {authStore.currentUser?.username}
          </div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            {authStore.isAdmin ? "Administrator" : "User"}
          </div>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1, borderRight: 0 }}
        />
      </div>
    );
  }
);
