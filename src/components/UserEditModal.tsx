import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import type { UserEditModalProps } from "../types/componentProps";

const { Option } = Select;

export const UserEditModal: React.FC<UserEditModalProps> = ({
  visible,
  user,
  onCancel,
  onUpdate,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && user) {
      form.setFieldsValue(user);
    }
  }, [visible, user, form]);

  return (
    <Modal
      title={`Edit User: ${user?.username}`}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onUpdate}>
        <Form.Item name="username" label="Username">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input the password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select>
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
