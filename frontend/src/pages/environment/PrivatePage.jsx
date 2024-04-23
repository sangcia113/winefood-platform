import React from 'react';
import { Navigate } from 'react-router-dom';

import { Layout } from 'antd';

import { FooterComponent, EnvironmentHeaderComponent } from '../../components';

import { checkToken } from '../../utils';

import { NotAuthorizedPage } from '../';

const PrivatePage = ({ roles, children }) => {
    if (!checkToken()) return <Navigate to="/vesinh/login" />;

    const { userName, language, roleId } = checkToken();

    return roles.includes(roleId) ? (
        <Layout
            style={{
                backgroundColor: '#d7ebda',
                minHeight: '100vh',
            }}
        >
            <EnvironmentHeaderComponent language={language} name={userName} />
            {children}
            <FooterComponent />
        </Layout>
    ) : (
        <NotAuthorizedPage />
    );
};

export default PrivatePage;
