import { CloseCircleFilled } from '@ant-design/icons';
import { Alert, Modal, Space, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const ModalErrorComponent = ({ onOk, open, title, message }) => (
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
        closeIcon={false}
        okText="Đồng Ý"
        onOk={onOk}
        open={open}
        title={
            <Space direction="vertical" size="large">
                <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: 60 }} />

                <Text strong style={{ fontSize: 32 }}>
                    {title}
                </Text>
            </Space>
        }
        width={440}
        styles={{
            header: { textAlign: 'center' },
            footer: { paddingTop: 20, textAlign: 'center' },
        }}
    >
        <Alert message={message} type="error" />
    </Modal>
);

export default ModalErrorComponent;
