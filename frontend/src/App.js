import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import {
    DepartmentPage,
    HistoryPage,
    HomePage,
    LeaderPage,
    LoginPage,
    MainPage,
    ManagerPage,
    NotExistedPage,
    PrivatePage,
    TypePage,
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
                    <Route path="/" element={<MainPage />} />
                    <Route path="/nghiphep/login" element={<LoginPage />} />
                    <Route
                        path="/nghiphep"
                        element={
                            <PrivatePage roles={[1, 2, 3, 4, 5, 6]}>
                                <HomePage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/nghiphep/history"
                        element={
                            <PrivatePage roles={[1, 2, 3, 4, 5, 6]}>
                                <HistoryPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/nghiphep/leader"
                        element={
                            <PrivatePage roles={[1, 2, 3, 5]}>
                                <LeaderPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/nghiphep/manager"
                        element={
                            <PrivatePage roles={[1, 2, 3, 4]}>
                                <ManagerPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/nghiphep/user"
                        element={
                            <PrivatePage roles={[1, 2, 3, 4]}>
                                <UserPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/nghiphep/type"
                        element={
                            <PrivatePage roles={[1, 2, 3, 4]}>
                                <TypePage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/nghiphep/department"
                        element={
                            <PrivatePage roles={[1, 2, 3, 4]}>
                                <DepartmentPage />
                            </PrivatePage>
                        }
                    />
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
