import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space, Spin, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { ModalConfirmComponent, ModalErrorComponent } from '../../components';

import { checkToken, createConnection } from '../../utils';

const videoSource = require(`../../assets/videos/dna.mp4`);

const { Item } = Form;
const { Password } = Input;
const { Link, Text } = Typography;

const LoginPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [modalConfirm, setModalConfirm] = useState({
        open: false,
    });

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const [form] = Form.useForm();

    useEffect(() => {
        if (checkToken()) return navigate('/vesinh');
    }, []);

    const onFinish = async values => {
        try {
            setLoading(true);

            const response = await createConnection().post(`/environment/login`, values);

            if (values.remember) {
                localStorage.setItem('accessToken', response.data.accessToken);
            } else {
                sessionStorage.setItem('accessToken', response.data.accessToken);
            }

            navigate('/vesinh');
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
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
                    backdropFilter: 'blur(4px)',
                    minWidth: 360,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Spin spinning={loading} tip="Vui lòng đợi...">
                    <Flex justify="center">
                        <Text strong style={{ fontSize: 48, padding: '16px 0 32px 0' }}>
                            ĐĂNG NHẬP
                        </Text>
                    </Flex>

                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Item
                            label="Tài khoản"
                            name="username"
                            rules={[{ required: true, message: 'Bạn chưa nhập tài khoản!' }]}
                        >
                            <Input
                                allowClear
                                prefix={<UserOutlined />}
                                placeholder="Nhập tài khoản"
                                style={{ borderRadius: 24, height: 48 }}
                            />
                        </Item>

                        <Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu!' }]}
                        >
                            <Password
                                allowClear
                                prefix={<LockOutlined />}
                                placeholder="Nhập mật khẩu"
                                style={{ borderRadius: 24, height: 48 }}
                            />
                        </Item>

                        <Item name="remember" valuePropName="checked">
                            <Checkbox style={{ fontSize: 18 }}>Nhớ mật khẩu</Checkbox>
                        </Item>

                        <Item>
                            <Button
                                htmlType="submit"
                                type="primary"
                                style={{ borderRadius: 24, height: 48, width: '100%' }}
                            >
                                Đăng Nhập
                            </Button>
                        </Item>
                    </Form>

                    <Flex justify="flex-end">
                        <Link
                            style={{ fontSize: 18 }}
                            onClick={() => setModalConfirm({ open: true })}
                        >
                            Quên mật khẩu ?
                        </Link>
                    </Flex>
                </Spin>
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
        </Layout>
    );
};

export default LoginPage;
