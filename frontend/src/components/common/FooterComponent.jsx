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
                    <Text strong style={{ fontSize: 14 }}>
                        Design by ©{' '}
                    </Text>
                    <Link
                        strong
                        href="https://zalo.me/0972868740"
                        target="_blank"
                        style={{ fontSize: 14 }}
                    >
                        PHAM THANH SANG <SuitHeartFill color="red" />
                    </Link>
                </Space>
            </Col>
            <Col xs={24}>
                <Space>
                    <Text strong style={{ fontSize: 14 }}>
                        Copyright © WineFood 2023.
                    </Text>
                    <Text style={{ fontSize: 14 }}> All rights reserved. </Text>
                </Space>
            </Col>
        </Row>
    </Footer>
);

export default FooterComponent;
