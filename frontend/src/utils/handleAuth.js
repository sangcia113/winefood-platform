import { jwtDecode } from 'jwt-decode';

const checkToken = () => {
    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    if (!accessToken) return null;

    try {
        return jwtDecode(accessToken);
    } catch (error) {
        console.log('Không thể xác thực Token!', error);

        return null;
    }
};

export default checkToken;
