import React from 'react';

import { Alert, Modal, Space, Typography } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

const { Link, Text } = Typography;

const renderMessage = error => {
    const errorCode = error?.response?.data?.error || undefined;

    if (errorCode) {
        switch (errorCode) {
            case -230:
                return (
                    <Text>
                        Gửi thông báo qua Zalo <b>thất bại</b>!
                        <br />
                        Do người dùng đã không <b>tương tác</b>
                        <br />
                        với <b>Wine Food</b> trong vòng 7 ngày!
                        <br />
                        Tuy nhiên
                        <br />
                        Dữ liệu <b>đã được ghi vào hệ thống.</b>
                        <br />
                        Bạn có thể yên tâm!
                    </Text>
                );
            case -1050:
                return (
                    <Text>
                        Đơn xin nghỉ phép của bạn đã
                        <br />
                        <b>tồn tại trong hệ thống!</b>
                        <br />
                        Vui lòng liên hệ với <b>cấp trên</b> để được
                        <br />
                        phê duyệt!
                    </Text>
                );
            case -1080:
                return (
                    <Text>
                        Tài khoản không tồn tại trong hệ thống!
                        <br />
                        Vui lòng liên hệ{' '}
                        <Link href="https://zalo.me/0972868740" target="_blank">
                            Mr.Sang
                        </Link>{' '}
                        để được hỗ trợ!
                    </Text>
                );
            case -1081:
                return (
                    <Text>
                        Sai mật khẩu
                        <br />
                        Vui lòng liên hệ{' '}
                        <Link href="https://zalo.me/0972868740" target="_blank">
                            Mr.Sang
                        </Link>{' '}
                        để được hỗ trợ!
                    </Text>
                );
            default:
                return (
                    <Text>
                        Mã lỗi: {errorCode}
                        <br />
                        Vui lòng liên hệ{' '}
                        <Link href="https://zalo.me/0972868740" target="_blank">
                            Mr.Sang
                        </Link>{' '}
                        để được hỗ trợ!
                    </Text>
                );
        }
    } else {
        return (
            <Text>
                Mã lỗi: Không xác định
                <br />
                Vui lòng liên hệ{' '}
                <Link href="https://zalo.me/0972868740" target="_blank">
                    Mr.Sang
                </Link>{' '}
                để được hỗ trợ!
            </Text>
        );
    }
};

const ModalErrorComponent = ({ onOk, open, error }) => {
    return (
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
            <Alert message={renderMessage(error)} type="error" style={{ textAlign: 'center' }} />
        </Modal>
    );
};

export default ModalErrorComponent;
