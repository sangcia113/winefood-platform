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
                                <Outlet />
                                <FooterComponent />
                            </Layout>
                        }
                    >
                        <Route
                            path="/"
                            element={
                                <PrivatePage roles={[1, 2, 3, 4, 5]}>
                                    <HomePage />
                                </PrivatePage>
                            }
                        />
                        <Route
                            path="/history"
                            element={
                                <PrivatePage roles={[1, 2, 3, 4, 5]}>
                                    <HistoryPage />
                                </PrivatePage>
                            }
                        />
                        <Route
                            path="/leader"
                            element={
                                <PrivatePage roles={[1, 2, 3, 4]}>
                                    <LeaderPage />
                                </PrivatePage>
                            }
                        />
                        <Route
                            path="/manager"
                            element={
                                <PrivatePage roles={[1, 2, 3]}>
                                    <ManagerPage />
                                </PrivatePage>
                            }
                        />
                        <Route
                            path="/user"
                            element={
                                <PrivatePage roles={[1, 2, 3]}>
                                    <UserPage />
                                </PrivatePage>
                            }
                        />
                    </Route>
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
