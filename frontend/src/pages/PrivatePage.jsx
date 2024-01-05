import { Navigate } from 'react-router-dom';

import { Layout } from 'antd';

import { checkToken } from '../utils';

import { FooterComponent, HeaderComponent } from '../components';

import { NotAuthorizedPage } from './';

const PrivatePage = ({ roles, children }) => {
    console.log('Run PrivatePage...');

    const { name, roleId } = checkToken();

    if (!roleId) return <Navigate to="/login" />;

    return roles.includes(roleId) ? (
        <Layout style={{ minHeight: '100vh' }}>
            <HeaderComponent name={name} />
            {children}
            <FooterComponent />
        </Layout>
    ) : (
        <NotAuthorizedPage />
    );
};

export default PrivatePage;
