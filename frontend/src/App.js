import { ConfigProvider, Layout } from 'antd';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FooterComponent, HeaderComponent, SiderComponent } from './components/index';
import { ManagerPage, HomePage, NotExistPage, EmployeePage } from './pages/index';

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
                    },
                }}
            >
                <Layout style={{ minHeight: '100vh' }}>
                    <HeaderComponent />
                    <Layout>
                        <SiderComponent defaultSelectedKeys={'home'} />
                        <Routes>
                            <Route path="*" element={<NotExistPage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/manager" element={<ManagerPage />} />
                            <Route path="/employee" element={<EmployeePage />} />
                        </Routes>
                    </Layout>
                    <FooterComponent />
                </Layout>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
