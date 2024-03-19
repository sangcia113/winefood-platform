import axios from 'axios';

const createConnection = accessToken =>
    axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}`,
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });

export default createConnection;
