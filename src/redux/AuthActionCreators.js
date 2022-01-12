import axios from 'axios';
import * as ActionTypes from './ActionTypes';

export const authSuccess = (token, userId) => ({
    type: ActionTypes.AUTH_SUCCESS,
    payload: {
        token: token,
        userId: userId
    }
})
export const auth = (email, password, mode) => dispatch => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    // console.log(mode);
    const API_KEY = "AIzaSyB6Suz_O0LBmx9Cbg_aX_qCMwwB5VE6IXY";

    let authUrl = null;
    if (mode === "Sign Up") {
        authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    } else {
        authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    }

    axios.post(authUrl + API_KEY, authData)
        .then(res => res.data)
        .then(data => dispatch(authSuccess(data.idToken, data.localId)))
        .catch(err => dispatch(authenticationFail(err.message)))

}
export const authenticationFail = message => ({
    type: ActionTypes.AUTH_FAILED,
    payload: message
})