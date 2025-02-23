import React from 'react';

import { Alert, Modal, Space, Typography } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

import { getErrorCode } from '../../../utils';

const { Link, Text } = Typography;

const renderMessage = error => {
    const errorCode = error?.response?.data?.error || undefined;

    if (errorCode) {
        switch (errorCode) {
            case -201:
                return (
                    <>
                        <Alert
                            message={
                                <>
                                    Gửi thông báo qua Zalo <b>thất bại</b>!
                                    <br />
                                    Do nhân viên đã không <b>cung cấp thông tin</b>
                                    <br />
                                    cho <b>Wine Food</b>!
                                </>
                            }
                            type="error"
                            style={{ textAlign: 'center' }}
                        />
                        <br />
                        <Alert
                            message={
                                <>
                                    Tuy nhiên
                                    <br />
                                    Dữ liệu <b>đã được ghi vào hệ thống.</b>
                                    <br />
                                    Bạn có thể yên tâm!
                                </>
                            }
                            type="success"
                            style={{ textAlign: 'center' }}
                        />
                    </>
                );
            case -230:
                return (
                    <>
                        <Alert
                            message={
                                <>
                                    Gửi thông báo qua Zalo <b>thất bại</b>!
                                    <br />
                                    Do nhân viên đã không <b>tương tác</b>
                                    <br />
                                    với <b>Wine Food</b> trong vòng 7 ngày!
                                </>
                            }
                            type="error"
                            style={{ textAlign: 'center' }}
                        />
                        <br />
                        <Alert
                            message={
                                <>
                                    Tuy nhiên
                                    <br />
                                    Dữ liệu <b>đã được ghi vào hệ thống.</b>
                                    <br />
                                    Bạn có thể yên tâm!
                                </>
                            }
                            type="success"
                            style={{ textAlign: 'center' }}
                        />
                    </>
                );
            case -1050:
                return (
                    <Alert
                        message={
                            <>
                                Đơn xin nghỉ phép của bạn đã
                                <br />
                                <b>tồn tại trong hệ thống!</b>
                                <br />
                                Vui lòng liên hệ với <b>cấp trên</b> để được
                                <br />
                                phê duyệt!
                            </>
                        }
                        type="error"
                        style={{ textAlign: 'center' }}
                    />
                );
            default:
                return (
                    <Alert
                        message={
                            <>
                                {getErrorCode(errorCode)}
                                <br />
                                Vui lòng liên hệ{' '}
                                <Link href="https://zalo.me/0972868740" target="_blank">
                                    Mr.Sang
                                </Link>{' '}
                                để được hỗ trợ!
                            </>
                        }
                        type="error"
                        style={{ textAlign: 'center' }}
                    />
                );
        }
    } else {
        return (
            <Alert
                message={
                    <>
                        Mã lỗi: Không xác định
                        <br />
                        Vui lòng liên hệ{' '}
                        <Link href="https://zalo.me/0972868740" target="_blank">
                            Mr.Sang
                        </Link>{' '}
                        để được hỗ trợ!
                    </>
                }
                type="error"
                style={{ textAlign: 'center' }}
            />
        );
    }
};

const ModalErrorComponent = ({ onOk, open, error }) => {
    return (
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
            {renderMessage(error)}
        </Modal>
    );
};

export default ModalErrorComponent;
