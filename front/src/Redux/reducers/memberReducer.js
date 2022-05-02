import * as constants from '../constants/memberConstants';

export const registerMemberReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.NEW_MEMBER_REQUEST:
            return {
                ...state,
                registerloading: true
            }
        case constants.NEW_MEMBER_SUCCESS:
            return {
                ...state,
                registerloading: false,
                registersuccess: action.payload
            }
        case constants.NEW_MEMBER_FAIL:
            return {
                ...state, registerloading: false, registererror: action.payload
            }
        case constants.NEW_MEMBER_RESET:
            return {
                ...state, registerloading: false, registersuccess: false
            }
        default:
            return state
    }
}

export const getMemberListReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.MEMBER_LIST_REQUEST:
            return {
                ...state,
                getlistloading: true
            }
        case constants.MEMBER_LIST_SUCCESS:
            return {
                ...state,
                getlistloading: false,
                data: action.payload,
                getlistsuccess: true
            }
        case constants.MEMBER_LIST_FAIL:
            return {
                ...state, getlistloading: false, getlisterror: action.payload, getlistsuccess: false
            }
        case constants.MEMBER_LIST_RESET:
            return {
                ...state, getlistloading: false, getlistsuccess: false
            }
        default:
            return state
    }
}

export const updateMemberReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.MEMBER_UPDATE_REQUEST:
            return {
                ...state,
                updateloading: true
            }
        case constants.MEMBER_UPDATE_SUCCESS:
            return {
                ...state,
                updateloading: false,
                updatesuccess: action.payload
            }
        case constants.MEMBER_UPDATE_FAIL:
            return {
                ...state, updateloading: false, updateerror: action.payload
            }
        case constants.MEMBER_UPDATE_RESET:
            return {
                ...state, updateloading: false, updatesuccess: false
            }
        default:
            return state
    }
}

export const deleteMemberReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.MEMBER_DELETE_REQUEST:
            return {
                ...state,
                deleteloading: true
            }
        case constants.MEMBER_DELETE_SUCCESS:
            return {
                ...state,
                deleteloading: false,
                deletesuccess: action.payload
            }
        case constants.MEMBER_DELETE_FAIL:
            return {
                ...state, deleteloading: false, deleteerror: action.payload, deletesuccess: false
            }
        case constants.MEMBER_DELETE_RESET:
            return {
                ...state, deleteloading: false, deletesuccess: false
            }
        default:
            return state
    }
}
