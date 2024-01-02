import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import { FooterComponent, HeaderComponent } from './components/index';
import {
    HistoryPage,
    HomePage,
    LeaderPage,
    LoginPage,
    ManagerPage,
    NotExistPage,
    PrivatePage,
    UserPage,
} from './pages/index';

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
                        <Route
                            path="/"
                            element={<PrivatePage element={<HomePage />} roles={[1, 2, 3, 4, 5]} />}
                        />
                        <Route
                            path="/history"
                            element={
                                <PrivatePage element={<HistoryPage />} roles={[1, 2, 3, 4, 5]} />
                            }
                        />
                        <Route
                            path="/leader"
                            element={<PrivatePage element={<LeaderPage />} roles={[1, 2, 3, 4]} />}
                        />
                        <Route
                            path="/manager"
                            element={<PrivatePage element={<ManagerPage />} roles={[1, 2, 3]} />}
                        />
                        <Route
                            path="/user"
                            element={<PrivatePage element={<UserPage />} roles={[1, 2, 3]} />}
                        />
                    </Route>
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
