import { useNavigate } from 'react-router-dom';

import { NotAuthorizedPage } from './';

import { checkToken } from '../utils';

const PrivatePage = ({ roles, children }) => {
    console.log('Run PrivatePage...');

    const navigate = useNavigate();

    const decodedToken = checkToken();

    if (!decodedToken) return navigate('/login');

    const roleId = decodedToken?.roleId;

    return roles.includes(roleId) ? children : <NotAuthorizedPage />;
};

export default PrivatePage;
