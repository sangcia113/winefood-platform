import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import {
    HistoryPage,
    HomePage,
    LeaderPage,
    LoginPage,
    ManagerPage,
    NotExistedPage,
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
                    <Route path="*" element={<NotExistedPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            <PrivatePage roles={[1, 2, 3, 4, 5, 6]}>
                                <HomePage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <PrivatePage roles={[1, 2, 3, 4, 5, 6]}>
                                <HistoryPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/leader"
                        element={
                            <PrivatePage roles={[1, 2, 3, 4, 5]}>
                                <LeaderPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/manager"
                        element={
                            <PrivatePage roles={[1, 2, 3, 4]}>
                                <ManagerPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/user"
                        element={
                            <PrivatePage roles={[1, 2, 3, 4]}>
                                <UserPage />
                            </PrivatePage>
                        }
                    />
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
