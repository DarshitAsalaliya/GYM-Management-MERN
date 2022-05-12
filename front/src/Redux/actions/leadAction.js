import axios from 'axios';
import * as constants from '../constants/leadConstants';
const { REACT_APP_BASE_URL } = process.env;

export const createLead = (formData) => async (dispatch) => {
    try {

        dispatch({
            type: constants.NEW_LEAD_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Lead/CreateLead';

        // Request
        const { data } = await axios.post(requestURL, formData);

        dispatch({
            type: constants.NEW_LEAD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.NEW_LEAD_FAIL,
            payload: error.response.data.error
        })
    }
}

export const getLeadList = () => async (dispatch) => {
    try {

        dispatch({
            type: constants.LEAD_LIST_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Lead/GetLeadList/';

        // Request
        const { data } = await axios.get(requestURL);

        dispatch({
            type: constants.LEAD_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response.status === 404) {
            dispatch({
                type: constants.LEAD_LIST_SUCCESS,
                payload: []
            })
        }
        else {
            dispatch({
                type: constants.LEAD_LIST_FAIL,
                payload: error.response.data
            })
        }
    }
}

export const updateLead = (id, formData) => async (dispatch) => {
    try {

        dispatch({
            type: constants.LEAD_UPDATE_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Lead/UpdateLead/' + id;

        // Request
        const { data } = await axios.patch(requestURL, formData);

        dispatch({
            type: constants.LEAD_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.LEAD_UPDATE_FAIL,
            payload: error.response.data.error
        })
    }
}

export const deleteLead = (id) => async (dispatch) => {
    try {

        dispatch({
            type: constants.LEAD_DELETE_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Lead/DeleteLead/';

        // Request
        const { data } = await axios.delete(requestURL + id);

        dispatch({
            type: constants.LEAD_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: constants.LEAD_DELETE_FAIL,
            payload: error.message
        })
    }
}