import { CloseCircleOutlined } from '@ant-design/icons';
import { Alert, Modal, Space, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const ModalErrorComponent = ({ onOk, open, title, message }) => (
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
        closeIcon={false}
        forceRender
        onOk={onOk}
        open={open}
        title={
            <Space direction={'vertical'} size={'middle'}>
                <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: 60 }} />
                <Text style={{ fontSize: 26 }}>{title}</Text>
            </Space>
        }
        styles={{
            header: { textAlign: 'center' },
            footer: { paddingTop: 20, textAlign: 'center' },
        }}
    >
        <Alert message={message} type={'error'} />
    </Modal>
);

export default ModalErrorComponent;
