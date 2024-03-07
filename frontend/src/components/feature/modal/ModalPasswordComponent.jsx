import React from 'react';

import { Form, Input, Modal, Space, Typography } from 'antd';
import { SafetyCertificateFilled } from '@ant-design/icons';

const { Text } = Typography;
const { Password } = Input;

const ModalPasswordComponent = ({ afterClose, onCancel, onOk, open, form, onFinish }) => (
    <Modal
        afterClose={afterClose}
        cancelButtonProps={{ style: { borderRadius: 20 } }}
        cancelText="Hủy Bỏ"
        centered
        closeIcon={false}
        okButtonProps={{ style: { borderRadius: 20 } }}
        okText="Đồng Ý"
        onCancel={onCancel}
        onOk={onOk}
        open={open}
        title={
            <Space direction="vertical" size="large">
                <SafetyCertificateFilled style={{ color: '#1677ff', fontSize: 60 }} />
                <Text strong style={{ fontSize: 32 }}>
                    VUI LÒNG NHẬP MẬT KHẨU
                </Text>
            </Space>
        }
        width={480}
        styles={{
            header: { paddingBottom: 20, textAlign: 'center' },
            footer: { paddingTop: 20, textAlign: 'center' },
        }}
    >
        <Form form={form} onFinish={onFinish}>
            <Form.Item
                name={'password'}
                rules={[{ message: 'Bạn chưa nhập mật khẩu', required: true }]}
            >
                <Password placeholder="Vui lòng nhập mật khẩu" visibilityToggle />
            </Form.Item>
        </Form>
    </Modal>
);

export default ModalPasswordComponent;
