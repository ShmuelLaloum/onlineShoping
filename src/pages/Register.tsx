import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthLayout } from "../layouts/AuthLayout";
import { authStore } from "../stores/authStore";
import type { UserRole } from "../types/componentProps";
import { useNavigate, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const { Text } = Typography;
const { Option } = Select;

const Register: React.FC = observer(() => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>("user");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: {
    username: string;
    password?: string;
    adminCode?: string;
  }) => {
    setLoading(true);
    setTimeout(() => {
      const error = authStore.register(values.username, values.password, role);

      if (error) {
        message.error(error);
        setLoading(false);
      } else {
        message.success("Registration successful! Please login.");
        navigate("/login");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join our Mini Shop today">
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ role: "user" }}
      >
        <Form.Item label="Select Role" name="roleStr" initialValue="user">
          <Select value={role} onChange={(val) => setRole(val)} size="large">
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

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
            Create Account
          </Button>
          <div className="auth-link-container">
            <Text>Already have an account? </Text>
            <Link to="/login">Login here</Link>
          </div>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
});

export default Register;
