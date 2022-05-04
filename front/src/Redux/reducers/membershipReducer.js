import * as constants from '../constants/membershipConstants';

export const createMembershipReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.NEW_MEMBERSHIP_REQUEST:
            return {
                ...state,
                registerloading: true
            }
        case constants.NEW_MEMBERSHIP_SUCCESS:
            return {
                ...state,
                registerloading: false,
                registereddata:action.payload,
                registersuccess: true
            }
        case constants.NEW_MEMBERSHIP_FAIL:
            return {
                ...state, registerloading: false, registererror: action.payload
            }
        case constants.NEW_MEMBERSHIP_RESET:
            return {
                ...state, registerloading: false, registersuccess: false, registererror: false
            }
        default:
            return state
    }
}

export const getMembershipListReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.MEMBERSHIP_LIST_REQUEST:
            return {
                ...state,
                getlistloading: true
            }
        case constants.MEMBERSHIP_LIST_SUCCESS:
            return {
                ...state,
                getlistloading: false,
                data: action.payload,
                getlistsuccess: true
            }
        case constants.MEMBERSHIP_LIST_FAIL:
            return {
                ...state, getlistloading: false, getlisterror: action.payload, getlistsuccess: false
            }
        case constants.MEMBERSHIP_LIST_RESET:
            return {
                ...state, getlistloading: false, getlistsuccess: false, getlisterror: false
            }
        default:
            return state
    }
}

export const updateMembershipReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.MEMBERSHIP_UPDATE_REQUEST:
            return {
                ...state,
                updateloading: true
            }
        case constants.MEMBERSHIP_UPDATE_SUCCESS:
            return {
                ...state,
                updateloading: false,
                updateddata:action.payload,
                updatesuccess: true
            }
        case constants.MEMBERSHIP_UPDATE_FAIL:
            return {
                ...state, updateloading: false, updateerror: action.payload
            }
        case constants.MEMBERSHIP_UPDATE_RESET:
            return {
                ...state, updateloading: false, updatesuccess: false, updateerror:false
            }
        default:
            return state
    }
}

export const deleteMembershipReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.MEMBERSHIP_DELETE_REQUEST:
            return {
                ...state,
                deleteloading: true
            }
        case constants.MEMBERSHIP_DELETE_SUCCESS:
            return {
                ...state,
                deleteloading: false,
                deleteddata:action.payload,
                deletesuccess: true
            }
        case constants.MEMBERSHIP_DELETE_FAIL:
            return {
                ...state, deleteloading: false, deleteerror: action.payload, deletesuccess: false
            }
        case constants.MEMBERSHIP_DELETE_RESET:
            return {
                ...state, deleteloading: false, deletesuccess: false, deleteerror:false
            }
        default:
            return state
    }
}
