import * as actions from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

export const authSucess = (token, userId) => {
    return {
        type: actions.AUTH_SUCCESS,
        userId: userId,
        tokenId: token
    }
}

export const authFailed = (error) => {
  return {
      type: actions.AUTH_FAILED,
      error: error
  }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actions.AUTH_LOGOUT
    }
}

const authHandler = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
               dispatch(authLogout());
        }, expirationTime * 1000)
    }
} 

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNv4-XkMF4-i15L4Qv4cVOzURXj0SgT9Q';
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNv4-XkMF4-i15L4Qv4cVOzURXj0SgT9Q';
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response)
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSucess(response.data.idToken, response.data.localId));
            dispatch(authHandler(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFailed(err.response.data.error));
        })
    }
}

export const setRedirect = (path) => {
    return {
        type: actions.SET_REDIRECT,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSucess(token, userId));
                dispatch(authHandler((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};