import * as constants from '../constants/invoiceConstants';

export const createInvoiceReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.NEW_INVOICE_REQUEST:
            return {
                ...state,
                createinvoiceloading: true
            }
        case constants.NEW_INVOICE_SUCCESS:
            return {
                ...state,
                createinvoiceloading: false,
                createinvoicedata: action.payload,
                createinvoicesuccess: true
            }
        case constants.NEW_INVOICE_FAIL:
            return {
                ...state, createinvoiceloading: false, createinvoiceerror: action.payload
            }
        case constants.NEW_INVOICE_RESET:
            return {
                ...state, createinvoiceloading: false, createinvoicesuccess: false, createinvoiceerror: false
            }
        default:
            return state
    }
}

export const getInvoiceListReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.INVOICE_LIST_REQUEST:
            return {
                ...state,
                getlistloading: true
            }
        case constants.INVOICE_LIST_SUCCESS:
            return {
                ...state,
                getlistloading: false,
                data: action.payload,
                getlistsuccess: true
            }
        case constants.INVOICE_LIST_FAIL:
            return {
                ...state, getlistloading: false, getlisterror: action.payload, getlistsuccess: false
            }
        case constants.INVOICE_LIST_RESET:
            return {
                ...state, getlistloading: false, getlistsuccess: false, getlisterror: false
            }
        default:
            return state
    }
}

export const updateInvoiceReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.INVOICE_UPDATE_REQUEST:
            return {
                ...state,
                updateinvoiceloading: true
            }
        case constants.INVOICE_UPDATE_SUCCESS:
            return {
                ...state,
                updateinvoiceloading: false,
                updatedinvoicedata: action.payload,
                updateinvoicesuccess: true
            }
        case constants.INVOICE_UPDATE_FAIL:
            return {
                ...state, updateinvoiceloading: false, updateinvoiceerror: action.payload
            }
        case constants.INVOICE_UPDATE_RESET:
            return {
                ...state, updateinvoiceloading: false, updateinvoicesuccess: false, updateinvoiceerror: false
            }
        default:
            return state
    }
}

export const deleteInvoiceReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.INVOICE_DELETE_REQUEST:
            return {
                ...state,
                deleteinvoiceloading: true
            }
        case constants.INVOICE_DELETE_SUCCESS:
            return {
                ...state,
                deleteinvoiceloading: false,
                deletedinvoicedata: action.payload,
                deleteinvoicesuccess: true
            }
        case constants.INVOICE_DELETE_FAIL:
            return {
                ...state, deleteinvoiceloading: false, deleteinvoiceerror: action.payload, deleteinvoicesuccess: false
            }
        case constants.INVOICE_DELETE_RESET:
            return {
                ...state, deleteinvoiceloading: false, deleteinvoicesuccess: false, deleteinvoiceerror: false
            }
        default:
            return state
    }
}
