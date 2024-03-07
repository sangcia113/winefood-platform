import React from 'react';

import { Flex, Modal, Space, Typography } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';

const { Text } = Typography;

const ModalConfirmComponent = ({ onCancel, onOk, open, message }) => (
    <Modal
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
                <QuestionCircleFilled style={{ color: '#1677ff', fontSize: 60 }} />
                <Text strong style={{ fontSize: 32 }}>
                    VUI LÒNG XÁC NHẬN
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

export default ModalConfirmComponent;
