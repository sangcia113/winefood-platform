import { createConnection } from '../utils';

const getUser = () => ({ type: 'GET_USER' });

const postUser = userData => ({ type: 'POST_USER', payload: userData });

const putUser = (userId, userData) => ({ type: 'PUT_USER', payload: { userId, userData } });

const deleteUser = userId => ({ type: 'PUT_USER', payload: userId });

const fetchUser = accessToken => {
    return async dispatch => {
        try {
            const response = await createConnection(accessToken).get('/leave/user');

            dispatch({ type: 'GET_USER', payload: response.data });
        } catch (error) {
            console.log(error);
        }
    };
};

export { getUser, postUser, putUser, deleteUser, fetchUser };
