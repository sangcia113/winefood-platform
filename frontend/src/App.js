import { ConfigProvider, Layout } from 'antd';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FooterComponent, HeaderComponent, SiderComponent } from './components/index';
import { HomePage, LoginPage, ManagerPage, NotExistPage, UserPage } from './pages/index';

const App = () => {
    console.log('App run.....');

    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgLayout: '#fff',
                        controlHeight: 40,
                        fontSize: 20,
                        fontFamily: "'Roboto', sans-serif",
                    },
                }}
            >
                <Routes>
                    <Route path="*" element={<NotExistPage />} />
                    <Route
                        path="/"
                        element={
                            <Layout style={{ minHeight: '100vh' }}>
                                <HeaderComponent />
                                <Layout>
                                    <SiderComponent defaultSelectedKeys={''} />
                                    <HomePage />
                                </Layout>
                                <FooterComponent />
                            </Layout>
                        }
                    />
                    <Route
                        path="/manager"
                        element={
                            <Layout style={{ minHeight: '100vh' }}>
                                <HeaderComponent />
                                <Layout>
                                    <SiderComponent defaultSelectedKeys={''} />
                                    <Routes>
                                        <Route path="/" element={<ManagerPage />} />
                                    </Routes>
                                </Layout>
                                <FooterComponent />
                            </Layout>
                        }
                    />
                </Routes>
                {/* <Layout style={{ minHeight: '100vh' }}>
                    <HeaderComponent />
                    <Layout>
                        <SiderComponent defaultSelectedKeys={''} />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/manager" element={<ManagerPage />} />
                            <Route path="/user" element={<UserPage />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </Layout>
                    <FooterComponent />
                </Layout> */}
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
