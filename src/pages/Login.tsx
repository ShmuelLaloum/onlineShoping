import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { authStore } from "../stores/authStore";
import { useNavigate, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const { Text } = Typography;

import { AuthLayout } from "../layouts/AuthLayout";

const Login: React.FC = observer(() => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password?: string }) => {
    setLoading(true);
    setTimeout(() => {
      const error = authStore.login(values.username, values.password);

      if (error) {
        message.error(error);
        setLoading(false);
      } else {
        message.success(`Welcome back ${values.username}!`);
        navigate(authStore.isAdmin ? "/admin" : "/products");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Please login to your account">
      <Form name="login" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            className="auth-form-button"
          >
            Log in
          </Button>
          <div className="auth-link-container">
            <Text>Don't have an account? </Text>
            <Link to="/register">Create new account</Link>
          </div>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
});

export default Login;
