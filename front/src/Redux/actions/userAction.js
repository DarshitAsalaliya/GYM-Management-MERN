import axios from 'axios';
import * as constants from '../constants/userConstants';
const { REACT_APP_BASE_URL } = process.env;

export const checkLogin = (credential) => async (dispatch) => {
    try {

        dispatch({
            type: constants.NEW_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // Request
        const { data } = await axios.post(REACT_APP_BASE_URL + 'Login', credential, config);

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