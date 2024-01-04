import { Navigate } from 'react-router-dom';

import { NotAuthorizedPage } from './';

import { checkToken } from '../utils';

const PrivatePage = ({ roles, children }) => {
    console.log('Run PrivatePage...');

    const roleId = checkToken()?.roleId;

    if (!roleId) return <Navigate to="/login" />;

    return roles.includes(roleId) ? children : <NotAuthorizedPage />;
};

export default PrivatePage;
