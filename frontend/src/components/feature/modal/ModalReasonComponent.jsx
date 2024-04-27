import React from 'react';

import { Form, Input, Modal, Space, Typography } from 'antd';
import { SmileFilled } from '@ant-design/icons';

const { Text } = Typography;
const { TextArea } = Input;

const ModalReasonComponent = ({ form, loading, onCancel, onFinish, open }) => (
    <Modal
        afterClose={() => form.resetFields()}
        cancelButtonProps={{ style: { borderRadius: 20 } }}
        cancelText="Hủy Bỏ"
        centered
        okButtonProps={{ loading, style: { borderRadius: 20 } }}
        okText="Đồng Ý"
        onCancel={onCancel}
        onOk={() => form.submit()}
        open={open}
        title={
            <Space direction="vertical" size="large">
                <SmileFilled style={{ color: '#1677ff', fontSize: 60 }} />
                <Text strong style={{ fontSize: 32 }}>
                    VUI LÒNG NHẬP LÝ DO
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
            <Form.Item name="reason" rules={[{ message: 'Bạn chưa nhập lý do', required: true }]}>
                <TextArea rows={3} placeholder="Vui lòng nhập lý do" />
            </Form.Item>
        </Form>
    </Modal>
);

export default ModalReasonComponent;
