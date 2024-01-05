import React from 'react';

import { Card, Layout } from 'antd';

const { Content } = Layout;

const ContentComponent = ({ children }) => (
    <Content
        style={{
            padding: 4,
            backgroundImage: `url(${require('../../assets/images/bg24.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        <Card
            bordered={false}
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(4px)',
            }}
        >
            {children}
        </Card>
    </Content>
);

export default ContentComponent;
