import * as constants from '../constants/leadConstants';

export const createLeadReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.NEW_LEAD_REQUEST:
            return {
                ...state,
                registerloading: true
            }
        case constants.NEW_LEAD_SUCCESS:
            return {
                ...state,
                registerloading: false,
                registereddata:action.payload,
                registersuccess: true
            }
        case constants.NEW_LEAD_FAIL:
            return {
                ...state, registerloading: false, registererror: action.payload
            }
        case constants.NEW_LEAD_RESET:
            return {
                ...state, registerloading: false, registersuccess: false, registererror: false
            }
        default:
            return state
    }
}

export const getLeadListReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.LEAD_LIST_REQUEST:
            return {
                ...state,
                getlistloading: true
            }
        case constants.LEAD_LIST_SUCCESS:
            return {
                ...state,
                getlistloading: false,
                data: action.payload,
                getlistsuccess: true
            }
        case constants.LEAD_LIST_FAIL:
            return {
                ...state, getlistloading: false, getlisterror: action.payload, getlistsuccess: false
            }
        case constants.LEAD_LIST_RESET:
            return {
                ...state, getlistloading: false, getlistsuccess: false, getlisterror: false
            }
        default:
            return state
    }
}

export const updateLeadReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.LEAD_UPDATE_REQUEST:
            return {
                ...state,
                updateloading: true
            }
        case constants.LEAD_UPDATE_SUCCESS:
            return {
                ...state,
                updateloading: false,
                updateddata:action.payload,
                updatesuccess: true
            }
        case constants.LEAD_UPDATE_FAIL:
            return {
                ...state, updateloading: false, updateerror: action.payload
            }
        case constants.LEAD_UPDATE_RESET:
            return {
                ...state, updateloading: false, updatesuccess: false, updateerror:false
            }
        default:
            return state
    }
}

export const deleteLeadReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.LEAD_DELETE_REQUEST:
            return {
                ...state,
                deleteloading: true
            }
        case constants.LEAD_DELETE_SUCCESS:
            return {
                ...state,
                deleteloading: false,
                deleteddata:action.payload,
                deletesuccess: true
            }
        case constants.LEAD_DELETE_FAIL:
            return {
                ...state, deleteloading: false, deleteerror: action.payload, deletesuccess: false
            }
        case constants.LEAD_DELETE_RESET:
            return {
                ...state, deleteloading: false, deletesuccess: false, deleteerror:false
            }
        default:
            return state
    }
}
