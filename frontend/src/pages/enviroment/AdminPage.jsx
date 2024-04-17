import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Layout, Tabs } from 'antd';
import { ContentComponent } from '../../components';
import HeaderComponent from '../../components/common/enviroment/HeaderComponent';

const itemsBreadcrumb = [
    { title: <Link to={'/vesinh'}>Home</Link> },
    { title: <Link to={'/vesinh/admin'}>Admin</Link> },
];

const AdminPage = () => {
    const [loading, setLoading] = useState(false);

    return (
        <Layout style={{ backgroundColor: '#d7ebda', minHeight: '100vh' }}>
            <HeaderComponent />
            <ContentComponent items={itemsBreadcrumb} loading={loading}>
                <Tabs
                    items={[
                        {
                            key: 'Staff',
                            label: 'Staff',
                            children: 'Content Staff',
                        },
                        {
                            key: 'Shirozake',
                            label: 'Shirozake',
                            children: 'Content Shirozake',
                        },
                        {
                            key: 'Bottling',
                            label: 'Bottling',
                            children: 'Content Bottling',
                        },
                        {
                            key: 'Toyo',
                            label: 'Toyo',
                            children: 'Content Toyo',
                        },
                    ]}
                    style={{ backgroundColor: '#d7ebda' }}
                ></Tabs>
            </ContentComponent>
        </Layout>
    );
};

export default AdminPage;
