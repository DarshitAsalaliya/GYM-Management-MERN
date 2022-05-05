import axios from 'axios';
import * as constants from '../constants/supplementConstants';
const { REACT_APP_BASE_URL } = process.env;

export const createSupplement = (formData) => async (dispatch) => {
    try {

        dispatch({
            type: constants.NEW_SUPPLEMENT_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Supplement/CreateSupplement';

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        // Request
        const { data } = await axios.post(requestURL, formData, config);

        dispatch({
            type: constants.NEW_SUPPLEMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.NEW_SUPPLEMENT_FAIL,
            payload: error.response.data.error
        })
    }
}

export const getSupplementList = () => async (dispatch) => {
    try {

        dispatch({
            type: constants.SUPPLEMENT_LIST_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Supplement/GetSupplementList/';

        // Request
        const { data } = await axios.get(requestURL);

        dispatch({
            type: constants.SUPPLEMENT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response.status === 404) {
            dispatch({
                type: constants.SUPPLEMENT_LIST_SUCCESS,
                payload: []
            })
        }
        else {
            dispatch({
                type: constants.SUPPLEMENT_LIST_FAIL,
                payload: error.response.data
            })
        }
    }
}

export const updateSupplement = (id, formData) => async (dispatch) => {
    try {

        dispatch({
            type: constants.SUPPLEMENT_UPDATE_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Supplement/UpdateSupplement/' + id;

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        // Request
        const { data } = await axios.patch(requestURL, formData, config);

        dispatch({
            type: constants.SUPPLEMENT_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.SUPPLEMENT_UPDATE_FAIL,
            payload: error.response.data.error
        })
    }
}

export const deleteSupplement = (id) => async (dispatch) => {
    try {

        dispatch({
            type: constants.SUPPLEMENT_DELETE_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Supplement/DeleteSupplement/';

        // Request
        const { data } = await axios.delete(requestURL + id);

        dispatch({
            type: constants.SUPPLEMENT_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: constants.SUPPLEMENT_DELETE_FAIL,
            payload: error.message
        })
    }
}