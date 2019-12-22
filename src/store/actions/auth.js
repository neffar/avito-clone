//import axios from 'axios';
import axios from '../../axios-instance';

import * as actionTypes from './actionTypes';
import jwtDecode from 'jwt-decode';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (token, name, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        username: name,
        userId: userId
    };
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};
export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: email,
            password: password
        };

        axios.post('/tokens', authData)
            .then(res => {
                const tokenData = jwtDecode(res.data.jwt);
                const expirationDate = new Date(new Date().getTime() + tokenData.exp * 1000);

                localStorage.setItem('token', res.data.jwt);
                localStorage.setItem('username', tokenData.username);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', tokenData.id);
                dispatch(authSuccess(res.data.jwt, tokenData.username, tokenData.id));
                //dispatch(checkAuthTimeout(expirationDate));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};
////////////////////////////////////////

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                //dispatch(checkAuthTimeout(expirationDate));
                //dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};