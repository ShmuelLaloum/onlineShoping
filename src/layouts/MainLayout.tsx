import React, { useState, useEffect } from "react";
import { Layout, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { SidebarMenu } from "../components/SidebarMenu";
import { authStore } from "../stores/authStore";

const { Header, Sider, Content } = Layout;

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
        {showSidebar && !isMobile && (
          <Sider breakpoint="md" collapsedWidth="0" theme="dark" width={250}>
            <div
              className="demo-logo-vertical"
              style={{
                height: "32px",
                margin: "16px",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              Mini Shop
            </div>
            <SidebarMenu />
          </Sider>
        )}

        <Layout>
          {showSidebar && isMobile && (
            <Header
              style={{
                padding: "0 20px",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                Mini Shop
              </div>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setVisible(true)}
                style={{ fontSize: "16px", width: 64, height: 64 }}
              />
            </Header>
          )}

          <Content
            style={
              showSidebar
                ? { margin: "24px 16px 0", overflow: "initial" }
                : { margin: 0, padding: 0 }
            }
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
      </Layout>
    );
  }
);
