import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

import { NotAuthorizedPage } from './';

const PrivatePage = ({ roles, children }) => {
    console.log('Run PrivatePage...');

    const navigate = useNavigate();

    useEffect(() => {
        const decodeToken = () => {
            const accessToken =
                localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

            if (!accessToken) return navigate('/login');

            try {
                const decodedToken = jwtDecode(accessToken);

                const roleId = decodedToken?.roleId;

                return roles.includes(roleId) ? children : <NotAuthorizedPage />;
            } catch (error) {
                console.log(error);

                return navigate('/login');
            }
        };

        decodeToken();
    });
};

export default PrivatePage;
