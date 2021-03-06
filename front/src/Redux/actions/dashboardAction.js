import axios from 'axios';
import * as constants from '../constants/dashboardConstants';
const { REACT_APP_BASE_URL } = process.env;

export const getAdminDashboardData = () => async (dispatch) => {
    try {
        
        dispatch({
            type: constants.GET_ADMIN_DASHBOARD_DATA_REQUEST
        })
        let requestURL = REACT_APP_BASE_URL + 'api/Dashboard/GetAdminDashboardData/';
    
        // Request
        const { data } = await axios.get(requestURL);
     
        dispatch({
            type: constants.GET_ADMIN_DASHBOARD_DATA_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.GET_ADMIN_DASHBOARD_DATA_FAIL,
            payload: error.response?.data
        })
    }
}

export const getTrainerDashboardData = () => async (dispatch) => {
    try {
        
        dispatch({
            type: constants.GET_TRAINER_DASHBOARD_DATA_REQUEST
        })
        let requestURL = REACT_APP_BASE_URL + 'api/Dashboard/GetTrainerDashboardData/';
    
        // Request
        const { data } = await axios.get(requestURL);
     
        dispatch({
            type: constants.GET_TRAINER_DASHBOARD_DATA_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.GET_TRAINER_DASHBOARD_DATA_FAIL,
            payload: error.response?.data
        })
    }
}

export const getMemberDashboardData = () => async (dispatch) => {
    try {
        
        dispatch({
            type: constants.GET_MEMBER_DASHBOARD_DATA_REQUEST
        })
        let requestURL = REACT_APP_BASE_URL + 'api/Dashboard/GetMemberDashboardData/';
    
        // Request
        const { data } = await axios.get(requestURL);
     
        dispatch({
            type: constants.GET_MEMBER_DASHBOARD_DATA_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.GET_MEMBER_DASHBOARD_DATA_FAIL,
            payload: error.response?.data
        })
    }
}