import * as constants from '../constants/memberConstants';

export const memberReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.NEW_MEMBER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case constants.NEW_MEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case constants.NEW_MEMBER_FAIL:
            return {
                ...state, loading: false, error: action.payload
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
                ...state, getlistloading: false, getlisterror: action.payload, getlistsuccess:false
            }
        case constants.MEMBER_LIST_RESET:
            return {
                ...state, getlistloading: false, getlistsuccess: false
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
                loading: false,
                deletesuccess: action.payload
            }
        case constants.MEMBER_DELETE_FAIL:
            return {
                ...state, loading: false, deleteerror: action.payload, deletesuccess: false
            }
        case constants.MEMBER_DELETE_RESET:
            return {
                ...state, loading: false, deletesuccess: false
            }
        default:
            return state
    }
}
