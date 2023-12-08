import { ConfigProvider, Layout } from 'antd';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HeaderComponent from './components/common/HeaderComponent';
import SiderComponent from './components/common/SiderComponent';
import FooterComponent from './components/common/FooterComponent';

const App = () => {
    console.log('App run.....');

    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgLayout: '#fff',
                        controlHeight: 36,
                        fontSize: 18,
                    },
                    // components: { Layout: { bodyBg: '#f0f2f5' } },
                }}
            >
                <Layout style={{ minHeight: '100vh' }}>
                    <HeaderComponent />
                    <Layout>
                        <SiderComponent />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                        </Routes>
                    </Layout>
                    <FooterComponent />
                </Layout>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
