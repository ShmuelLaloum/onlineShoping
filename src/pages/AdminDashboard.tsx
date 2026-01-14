import React, { useState } from "react";
import {
  Layout,
  Table,
  Button,
  Typography,
  Tag,
  Popconfirm,
  message,
  Space,
} from "antd";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/authStore";
import type { User } from "../types";
import { useNavigate } from "react-router-dom";
import { UserEditModal } from "../components/UserEditModal";
import "../styles/AdminDashboard.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard: React.FC = observer(() => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  if (!authStore.isAdmin) {
    setTimeout(() => navigate("/products"), 0);
    return null;
  }

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (username: string) => {
    authStore.deleteUser(username);
    message.success("User deleted successfully");
  };

  const handleUpdate = (values: Partial<User>) => {
    if (editingUser) {
      authStore.updateUser(editingUser.username, values);
      message.success("User updated successfully");
      setIsModalOpen(false);
      setEditingUser(null);
    }
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text: string) => (
        <>
          <UserOutlined /> {text}
        </>
      ),
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "red" : "blue"}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Cart Items",
      dataIndex: "cart",
      key: "cartItems",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (cart: any[]) => cart?.length || 0,
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: User) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Delete user"
            description="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.username)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              disabled={record.username === authStore.currentUser?.username}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Content className="page-content">
      <Title level={2}>Admin Dashboard</Title>

      <Table dataSource={authStore.users} columns={columns} rowKey="username" />

      <UserEditModal
        visible={isModalOpen}
        user={editingUser}
        onCancel={() => setIsModalOpen(false)}
        onUpdate={handleUpdate}
      />
    </Content>
  );
});

export default AdminDashboard;
