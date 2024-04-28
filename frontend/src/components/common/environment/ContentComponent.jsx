import React from 'react';

import { Breadcrumb, Layout, Spin } from 'antd';

const { Content } = Layout;

const ContentComponent = ({ loading, items, children }) => (
    <Spin spinning={loading} tip="Vui lòng đợi...">
        <Content
            style={{
                backgroundColor: '#d7ebda',
                padding: 4,
            }}
        >
            <Breadcrumb items={items} style={{ margin: 22 }} />
            <div
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: 12,
                    padding: 8,
                }}
            >
                {children}
            </div>
        </Content>
    </Spin>
);

export default ContentComponent;
