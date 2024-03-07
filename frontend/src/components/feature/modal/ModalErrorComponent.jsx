import React from 'react';

import { Alert, Modal, Space, Typography } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

const { Link, Text } = Typography;

const ModalErrorComponent = ({ onOk, open, error }) => (
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
        closeIcon={false}
        okButtonProps={{ style: { borderRadius: 20 } }}
        okText="Đồng Ý"
        okType="danger"
        onOk={onOk}
        open={open}
        title={
            <Space direction="vertical" size="large">
                <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: 60 }} />
                <Text strong style={{ fontSize: 32 }}>
                    THẤT BẠI
                </Text>
            </Space>
        }
        width={480}
        styles={{
            header: { paddingBottom: 20, textAlign: 'center' },
            footer: { paddingTop: 20, textAlign: 'center' },
        }}
    >
        <Alert
            message={
                <Text>
                    Mã lỗi: {error?.response?.data?.error}
                    <br />
                    Vui lòng liên hệ{' '}
                    <Link href="https://zalo.me/0972868740" target="_blank">
                        Mr.Sang
                    </Link>{' '}
                    để được hỗ trợ!
                </Text>
            }
            type="error"
            style={{ textAlign: 'center' }}
        />
    </Modal>
);

export default ModalErrorComponent;
