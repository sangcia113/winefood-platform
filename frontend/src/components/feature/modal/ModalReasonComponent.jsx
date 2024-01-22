import { SmileFilled } from '@ant-design/icons';
import { Form, Input, Modal, Space, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const { TextArea } = Input;

const ModalReasonComponent = ({ afterClose, form, loading, onCancel, onFinish, onOk, open }) => (
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
