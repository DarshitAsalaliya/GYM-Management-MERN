import axios from 'axios';
import * as constants from '../constants/invoiceConstants';
const { REACT_APP_BASE_URL } = process.env;

export const createInvoice = (formData) => async (dispatch) => {
    try {

        dispatch({
            type: constants.NEW_INVOICE_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Invoice/CreateInvoice';

        // Request
        const { data } = await axios.post(requestURL, formData);

        dispatch({
            type: constants.NEW_INVOICE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.NEW_INVOICE_FAIL,
            payload: error.response.data.error
        })
    }
}

export const getInvoiceList = (memberprofileid = null) => async (dispatch) => {
    try {

        dispatch({
            type: constants.INVOICE_LIST_REQUEST
        })

        let requestURL = null;

        if (memberprofileid)
            requestURL = REACT_APP_BASE_URL + 'api/Invoice/GetInvoiceListByMember/';
        else
            requestURL = REACT_APP_BASE_URL + 'api/Invoice/GetInvoiceList/';

        // Request
        const { data } = await axios.get(requestURL);

        dispatch({
            type: constants.INVOICE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response.status === 404) {
            dispatch({
                type: constants.INVOICE_LIST_SUCCESS,
                payload: []
            })
        }
        else {
            dispatch({
                type: constants.INVOICE_LIST_FAIL,
                payload: error.response.data
            })
        }
    }
}

export const updateInvoice = (id, formData) => async (dispatch) => {
    try {

        dispatch({
            type: constants.INVOICE_UPDATE_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Invoice/UpdateInvoice/' + id;

        // Request
        const { data } = await axios.patch(requestURL, formData);

        dispatch({
            type: constants.INVOICE_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.INVOICE_UPDATE_FAIL,
            payload: error.response.data.error
        })
    }
}

export const deleteInvoice = (id) => async (dispatch) => {
    try {

        dispatch({
            type: constants.INVOICE_DELETE_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Invoice/DeleteInvoice/';

        // Request
        const { data } = await axios.delete(requestURL + id);

        dispatch({
            type: constants.INVOICE_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: constants.INVOICE_DELETE_FAIL,
            payload: error.message
        })
    }
}