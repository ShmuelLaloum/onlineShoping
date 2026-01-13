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
  mode?: "vertical" | "inline" | "horizontal";
  theme?: "light" | "dark";
}

export const SidebarMenu: React.FC<SidebarMenuProps> = observer(
  ({ onItemClick, mode = "inline", theme = "dark" }) => {
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

    const logoutItem = {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: () => {
        authStore.logout();
        navigate("/login");
        onItemClick?.();
      },
    };

    if (mode !== "horizontal") {
      menuItems.push(logoutItem);
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: mode === "horizontal" ? "row" : "column",
          height: mode === "horizontal" ? "100%" : "100%",
          width: "100%",
          alignItems: mode === "horizontal" ? "center" : "stretch",
        }}
      >
        {mode !== "horizontal" && (
          <div
            style={{
              padding: "20px",
              color: theme === "dark" ? "white" : "black",
              textAlign: "center",
              borderBottom:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <UserOutlined
                style={{
                  fontSize: "24px",
                  background:
                    theme === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
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
        )}

        <Menu
          theme={theme}
          mode={mode}
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{
            flex: 1,
            borderRight: 0,
            background: "transparent",
            borderBottom: 0,
          }}
        />

        {mode === "horizontal" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              paddingLeft: "20px",
              color: theme === "dark" ? "white" : "black",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <UserOutlined
                style={{
                  fontSize: "18px",
                  background:
                    theme === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
                  padding: "8px",
                  borderRadius: "50%",
                }}
              />
              <span style={{ fontWeight: "bold" }}>
                {authStore.currentUser?.username}
              </span>
            </div>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#ff4d4f",
              }}
              onClick={logoutItem.onClick}
            >
              <LogoutOutlined />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);
