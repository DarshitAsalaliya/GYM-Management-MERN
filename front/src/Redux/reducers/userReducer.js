import * as constants from '../constants/userConstants';

const initialState = {
    token: localStorage.getItem('token') || ''
};

export const userReducer = (state = initialState, action) => {
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
                success: action.payload
            }
        case constants.NEW_LOGIN_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}