import React from 'react';

import { Navigate } from 'react-router-dom';

import { Layout } from 'antd';

import { checkToken } from '../../utils';

import { FooterComponent, HeaderEnvironmentComponent } from '../../components';

import { NotAuthorizedPage } from '../';

const PrivatePage = ({ roles, children }) => {
    if (!checkToken()) return <Navigate to="/vesinh/login" />;

    const { userName, language, roleId } = checkToken();

    return roles.includes(roleId) ? (
        <Layout style={{ minHeight: '100vh' }}>
            <HeaderEnvironmentComponent language={language} name={userName} />
            {children}
            <FooterComponent />
        </Layout>
    ) : (
        <NotAuthorizedPage />
    );
};

export default PrivatePage;
