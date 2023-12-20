import { Form, Input, Modal, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const { TextArea } = Input;

const ModalReasonComponent = ({ afterClose, onCancel, onOk, open, form, onFinish }) => (
    <Modal
        afterClose={afterClose}
        cancelText="Hủy Bỏ"
        centered
        closeIcon={false}
        okText="Đồng Ý"
        onCancel={onCancel}
        onOk={onOk}
        open={open}
        title={
            <Text strong style={{ fontSize: 26 }}>
                VUI LÒNG NHẬP LÝ DO
            </Text>
        }
        width={440}
        styles={{
            header: { textAlign: 'center' },
            footer: { paddingTop: 20, textAlign: 'center' },
        }}
    >
        <Form form={form} onFinish={onFinish}>
            <Form.Item name={'reason'} rules={[{ message: 'Vui lòng nhập lý do', required: true }]}>
                <TextArea rows={3} placeholder="Vui lòng nhập lý do" />
            </Form.Item>
        </Form>
    </Modal>
);

export default ModalReasonComponent;
