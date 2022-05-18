import * as constants from '../constants/userConstants';

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
                isAuthenticated: true,
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
        case constants.NEW_LOGIN_RESET:
            return { ...state, isAuthenticated: false, error: false, loading: false }
        default:
            return state
    }
}

export const getLoggedUserDataReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.LOGGED_USERDATA_REQUEST:
            return {
                ...state,
                getdataloading: true
            }
        case constants.LOGGED_USERDATA_SUCCESS:
            return {
                ...state,
                getdataloading: false,
                userdata: action.payload,
                getdatasuccess: true
            }
        case constants.LOGGED_USERDATA_FAIL:
            return {
                ...state,
                getdataloading: false,
                getdataerror: action.payload,
                getdatasuccess: false,
                userdata: { type: 'Invalid' }
            }
        case constants.LOGGED_USERDATA_RESET:
            return { ...state, getdataloading: false, getdataerror: false, getdatasuccess: false }
        default:
            return state
    }
}

export const changePasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                changepasswordloading: true
            }
        case constants.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                changepasswordloading: false,
                changepasswordsuccess: true
            }
        case constants.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                changepasswordloading: false,
                changepassworderror: action.payload,
                changepasswordsuccess: false
            }
        case constants.CHANGE_PASSWORD_RESET:
            return { ...state, changepasswordloading: false, changepassworderror: false, changepasswordsuccess: false }
        default:
            return state
    }
}

export const forgotPasswordSendOtpReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.FORGOT_PASSWORD_SEND_OTP_REQUEST:
            return {
                ...state,
                forgotpasswordloading: true
            }
        case constants.FORGOT_PASSWORD_SEND_OTP_SUCCESS:
            return {
                ...state,
                forgotpasswordloading: false,
                forgotpasswordsuccess: true
            }
        case constants.FORGOT_PASSWORD_SEND_OTP_FAIL:
            return {
                ...state,
                forgotpasswordloading: false,
                forgotpassworderror: action.payload,
                forgotpasswordsuccess: false
            }
        case constants.FORGOT_PASSWORD_SEND_OTP_RESET:
            return { ...state, forgotpasswordloading: false, forgotpassworderror: false, forgotpasswordsuccess: false }
        default:
            return state
    }
}

export const changePasswordAfterOtpReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.CHANGE_PASSWORD_AFTER_OTP_REQUEST:
            return {
                ...state,
                changepasswordafterotploading: true
            }
        case constants.CHANGE_PASSWORD_AFTER_OTP_SUCCESS:
            return {
                ...state,
                changepasswordafterotploading: false,
                changepasswordafterotpsuccess: true
            }
        case constants.CHANGE_PASSWORD_AFTER_OTP_FAIL:
            return {
                ...state,
                changepasswordafterotploading: false,
                changepasswordafterotperror: action.payload,
                changepasswordafterotpsuccess: false
            }
        case constants.CHANGE_PASSWORD_AFTER_OTP_RESET:
            return { ...state, changepasswordafterotploading: false, changepasswordafterotperror: false, changepasswordafterotpsuccess: false }
        default:
            return state
    }
}