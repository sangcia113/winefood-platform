import React from 'react';
import { Flex, Layout, Space, Typography } from 'antd';
import { SuitHeartFill } from 'react-bootstrap-icons';

const { Footer } = Layout;
const { Link, Text } = Typography;

const FooterComponent = () => (
    <Footer style={{ backgroundColor: '#d7ebda', textAlign: 'center' }}>
        <Flex align="center" justify="center" vertical>
            <Space>
                <Text strong style={{ fontSize: 18 }}>
                    Design by ©{' '}
                </Text>
                <Link
                    strong
                    href="https://zalo.me/0972868740"
                    target="_blank"
                    style={{ fontSize: 18 }}
                >
                    PHAM THANH SANG <SuitHeartFill color="red" />
                </Link>
            </Space>
            <Text strong style={{ fontSize: 18 }}>
                Copyright © WineFood 2024
            </Text>
            <Text style={{ fontSize: 18 }}> All rights reserved. </Text>
        </Flex>
    </Footer>
);

export default FooterComponent;
