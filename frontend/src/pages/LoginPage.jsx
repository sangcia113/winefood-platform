import React from 'react';
import { Button, Card, Checkbox, Col, Form, Input, Layout, Row, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { Link, Text } = Typography;

const LoginPage = ({ onFinish }) => {
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
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card
                bordered={false}
                style={{
                    backgroundColor: '#fff',
                    width: '80vw',
                    height: '80vh', // Thêm chiều cao 50vh
                    maxWidth: 680,
                    maxHeight: 460,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    // display: 'flex',
                }}
            >
                <Row>
                    <Col
                        xs={24}
                        md={12}
                        style={{
                            backgroundImage: `url(${require('../assets/images/bg20.jpg')})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            flex: 1,
                        }}
                    />
                    <Col
                        xs={24}
                        md={12}
                        style={{
                            padding: 24,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Text
                            strong
                            style={{ fontSize: 40, marginBottom: 24, textAlign: 'center' }}
                        >
                            LOGIN
                        </Text>
                        <Form form={form} onFinish={onFinish} style={{ flex: 1 }}>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                            </Form.Item>

                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox style={{ fontSize: 18 }}>Remember me</Checkbox>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    Login
                                </Button>
                            </Form.Item>
                            <Link style={{ fontSize: 18 }}>Forgot Password</Link>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Layout>
    );
};

export default LoginPage;
