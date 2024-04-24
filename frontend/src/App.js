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
} from './pages';
import {
    ClassifyPage,
    ContentPage,
    ContentEvaluatePage,
    EvaluateOfficePage,
    EvaluateBottlingPage,
    EvaluateShirozakePage,
    EvaluateToyoPage,
    HomePage as EnvironmentHomePage,
    LoginPage as EnvironmentLoginPage,
    PrivatePage as EnvironmentPrivatePage,
    UserPage as EnvironmentUserPage,
} from './pages/environment';

const App = () => (
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
                <Route path="/vesinh/login" element={<EnvironmentLoginPage />} />
                <Route
                    path="/vesinh"
                    element={
                        <EnvironmentPrivatePage roles={[1, 2]}>
                            <EnvironmentHomePage />
                        </EnvironmentPrivatePage>
                    }
                />
                <Route
                    path="/vesinh/evaluate-office"
                    element={
                        <EnvironmentPrivatePage roles={[1, 2, 3, 5]}>
                            <EvaluateOfficePage />
                        </EnvironmentPrivatePage>
                    }
                />
                <Route
                    path="/vesinh/evaluate-shirozake"
                    element={
                        <EnvironmentPrivatePage roles={[1, 2, 3, 5]}>
                            <EvaluateShirozakePage />
                        </EnvironmentPrivatePage>
                    }
                />
                <Route
                    path="/vesinh/evaluate-bottling"
                    element={
                        <EnvironmentPrivatePage roles={[1, 2, 3, 5]}>
                            <EvaluateBottlingPage />
                        </EnvironmentPrivatePage>
                    }
                />
                <Route
                    path="/vesinh/evaluate-toyo"
                    element={
                        <EnvironmentPrivatePage roles={[1, 2, 3, 5]}>
                            <EvaluateToyoPage />
                        </EnvironmentPrivatePage>
                    }
                />
                <Route
                    path="/vesinh/content-evaluate"
                    element={
                        <EnvironmentPrivatePage roles={[1, 2]}>
                            <ContentEvaluatePage />
                        </EnvironmentPrivatePage>
                    }
                />
                <Route
                    path="/vesinh/content"
                    element={
                        <EnvironmentPrivatePage roles={[1]}>
                            <ContentPage />
                        </EnvironmentPrivatePage>
                    }
                />
                <Route
                    path="/vesinh/classify"
                    element={
                        <EnvironmentPrivatePage roles={[1]}>
                            <ClassifyPage />
                        </EnvironmentPrivatePage>
                    }
                />
                <Route
                    path="/vesinh/user"
                    element={
                        <EnvironmentPrivatePage roles={[1]}>
                            <EnvironmentUserPage />
                        </EnvironmentPrivatePage>
                    }
                />
            </Routes>
        </ConfigProvider>
    </BrowserRouter>
);

export default App;
