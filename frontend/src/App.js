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
                        path="/"
                        element={
                            <PrivatePage
                                element={
                                    <Layout style={{ minHeight: '100vh' }}>
                                        <HeaderComponent />
                                        <HomePage />
                                        <FooterComponent />
                                    </Layout>
                                }
                                roles={[1, 2, 3, 4, 5]}
                            />
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <PrivatePage
                                element={
                                    <Layout style={{ minHeight: '100vh' }}>
                                        <HeaderComponent />
                                        <HistoryPage />
                                        <FooterComponent />
                                    </Layout>
                                }
                                roles={[1, 2, 3, 4, 5]}
                            />
                        }
                    />
                    <Route
                        path="/leader"
                        element={
                            <PrivatePage
                                element={
                                    <Layout style={{ minHeight: '100vh' }}>
                                        <HeaderComponent />
                                        <LeaderPage />
                                        <FooterComponent />
                                    </Layout>
                                }
                                roles={[1, 2, 3, 4]}
                            />
                        }
                    />
                    <Route
                        path="/manager"
                        element={
                            <PrivatePage
                                element={
                                    <Layout style={{ minHeight: '100vh' }}>
                                        <HeaderComponent />
                                        <ManagerPage />
                                        <FooterComponent />
                                    </Layout>
                                }
                                roles={[1, 2, 3]}
                            />
                        }
                    />
                    <Route
                        path="/user"
                        element={
                            <PrivatePage
                                element={
                                    <Layout style={{ minHeight: '100vh' }}>
                                        <HeaderComponent />
                                        <UserPage />
                                        <FooterComponent />
                                    </Layout>
                                }
                                roles={[1, 2, 3]}
                            />
                        }
                    />
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
