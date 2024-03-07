import React from 'react';

import { Flex, Modal, Space, Typography } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const { Text } = Typography;

const ModalSuccessComponent = ({ onOk, open, message }) => (
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
                <CheckCircleFilled style={{ color: '#52c41a', fontSize: 60 }} />
                <Text strong style={{ fontSize: 32 }}>
                    THÀNH CÔNG
                </Text>
            </Space>
        }
        width={480}
        styles={{
            header: { textAlign: 'center' },
            footer: { paddingTop: 20, textAlign: 'center' },
        }}
    >
        <Flex justify="center">{message}</Flex>
    </Modal>
);

export default ModalSuccessComponent;
