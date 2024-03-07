import { jwtDecode } from 'jwt-decode';

const checkToken = () => {
    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    if (!accessToken) return null;

    try {
        return jwtDecode(accessToken);
    } catch (error) {
        return null;
    }
};

export default checkToken;
