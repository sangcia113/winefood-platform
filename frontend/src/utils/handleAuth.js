import { jwtDecode } from 'jwt-decode';

const decodeToken = accessToken => {
    try {
        return jwtDecode(accessToken);
    } catch (error) {
        console.log('Không thể xác thực Token!', error);
    }
};

export default decodeToken;
