import React from 'react';

import { Navigate } from 'react-router-dom';

import { Layout } from 'antd';

import { checkToken } from '../utils';

import { FooterComponent, HeaderComponent } from '../components';

import { NotAuthorizedPage } from './';

const PrivatePage = ({ roles, children }) => {
    if (!checkToken()) return <Navigate to="/nghiphep/login" />;

    const { userName, roleId } = checkToken();

    return roles.includes(roleId) ? (
        <Layout style={{ minHeight: '100vh' }}>
            <HeaderComponent name={userName} />
            {children}
            <FooterComponent />
        </Layout>
    ) : (
        <NotAuthorizedPage />
    );
};

export default PrivatePage;
