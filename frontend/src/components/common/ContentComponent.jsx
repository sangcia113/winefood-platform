import React from 'react';
import { Breadcrumb, Card, Layout, Spin } from 'antd';
const { Content } = Layout;

const ContentComponent = ({ loading, items, children }) => (
    <Spin spinning={loading} tip="Vui lòng đợi...">
        <Content
            style={{
                backgroundImage: `url(${require('../../assets/images/bg24.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 4,
            }}
        >
            <Breadcrumb items={items} style={{ margin: 22 }} />
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
