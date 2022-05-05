import * as constants from '../constants/supplementConstants';

export const createSupplementReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.NEW_SUPPLEMENT_REQUEST:
            return {
                ...state,
                registerloading: true
            }
        case constants.NEW_SUPPLEMENT_SUCCESS:
            return {
                ...state,
                registerloading: false,
                registereddata:action.payload,
                registersuccess: true
            }
        case constants.NEW_SUPPLEMENT_FAIL:
            return {
                ...state, registerloading: false, registererror: action.payload
            }
        case constants.NEW_SUPPLEMENT_RESET:
            return {
                ...state, registerloading: false, registersuccess: false, registererror: false
            }
        default:
            return state
    }
}

export const getSupplementListReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.SUPPLEMENT_LIST_REQUEST:
            return {
                ...state,
                getlistloading: true
            }
        case constants.SUPPLEMENT_LIST_SUCCESS:
            return {
                ...state,
                getlistloading: false,
                data: action.payload,
                getlistsuccess: true
            }
        case constants.SUPPLEMENT_LIST_FAIL:
            return {
                ...state, getlistloading: false, getlisterror: action.payload, getlistsuccess: false
            }
        case constants.SUPPLEMENT_LIST_RESET:
            return {
                ...state, getlistloading: false, getlistsuccess: false, getlisterror: false
            }
        default:
            return state
    }
}

export const updateSupplementReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.SUPPLEMENT_UPDATE_REQUEST:
            return {
                ...state,
                updateloading: true
            }
        case constants.SUPPLEMENT_UPDATE_SUCCESS:
            return {
                ...state,
                updateloading: false,
                updateddata:action.payload,
                updatesuccess: true
            }
        case constants.SUPPLEMENT_UPDATE_FAIL:
            return {
                ...state, updateloading: false, updateerror: action.payload
            }
        case constants.SUPPLEMENT_UPDATE_RESET:
            return {
                ...state, updateloading: false, updatesuccess: false, updateerror:false
            }
        default:
            return state
    }
}

export const deleteSupplementReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.SUPPLEMENT_DELETE_REQUEST:
            return {
                ...state,
                deleteloading: true
            }
        case constants.SUPPLEMENT_DELETE_SUCCESS:
            return {
                ...state,
                deleteloading: false,
                deleteddata:action.payload,
                deletesuccess: true
            }
        case constants.SUPPLEMENT_DELETE_FAIL:
            return {
                ...state, deleteloading: false, deleteerror: action.payload, deletesuccess: false
            }
        case constants.SUPPLEMENT_DELETE_RESET:
            return {
                ...state, deleteloading: false, deletesuccess: false, deleteerror:false
            }
        default:
            return state
    }
}
