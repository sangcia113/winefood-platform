import React from 'react';

import { DatePicker, Form, InputNumber, Modal, Select, Space, Typography } from 'antd';
import { LockFilled, LockOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import Password from 'antd/es/input/Password';

const { Text } = Typography;

const ModalEditComponent = ({
    afterClose,
    form,
    leaveType = [],
    loading,
    onCancel,
    onOk,
    open,
    onFinish,
}) => {
    return (
        <Modal
            afterClose={afterClose}
            cancelButtonProps={{ style: { borderRadius: 20 } }}
            cancelText="Hủy Bỏ"
            centered
            closeIcon={false}
            okButtonProps={{ loading: loading, style: { borderRadius: 20 } }}
            okText="Đồng Ý"
            onCancel={onCancel}
            onOk={onOk}
            open={open}
            title={
                <Space direction="vertical" size="large">
                    <LockFilled style={{ color: '#1677ff', fontSize: 60 }} />
                    <Text strong style={{ fontSize: 32 }}>
                        ĐỔI MẬT KHẨU
                    </Text>
                </Space>
            }
            width={480}
            styles={{
                header: { paddingBottom: 20, textAlign: 'center' },
                footer: { paddingTop: 20, textAlign: 'center' },
            }}
        >
            <Form
                colon={false}
                form={form}
                labelAlign={'left'}
                labelCol={{
                    xs: { span: 24 },
                    md: { span: 12 },
                }}
                labelWrap
                wrapperCol={{
                    xs: { span: 24 },
                    md: { span: 12 },
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label={
                        <Text style={{ fontSize: 18 }}>
                            <Text strong style={{ fontSize: 16 }}>
                                MẬT KHẨU CŨ
                            </Text>
                            <br />
                            <small className="text-muted">Old Password</small>
                        </Text>
                    }
                    name="oldPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập mật khẩu cũ!',
                        },
                    ]}
                >
                    <Password
                        allowClear
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        style={{ borderRadius: 24, height: 48 }}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <Text style={{ fontSize: 18 }}>
                            <Text strong style={{ fontSize: 16 }}>
                                MẬT KHẨU MỚI
                            </Text>
                            <br />
                            <small className="text-muted">New Password</small>
                        </Text>
                    }
                    name="oldPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập mật khẩu mới!',
                        },
                    ]}
                >
                    <Password
                        allowClear
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        style={{ borderRadius: 24, height: 48 }}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <Text strong style={{ fontSize: 16 }}>
                            MẬT KHẨU CŨ
                        </Text>
                    }
                    name="oldPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập lại mật khẩu mới!',
                        },
                    ]}
                >
                    <Password
                        allowClear
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        style={{ borderRadius: 24, height: 48 }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalEditComponent;
