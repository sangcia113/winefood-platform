import { Input, Modal, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const { TextArea } = Input;

const ModalReasonComponent = ({ onCancel, onOk, open }) => (
    <Modal
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
        <TextArea rows={3} />
    </Modal>
);

export default ModalReasonComponent;
