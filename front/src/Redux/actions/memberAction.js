import axios from 'axios';
import * as constants from '../constants/memberConstants';
const { REACT_APP_BASE_URL } = process.env;

export const registerMember = (formData) => async (dispatch) => {
    try {
        
        dispatch({
            type: constants.NEW_MEMBER_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Member/Registration';

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        // Request
        const { data } = await axios.post(requestURL, formData, config);

        dispatch({
            type: constants.NEW_MEMBER_SUCCESS,
            payload: true
        })

    } catch (error) {
        dispatch({
            type: constants.NEW_MEMBER_FAIL,
            payload: error.response.data.error
        })
    }
}

export const getMemberList = (formData) => async (dispatch) => {
    try {
        
        dispatch({
            type: constants.NEW_MEMBER_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Member/Registration';

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        // Request
        const { data } = await axios.post(requestURL, formData, config);

        dispatch({
            type: constants.NEW_MEMBER_SUCCESS,
            payload: true
        })

    } catch (error) {
        dispatch({
            type: constants.NEW_MEMBER_FAIL,
            payload: error.response.data.error
        })
    }
}