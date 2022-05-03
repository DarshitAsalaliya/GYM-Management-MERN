import * as constants from '../constants/userConstants';

const initialState = {
    token: localStorage.getItem('token') || ''
};

export const userAuthReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.NEW_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case constants.NEW_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: action.payload
            }
        case constants.NEW_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false
            }
        case constants.NEW_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            }
        case constants.NEW_LOGOUT_FAIL:
            return { ...state, loading: false, error: action.payload, isAuthenticated: false }
        default:
            return state
    }
}