import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="auth-container">
      <Card hoverable className="auth-card">
        <Title level={2}>{title}</Title>
        <Text type="secondary" className="auth-subtitle">
          {subtitle}
        </Text>
        {children}
      </Card>
    </div>
  );
};
