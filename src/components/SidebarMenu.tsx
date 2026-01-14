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
import "../styles/SidebarMenu.css";

import type { SidebarMenuProps } from "../types/componentProps";

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
          <Badge count={cartStore.itemCount} size="small" offset={[5, 0]}>
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
        className={`sidebar-menu-container ${
          mode === "horizontal" ? "horizontal" : "vertical"
        }`}
      >
        {mode !== "horizontal" && (
          <div className={`profile-section-vertical ${theme}`}>
            <div className="profile-icon-container">
              <UserOutlined className={`profile-icon ${theme}`} />
            </div>
            <div className="username-text">
              {authStore.currentUser?.username}
            </div>
            <div className="user-role-text">
              {authStore.isAdmin ? "Administrator" : "User"}
            </div>
          </div>
        )}

        <Menu
          theme={theme}
          mode={mode}
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="menu-instance"
        />

        {mode === "horizontal" && (
          <div className={`profile-section-horizontal ${theme}`}>
            <div className="user-info-horizontal">
              <UserOutlined className={`profile-icon-horizontal ${theme}`} />
              <span className="username-text">
                {authStore.currentUser?.username}
              </span>
            </div>
            <div className="logout-button" onClick={logoutItem.onClick}>
              <LogoutOutlined />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);
