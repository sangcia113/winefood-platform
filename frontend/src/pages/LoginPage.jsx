import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import {
    ModalConfirmComponent,
    ModalErrorComponent,
    ModalErrorOtherComponent,
} from '../components';

import { checkToken, createConnection } from '../utils';

const videoSource = require(`../assets/videos/dna.mp4`);

const { Item } = Form;
const { Password } = Input;
const { Link, Text } = Typography;

const LoginPage = () => {
    console.log('Run LoginPage');

    const navigate = useNavigate();

    const [modalConfirm, setModalConfirm] = useState({
        open: false,
    });

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const [modalErrorOther, setModalErrorOther] = useState({
        open: false,
        title: '',
        message: '',
    });

    const [form] = Form.useForm();

    useEffect(() => {
        if (checkToken()) return navigate('/nghiphep');
    }, []);

    const onFinish = async values => {
        try {
            const response = await createConnection().post(`/leave/login`, values);

            if (values.remember) {
                localStorage.setItem('accessToken', response.data.accessToken);
            } else {
                sessionStorage.setItem('accessToken', response.data.accessToken);
            }

            navigate('/nghiphep');
        } catch (error) {
            const errorCode = error?.response?.data?.error;

            if (errorCode === -1080) {
                setModalErrorOther({
                    message: (
                        <Text>
                            Tài khoản không tồn tại trong hệ thống!
                            <br />
                            Vui lòng liên hệ{' '}
                            <Link href="https://zalo.me/0972868740" target="_blank">
                                Mr.Sang
                            </Link>{' '}
                            để được hỗ trợ!
                        </Text>
                    ),
                    open: true,
                    title: 'THẤT BẠI',
                });
            } else if (errorCode === -1081) {
                setModalErrorOther({
                    message: (
                        <Text>
                            Sai mật khẩu
                            <br />
                            Vui lòng liên hệ{' '}
                            <Link href="https://zalo.me/0972868740" target="_blank">
                                Mr.Sang
                            </Link>{' '}
                            để được hỗ trợ!
                        </Text>
                    ),
                    open: true,
                    title: 'THẤT BẠI',
                });
            } else {
                setModalError({ error, open: true });
            }
        }
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover',
                }}
            >
                <source src={videoSource} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ phát video này!
            </video>
            <Card
                bordered={false}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(2px)',
                    minWidth: 360,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Flex justify="center">
                    <Text strong style={{ fontSize: 48, padding: '16px 0 32px 0' }}>
                        L O G I N
                    </Text>
                </Flex>

                <Form form={form} onFinish={onFinish}>
                    <Item
                        name="username"
                        rules={[{ required: true, message: 'Bạn chưa nhập tài khoản!' }]}
                    >
                        <Input
                            allowClear
                            prefix={<UserOutlined />}
                            placeholder="Username"
                            style={{ borderRadius: 24, height: 48 }}
                        />
                    </Item>

                    <Item
                        name="password"
                        rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu!' }]}
                    >
                        <Password
                            allowClear
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            style={{ borderRadius: 24, height: 48 }}
                        />
                    </Item>

                    <Item name="remember" valuePropName="checked">
                        <Checkbox style={{ fontSize: 18 }}>Nhớ mật khẩu</Checkbox>
                    </Item>

                    <Item>
                        <Flex justify="center">
                            <Button
                                htmlType="submit"
                                type="primary"
                                style={{ borderRadius: 24, height: 48, width: '100%' }}
                            >
                                Đăng Nhập
                            </Button>
                        </Flex>
                    </Item>
                </Form>

                <Flex justify="flex-end">
                    <Link style={{ fontSize: 18 }} onClick={() => setModalConfirm({ open: true })}>
                        Quên mật khẩu ?
                    </Link>
                </Flex>
            </Card>
            <ModalConfirmComponent
                onCancel={() => setModalConfirm({ open: false })}
                onOk={() => window.open('https://zalo.me/0972868740', '_blank')}
                open={modalConfirm.open}
                title="THẤT BẠI"
                message={
                    <Space align="center" direction="vertical" size="small">
                        Gửi yêu cầu cấp lại mật khẩu?
                        <>
                            Hoặc bạn có thể liên hệ
                            <Link href="https://zalo.me/0972868740" target="_blank">
                                Mr.Sang
                            </Link>
                            để được hỗ trợ!
                        </>
                    </Space>
                }
            />
            <ModalErrorComponent
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
                error={modalError.error}
            />
            <ModalErrorOtherComponent
                onOk={() => setModalErrorOther({ open: false })}
                open={modalErrorOther.open}
                title={modalErrorOther.title}
                message={modalErrorOther.message}
            />
        </Layout>
    );
};

export default LoginPage;
