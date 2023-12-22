import { ExclamationCircleFilled } from '@ant-design/icons';
import { Flex, Modal, Space, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const ModalWarningComponent = ({ onOk, open, message }) => (
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
        closeIcon={false}
        okButtonProps={{ style: { borderRadius: 20 } }}
        okText="Đồng Ý"
        onOk={onOk}
        open={open}
        title={
            <Space direction="vertical" size="large">
                <ExclamationCircleFilled style={{ color: '#faad14', fontSize: 60 }} />
                <Text strong style={{ fontSize: 32 }}>
                    CẢNH BÁO
                </Text>
            </Space>
        }
        width={460}
        styles={{
            header: { textAlign: 'center' },
            footer: { paddingTop: 20, textAlign: 'center' },
        }}
    >
        <Flex justify="center">{message}</Flex>
    </Modal>
);

export default ModalWarningComponent;
