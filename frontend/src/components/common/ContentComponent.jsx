import React from 'react';
import { Breadcrumb, Layout, Spin } from 'antd';
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
            {/* <Card
                bordered={false}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(4px)',
                }}
            > */}
            <div
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: 12,
                    padding: '24px 4px',
                }}
            >
                {children}
            </div>

            {/* </Card> */}
        </Content>
    </Spin>
);

export default ContentComponent;
