import axios from 'axios';
import * as constants from '../constants/userConstants';
const { REACT_APP_BASE_URL } = process.env;

export const checkLogin = (credential, usertype) => async (dispatch) => {
    try {

        dispatch({
            type: constants.NEW_LOGIN_REQUEST
        })

        let requestURL = null;

        if (usertype === 'Member')
            requestURL = REACT_APP_BASE_URL + 'api/Member/Login';
        else if (usertype === 'Trainer')
            requestURL = REACT_APP_BASE_URL + 'api/Trainer/Login';
        else if (usertype === 'Admin')
            requestURL = REACT_APP_BASE_URL + 'api/Owner/Login';

        // Request
        const { data } = await axios.post(requestURL, credential);

        // Set Token
        localStorage.setItem("token", data.token);

        dispatch({
            type: constants.NEW_LOGIN_SUCCESS,
            payload: true
        })

    } catch (error) {
        dispatch({
            type: constants.NEW_LOGIN_FAIL,
            payload: error.response.data.error
        })
    }
}

export const userLogout = (usertype) => async (dispatch) => {
    try {

        let requestURL = null;

        if (usertype === 'Member')
            requestURL = REACT_APP_BASE_URL + 'api/Member/Logout';
        else if (usertype === 'Trainer')
            requestURL = REACT_APP_BASE_URL + 'api/Trainer/Logout';
        else if (usertype === 'Admin')
            requestURL = REACT_APP_BASE_URL + 'api/Owner/Logout';

        // Request
        const { data } = await axios.post(requestURL);

        dispatch({
            type: constants.NEW_LOGOUT_SUCCESS,
            payload: data
        })

        // Set Token
        localStorage.removeItem("token");

    } catch (error) {

        dispatch({
            type: constants.NEW_LOGOUT_FAIL,
            payload: error.response.data.error
        })
    }
}

export const getLoggedUserData = (usertype) => async (dispatch) => {
    try {

        dispatch({
            type: constants.LOGGED_USERDATA_REQUEST
        })

        let requestURL = null;

        if (usertype === 'Member')
            requestURL = REACT_APP_BASE_URL + 'api/Member/Logout';
        else if (usertype === 'Trainer')
            requestURL = REACT_APP_BASE_URL + 'api/Trainer/Logout';
        else if (usertype === 'Admin')
            requestURL = REACT_APP_BASE_URL + 'api/Owner/me';

        // Request
        const { data } = await axios.get(requestURL);

        dispatch({
            type: constants.LOGGED_USERDATA_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: constants.LOGGED_USERDATA_FAIL,
            payload: error.response.data.error
        })
    }
}