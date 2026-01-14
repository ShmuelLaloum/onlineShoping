import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

import type { AuthLayoutProps } from "../types/componentProps";

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
