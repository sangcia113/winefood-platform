import React from 'react';

import { Card, Layout, Spin } from 'antd';

const { Content } = Layout;

const ContentComponent = ({ loading, children }) => (
    <Spin spinning={loading} tip="Vui lòng đợi...">
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
    </Spin>
);

export default ContentComponent;
