import * as constants from '../constants/notificationConstants';

export const getNotificationListReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.NOTIFICATION_LIST_REQUEST:
            return {
                ...state,
                getlistloading: true
            }
        case constants.NOTIFICATION_LIST_SUCCESS:
            return {
                ...state,
                getlistloading: false,
                data: action.payload,
                getlistsuccess: true
            }
        case constants.NOTIFICATION_LIST_FAIL:
            return {
                ...state, getlistloading: false, getlisterror: action.payload, getlistsuccess: false
            }
        case constants.NOTIFICATION_LIST_RESET:
            return {
                ...state, getlistloading: false, getlistsuccess: false, getlisterror: false
            }
        default:
            return state
    }
}