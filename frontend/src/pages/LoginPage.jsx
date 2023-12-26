import React, { useState } from 'react';
import { Button, Checkbox, Col, Flex, Form, Input, Layout, Row, Space, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ModalConfirmComponent } from '../components';

const { Link, Text } = Typography;

const videoSource = require(`../assets/images/video.mp4`);

const LoginPage = ({ onFinish }) => {
    const [modalConfirm, setModalConfirm] = useState({
        open: false,
    });

    const [form] = Form.useForm();

    return (
        <Layout
            style={{
                backgroundImage: `url(${require('../assets/images/bg24.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Row
                style={{
                    backgroundColor: '#fff',
                    boxShadow: '10px 10px 40px rgba(0, 0, 0, 0.4)',
                    width: '80vw',
                    height: '80vh',
                    maxWidth: 700,
                    maxHeight: 460,
                }}
            >
                <Col
                    xs={24}
                    md={12}
                    style={{
                        flex: 1,
                        overflow: 'hidden', // Tránh tràn video ra ngoài
                        position: 'relative', // Để thiết lập tuyệt đối cho video
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }}
                >
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="background-video"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    >
                        <source src={videoSource} type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ phát video này!
                    </video>
                </Col>
                <Col xs={24} md={12} style={{ padding: '42px 24px' }}>
                    <Flex align="center" gap={42} vertical style={{ overflow: 'hidden' }}>
                        <Text strong style={{ fontSize: 40 }}>
                            LOGIN
                        </Text>
                        <Form form={form} onFinish={onFinish} style={{ flex: 1 }}>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Bạn chưa nhập tài khoản!' }]}
                            >
                                <Input
                                    allowClear
                                    prefix={<UserOutlined />}
                                    placeholder="U s e r n a m e"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu!' }]}
                            >
                                <Input.Password
                                    allowClear
                                    prefix={<LockOutlined />}
                                    placeholder="P a s s w o r d"
                                />
                            </Form.Item>

                            <Form.Item name="remember">
                                <Checkbox style={{ fontSize: 18 }}>Nhớ mật khẩu</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    Đăng Nhập
                                </Button>
                            </Form.Item>

                            <Flex justify="flex-end">
                                <Link
                                    style={{ fontSize: 16 }}
                                    onClick={() => setModalConfirm({ open: true })}
                                >
                                    Quên mật khẩu ?
                                </Link>
                            </Flex>
                        </Form>
                    </Flex>
                </Col>
            </Row>
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
        </Layout>
    );
};

export default LoginPage;
