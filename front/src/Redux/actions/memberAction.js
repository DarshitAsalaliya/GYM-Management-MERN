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

export const getMemberList = () => async (dispatch) => {
    try {

        dispatch({
            type: constants.MEMBER_LIST_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Member/GetMemberList/';

        // Request
        const { data } = await axios.get(requestURL);

        dispatch({
            type: constants.MEMBER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        
        dispatch({
            type: constants.MEMBER_LIST_FAIL,
            payload: error.message
        })
    }
}

export const deleteMember = (id) => async (dispatch) => {
    try {

        dispatch({
            type: constants.MEMBER_DELETE_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Member/DeleteMember/';

        // Request
        const { data } = await axios.delete(requestURL + id);

        dispatch({
            type: constants.MEMBER_DELETE_SUCCESS,
            payload: true
        })

    } catch (error) {
        
        dispatch({
            type: constants.MEMBER_DELETE_FAIL,
            payload: error.message
        })
    }
}