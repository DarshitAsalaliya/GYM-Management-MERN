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

        // if (usertype === 'Member')
        //     localStorage.setItem("id", 2);
        // else if (usertype === 'Trainer')
        //     localStorage.setItem("id", 1);
        // else if (usertype === 'Admin')
        //     localStorage.setItem("id", 0);

        dispatch({
            type: constants.NEW_LOGIN_SUCCESS,
            payload: usertype
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
            requestURL = REACT_APP_BASE_URL + 'api/Member/me';
        else if (usertype === 'Trainer')
            requestURL = REACT_APP_BASE_URL + 'api/Trainer/me';
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

export const changePassword = (usertype, formData) => async (dispatch) => {
    try {

        dispatch({
            type: constants.CHANGE_PASSWORD_REQUEST
        })

        let requestURL = null;

        if (usertype === 'Member')
            requestURL = REACT_APP_BASE_URL + 'api/Member/ChangePassword';
        else if (usertype === 'Trainer')
            requestURL = REACT_APP_BASE_URL + 'api/Trainer/ChangePassword';
        else if (usertype === 'Admin')
            requestURL = REACT_APP_BASE_URL + 'api/Owner/ChangePassword';

        // Request
        const { data } = await axios.post(requestURL, formData);

        dispatch({
            type: constants.CHANGE_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: constants.CHANGE_PASSWORD_FAIL,
            payload: error.response.data.error
        })
    }
}

export const forgotPasswordSendOtp = (usertype, formData) => async (dispatch) => {
    try {

        dispatch({
            type: constants.FORGOT_PASSWORD_SEND_OTP_REQUEST
        })

        let requestURL = null;

        if (usertype === 'Member')
            requestURL = REACT_APP_BASE_URL + 'api/Member/ForgotPasswordSendOtp';
        else if (usertype === 'Trainer')
            requestURL = REACT_APP_BASE_URL + 'api/Trainer/ForgotPasswordSendOtp';
        else if (usertype === 'Admin')
            requestURL = REACT_APP_BASE_URL + 'api/Owner/ForgotPasswordSendOtp';

        // Request
        const { data } = await axios.post(requestURL, formData);

        dispatch({
            type: constants.FORGOT_PASSWORD_SEND_OTP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.FORGOT_PASSWORD_SEND_OTP_FAIL,
            payload: error.response.data.error
        })
    }
}

export const changePasswordAfterOtp = (usertype, formData) => async (dispatch) => {
    try {

        dispatch({
            type: constants.CHANGE_PASSWORD_AFTER_OTP_REQUEST
        })

        let requestURL = null;

        if (usertype === 'Member')
            requestURL = REACT_APP_BASE_URL + 'api/Member/ChangePasswordAfterOtp';
        else if (usertype === 'Trainer')
            requestURL = REACT_APP_BASE_URL + 'api/Trainer/ChangePasswordAfterOtp';
        else if (usertype === 'Admin')
            requestURL = REACT_APP_BASE_URL + 'api/Owner/ChangePasswordAfterOtp';

        // Request
        const { data } = await axios.patch(requestURL, formData);

        dispatch({
            type: constants.CHANGE_PASSWORD_AFTER_OTP_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: constants.CHANGE_PASSWORD_AFTER_OTP_FAIL,
            payload: error.response.data.error
        })
    }
}