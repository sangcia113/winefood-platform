import React from 'react';

import { Alert, Modal, Space, Typography } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

const { Text } = Typography;

const ModalErrorOtherComponent = ({ onOk, open, title, message }) => (
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
        okButtonProps={{ style: { borderRadius: 20 } }}
        okText="Đồng Ý"
        okType="danger"
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
        width={480}
        styles={{
            header: { paddingBottom: 20, textAlign: 'center' },
            footer: { paddingTop: 20, textAlign: 'center' },
        }}
    >
        <Alert message={message} type="error" style={{ textAlign: 'center' }} />
    </Modal>
);

export default ModalErrorOtherComponent;
