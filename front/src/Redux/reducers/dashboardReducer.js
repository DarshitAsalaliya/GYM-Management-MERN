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
