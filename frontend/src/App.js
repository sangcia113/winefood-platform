import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
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
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        element={
                            <Layout style={{ minHeight: '100vh' }}>
                                <HeaderComponent />
                                {/* <Layout> */}
                                {/* <SiderComponent defaultSelectedKeys={''} /> */}
                                <Outlet />
                                {/* </Layout> */}
                                <FooterComponent />
                            </Layout>
                        }
                    >
                        <Route path="/" element={<HomePage />} />
                        <Route path="/manager" element={<ManagerPage />} />
                        <Route path="/user" element={<UserPage />} />
                    </Route>
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
