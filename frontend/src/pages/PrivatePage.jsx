import { jwtDecode } from 'jwt-decode';

import NotAuthorizedPage from './NotAuthorizedPage';

const PrivatePage = ({ roles, element }) => {
    console.log('Run PrivatePage...');

    const checkJwt = () => {
        const accessToken =
            localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

        if (!accessToken) return <NotAuthorizedPage />;

        try {
            const decodedToken = jwtDecode(accessToken);

            const { roleId } = decodedToken;

            if (roles.includes(roleId)) return element;

            return <NotAuthorizedPage />;
        } catch (error) {
            console.log('Không thể xác thực Token!', error);

            return <NotAuthorizedPage />;
        }
    };

    return checkJwt();
};

export default PrivatePage;
