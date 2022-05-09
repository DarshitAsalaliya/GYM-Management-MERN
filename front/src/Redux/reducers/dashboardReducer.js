import * as constants from '../constants/dashboardConstants';

export const getAdminDashboardDataReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.GET_ADMIN_DASHBOARD_DATA_REQUEST:
            return {
                ...state,
                getadmindashboarddataloading: true
            }
        case constants.GET_ADMIN_DASHBOARD_DATA_SUCCESS:
            return {
                ...state,
                getadmindashboarddataloading: false,
                admindashboarddata: action.payload,
                getadmindashboarddatasuccess: true
            }
        case constants.GET_ADMIN_DASHBOARD_DATA_FAIL:
            return {
                ...state, getadmindashboarddataloading: false, getadmindashboarddataerror: action.payload, getadmindashboarddatasuccess: false
            }
        case constants.GET_ADMIN_DASHBOARD_DATA_RESET:
            return {
                ...state, getadmindashboarddataloading: false, getadmindashboarddatasuccess: false, getadmindashboarddataerror: false
            }
        default:
            return state
    }
}

export const getTrainerDashboardDataReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.GET_TRAINER_DASHBOARD_DATA_REQUEST:
            return {
                ...state,
                gettrainerdashboarddataloading: true
            }
        case constants.GET_TRAINER_DASHBOARD_DATA_SUCCESS:
            return {
                ...state,
                gettrainerdashboarddataloading: false,
                trainerdashboarddata: action.payload,
                gettrainerdashboarddatasuccess: true
            }
        case constants.GET_TRAINER_DASHBOARD_DATA_FAIL:
            return {
                ...state, gettrainerdashboarddataloading: false, gettrainerdashboarddataerror: action.payload, gettrainerdashboarddatasuccess: false
            }
        case constants.GET_TRAINER_DASHBOARD_DATA_RESET:
            return {
                ...state, gettrainerdashboarddataloading: false, gettrainerdashboarddatasuccess: false, gettrainerdashboarddataerror: false
            }
        default:
            return state
    }
}

export const getMemberDashboardDataReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.GET_MEMBER_DASHBOARD_DATA_REQUEST:
            return {
                ...state,
                getmemberdashboarddataloading: true
            }
        case constants.GET_MEMBER_DASHBOARD_DATA_SUCCESS:
            return {
                ...state,
                getmemberdashboarddataloading: false,
                memberdashboarddata: action.payload,
                getmemberdashboarddatasuccess: true
            }
        case constants.GET_MEMBER_DASHBOARD_DATA_FAIL:
            return {
                ...state, getmemberdashboarddataloading: false, getmemberdashboarddataerror: action.payload, getmemberdashboarddatasuccess: false
            }
        case constants.GET_MEMBER_DASHBOARD_DATA_RESET:
            return {
                ...state, getmemberdashboarddataloading: false, getmemberdashboarddatasuccess: false, getmemberdashboarddataerror: false
            }
        default:
            return state
    }
}