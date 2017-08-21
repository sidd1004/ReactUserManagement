import axios from 'axios';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    FETCH_MESSAGE
} from './types';

const ROOT_URL = "http://localhost:3090";

export function signinUser(values, callback) {

    return function (dispatch) {
        const { email, password } = values;
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                callback();
            })
            .catch(response => {
                dispatch(authError(response.data.error));
            })
    }
}
//combine with above function

export function signupUser(values, callback) {
    const { email, password } = values;
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                callback();
            })
            .catch(() => {
                dispatch(authError('Bad Login Info'));
            })
    }
}
export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signOutUser() {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER }
}

export function fetchMessage() {
    return function (dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            })
    }
}