import { jwtDecode } from 'jwt-decode';
import NotAuthorizedPage from './NotAuthorizedPage';

const PrivatePage = ({ roles, element }) => {
    console.log('Run PrivatePage...');

    const checkToken = () => {
        const accessToken =
            localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

        if (!accessToken) return <NotAuthorizedPage />;

        try {
            const decodedToken = jwtDecode(accessToken);

            const roleId = decodedToken?.roleId;

            return roles.includes(roleId) ? element : <NotAuthorizedPage />;
        } catch (error) {
            return <NotAuthorizedPage />;
        }
    };

    return checkToken();
};

export default PrivatePage;
