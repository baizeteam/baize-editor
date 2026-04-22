import React, { useState } from "react";
import { Button, Form, Input, Modal, Space, Typography } from "antd";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../auth/adminCredentials";

type Props = {
  open: boolean;
  onGuest: () => void;
  onAdminSuccess: () => void;
};

export function EntryGateModal({ open, onGuest, onAdminSuccess }: Props) {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [lastError, setLastError] = useState<string | null>(null);

  const resetAdminFlow = () => {
    setShowAdminForm(false);
    setLastError(null);
    form.resetFields();
  };

  return (
    <Modal
      title="进入编辑器"
      open={open}
      footer={null}
      closable={false}
      maskClosable={false}
      keyboard={false}
      centered
      afterOpenChange={(nextOpen) => {
        if (!nextOpen) resetAdminFlow();
      }}
    >
      <Typography.Paragraph type="secondary" className="!mb-4">
        请选择身份。未通过管理员验证的访问将视为访客。
      </Typography.Paragraph>

      {!showAdminForm ? (
        <Space direction="vertical" size="middle" className="w-full">
          <Button type="primary" block size="large" onClick={onGuest}>
            以访客继续
          </Button>
          <Button block size="large" onClick={() => setShowAdminForm(true)}>
            管理员登录
          </Button>
        </Space>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={(values: { username: string; password: string }) => {
            setSubmitting(true);
            setLastError(null);
            const ok =
              values.username === ADMIN_USERNAME &&
              values.password === ADMIN_PASSWORD;
            setSubmitting(false);
            if (ok) {
              onAdminSuccess();
            } else {
              setLastError("用户名或密码不正确，请重试。");
            }
          }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input autoComplete="username" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password autoComplete="current-password" />
          </Form.Item>
          {lastError ? (
            <Typography.Text type="danger" className="block mb-3">
              {lastError}
            </Typography.Text>
          ) : null}
          <Space wrap>
            <Button type="primary" htmlType="submit" loading={submitting}>
              登录
            </Button>
            <Button
              onClick={() => {
                resetAdminFlow();
              }}
            >
              返回
            </Button>
            <Button type="link" onClick={onGuest}>
              改选访客继续
            </Button>
          </Space>
        </Form>
      )}
    </Modal>
  );
}
