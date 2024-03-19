import React from 'react';
import { Layout, Row, Col, Space, Typography } from 'antd';
import { SuitHeartFill } from 'react-bootstrap-icons';

const { Footer } = Layout;
const { Link, Text } = Typography;

const FooterComponent = () => (
    <Footer style={{ textAlign: 'center', padding: '10px 0' }}>
        <Row>
            <Col xs={24}>
                <Space>
                    <Text strong style={{ fontSize: 16 }}>
                        Design by ©{' '}
                    </Text>
                    <Link
                        strong
                        href="https://zalo.me/0972868740"
                        target="_blank"
                        style={{ fontSize: 16 }}
                    >
                        PHAM THANH SANG <SuitHeartFill color="red" />
                    </Link>
                </Space>
            </Col>
            <Col xs={24}>
                <Row>
                    <Col xs={24}>
                        <Text strong style={{ fontSize: 16 }}>
                            Copyright © WineFood 2024
                        </Text>
                    </Col>
                </Row>
                <Col xs={24}>
                    <Text style={{ fontSize: 16 }}> All rights reserved. </Text>
                </Col>
            </Col>
        </Row>
    </Footer>
);

export default FooterComponent;
