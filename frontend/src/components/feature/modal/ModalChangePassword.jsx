import React from 'react';

import { Form, Input, Modal, Space, Typography } from 'antd';
import { LockFilled, LockOutlined } from '@ant-design/icons';

const { Password } = Input;
const { Text } = Typography;
const { Item } = Form;

const ModalChangePassword = ({ afterClose, loading, onCancel, onOk, open, form, onFinish }) => (
    <Modal
        afterClose={afterClose}
        cancelButtonProps={{ style: { borderRadius: 20 } }}
        cancelText="Hủy Bỏ"
        centered
        closeIcon={false}
        okButtonProps={{ loading, style: { borderRadius: 20 } }}
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
                md: { span: 10 },
            }}
            labelWrap
            wrapperCol={{
                xs: { span: 24 },
                md: { span: 14 },
            }}
            onFinish={onFinish}
        >
            <Item
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
                <Password allowClear prefix={<LockOutlined />} placeholder="Nhập mật khẩu cũ" />
            </Item>

            <Item
                label={
                    <Text style={{ fontSize: 18 }}>
                        <Text strong style={{ fontSize: 16 }}>
                            MẬT KHẨU MỚI
                        </Text>
                        <br />
                        <small className="text-muted">New Password</small>
                    </Text>
                }
                name="newPassword"
                rules={[
                    {
                        required: true,
                        message: 'Bạn chưa nhập mật khẩu mới!',
                    },
                ]}
            >
                <Password allowClear prefix={<LockOutlined />} placeholder="Nhập mật khẩu mới" />
            </Item>

            <Item
                label={
                    <Text style={{ fontSize: 18 }}>
                        <Text strong style={{ fontSize: 16 }}>
                            XÁC NHẬN MẬT KHẨU
                        </Text>
                        <br />
                        <small className="text-muted">Confirm Password</small>
                    </Text>
                }
                name="confirmPassword"
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
                    placeholder="Nhập lại mật khẩu mới"
                />
            </Item>
        </Form>
    </Modal>
);

export default ModalChangePassword;
