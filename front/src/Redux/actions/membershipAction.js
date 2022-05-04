import axios from 'axios';
import * as constants from '../constants/membershipConstants';
const { REACT_APP_BASE_URL } = process.env;

export const createMembership = (formData) => async (dispatch) => {
    try {

        dispatch({
            type: constants.NEW_MEMBERSHIP_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Membership/CreateMembership';

        // Request
        const { data } = await axios.post(requestURL, formData);

        dispatch({
            type: constants.NEW_MEMBERSHIP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.NEW_MEMBERSHIP_FAIL,
            payload: error.response.data.error
        })
    }
}

export const getMembershipList = () => async (dispatch) => {
    try {

        dispatch({
            type: constants.MEMBERSHIP_LIST_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Membership/GetMembershipList/';

        // Request
        const { data } = await axios.get(requestURL);

        dispatch({
            type: constants.MEMBERSHIP_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response.status === 404) {
            dispatch({
                type: constants.MEMBERSHIP_LIST_SUCCESS,
                payload: []
            })
        }
        else {
            dispatch({
                type: constants.MEMBERSHIP_LIST_FAIL,
                payload: error.response.data
            })
        }
    }
}

export const updateMembership = (id, formData) => async (dispatch) => {
    try {

        dispatch({
            type: constants.MEMBERSHIP_UPDATE_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Membership/UpdateMembership/' + id;

        // Request
        const { data } = await axios.patch(requestURL, formData);

        dispatch({
            type: constants.MEMBERSHIP_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.MEMBERSHIP_UPDATE_FAIL,
            payload: error.response.data.error
        })
    }
}

export const deleteMembership = (id) => async (dispatch) => {
    try {

        dispatch({
            type: constants.MEMBERSHIP_DELETE_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Membership/DeleteMembership/';

        // Request
        const { data } = await axios.delete(requestURL + id);

        dispatch({
            type: constants.MEMBERSHIP_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: constants.MEMBERSHIP_DELETE_FAIL,
            payload: error.message
        })
    }
}