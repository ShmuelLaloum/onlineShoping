import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Layout, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { SidebarMenu } from "../components/SidebarMenu";
import { authStore } from "../stores/authStore";
import type { MainLayoutProps } from "../types/componentProps";

import "../styles/MainLayout.css";

const { Header, Content } = Layout;

export const MainLayout: React.FC<MainLayoutProps> = observer(
  ({ children }) => {
    const [visible, setVisible] = useState<boolean>(false);

    const [isMobile, setIsMobile] = useState<boolean>(false);

    const location = useLocation();

    const isAuthPage = ["/login", "/register"].includes(location.pathname);
    const showSidebar = authStore.isAuthenticated && !isAuthPage;

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);

        if (window.innerWidth >= 768) {
          setVisible(false);
        }
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);

      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
      <Layout className="main-layout">
        {showSidebar && (
          <Header className="main-header">
            <div className="app-logo">Mini Shop</div>

            {!isMobile ? (
              <div className="desktop-menu-wrapper">
                <SidebarMenu mode="horizontal" theme="dark" />
              </div>
            ) : (
              <Button
                type="text"
                icon={<MenuOutlined className="mobile-menu-icon" />}
                onClick={() => setVisible(true)}
                className="mobile-menu-button"
              />
            )}
          </Header>
        )}

        <Content className={showSidebar ? "main-content" : "main-content-full"}>
          {children}
        </Content>

        {showSidebar && (
          <Drawer
            title="Mini Shop"
            placement="left"
            onClose={() => setVisible(false)}
            open={visible}
            rootClassName="custom-sidebar-drawer"
            className="custom-sidebar-drawer"
          >
            <SidebarMenu onItemClick={() => setVisible(false)} />
          </Drawer>
        )}
      </Layout>
    );
  }
);
