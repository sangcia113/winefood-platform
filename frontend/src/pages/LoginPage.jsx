import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ModalConfirmComponent, ModalErrorComponent } from '../components';
import { checkToken } from '../utils';

const videoSource = require(`../assets/images/video.mp4`);

const URL = process.env.REACT_APP_API_URL;

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

    const [form] = Form.useForm();

    useEffect(() => {
        const decodedToken = checkToken();

        if (decodedToken) return navigate('/');
    }, []);

    const onFinish = async values => {
        try {
            const response = await axios.post(`${URL}/api/leave/login`, values);

            const { accessToken } = response.data;

            if (values.remember) {
                localStorage.setItem('accessToken', accessToken);
            } else {
                sessionStorage.setItem('accessToken', accessToken);
            }

            navigate('/');
        } catch (error) {
            setModalError({ error, open: true });
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
                    minWidth: 300,
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
                onOk={() => setModalConfirm({ open: false })}
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
        </Layout>
    );
};

export default LoginPage;
