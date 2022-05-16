import axios from 'axios';
import * as constants from '../constants/notificationConstants';
const { REACT_APP_BASE_URL } = process.env;

export const getNotificationList = () => async (dispatch) => {
    try {

        dispatch({
            type: constants.NOTIFICATION_LIST_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Notification/GetNotificationList/';

        // Request
        const { data } = await axios.get(requestURL);

        dispatch({
            type: constants.NOTIFICATION_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response.status === 404) {
            dispatch({
                type: constants.NOTIFICATION_LIST_SUCCESS,
                payload: []
            })
        }
        else {
            dispatch({
                type: constants.NOTIFICATION_LIST_FAIL,
                payload: error.response.data
            })
        }
    }
}
