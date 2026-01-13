import React, { useState, useEffect } from "react";
import { Layout, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { SidebarMenu } from "../components/SidebarMenu";
import { authStore } from "../stores/authStore";

const { Header, Content } = Layout;

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
      <Layout style={{ minHeight: "100vh" }}>
        {showSidebar && (
          <Header
            style={{
              padding: "0 20px",
              background: "#001529",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
                marginRight: "20px",
                whiteSpace: "nowrap",
              }}
            >
              Mini Shop
            </div>

            {!isMobile ? (
              <div style={{ flex: 1 }}>
                <SidebarMenu mode="horizontal" theme="dark" />
              </div>
            ) : (
              <Button
                type="text"
                icon={<MenuOutlined style={{ color: "white" }} />}
                onClick={() => setVisible(true)}
                style={{ fontSize: "16px", width: 64, height: 64 }}
              />
            )}
          </Header>
        )}

        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            padding: 0,
          }}
        >
          {children}
        </Content>

        {showSidebar && (
          <Drawer
            title="Mini Shop"
            placement="left"
            onClose={() => setVisible(false)}
            open={visible}
            bodyStyle={{ padding: 0, background: "#001529" }}
            headerStyle={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
          >
            <SidebarMenu onItemClick={() => setVisible(false)} />
          </Drawer>
        )}
      </Layout>
    );
  }
);
