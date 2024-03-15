import axios from 'axios';

const createConnection = accessToken =>
    axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}`,
        timeout: 5000,
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });

export default createConnection;
