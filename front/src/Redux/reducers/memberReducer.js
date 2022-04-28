import * as constants from '../constants/memberConstants';

const initialState = {};

export const memberReducer = (state = initialState, action) => {
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
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}