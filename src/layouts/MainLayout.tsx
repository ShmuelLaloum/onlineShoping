import React, { useState, useEffect } from "react";
import { Layout, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { SidebarMenu } from "../components/SidebarMenu";
import { authStore } from "../stores/authStore";

const { Header, Content } = Layout;
import "../styles/MainLayout.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = observer(
  ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const location = useLocation();

    const isAuthPage = ["/login", "/register"].includes(location.pathname);
    const showSidebar = authStore.isAuthenticated && !isAuthPage;

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        if (window.innerWidth >= 768) {
          setVisible(false);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
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
            // For older AntD versions where rootClassName might not work as expected or for overrides:
            className="custom-sidebar-drawer"
          >
            <SidebarMenu onItemClick={() => setVisible(false)} />
          </Drawer>
        )}
      </Layout>
    );
  }
);
