import * as constants from '../constants/trainerConstants';

export const registerTrainerReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.NEW_TRAINER_REQUEST:
            return {
                ...state,
                registerloading: true
            }
        case constants.NEW_TRAINER_SUCCESS:
            return {
                ...state,
                registerloading: false,
                registersuccess: action.payload
            }
        case constants.NEW_TRAINER_FAIL:
            return {
                ...state, registerloading: false, registererror: action.payload
            }
        case constants.NEW_TRAINER_RESET:
            return {
                ...state, registerloading: false, registersuccess: false
            }
        default:
            return state
    }
}

export const getTrainerListReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.TRAINER_LIST_REQUEST:
            return {
                ...state,
                getlistloading: true
            }
        case constants.TRAINER_LIST_SUCCESS:
            return {
                ...state,
                getlistloading: false,
                data: action.payload,
                getlistsuccess: true
            }
        case constants.TRAINER_LIST_FAIL:
            return {
                ...state, getlistloading: false, getlisterror: action.payload, getlistsuccess: false
            }
        case constants.TRAINER_LIST_RESET:
            return {
                ...state, getlistloading: false, getlistsuccess: false
            }
        default:
            return state
    }
}

export const updateTrainerReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.TRAINER_UPDATE_REQUEST:
            return {
                ...state,
                updateloading: true
            }
        case constants.TRAINER_UPDATE_SUCCESS:
            return {
                ...state,
                updateloading: false,
                updatesuccess: action.payload
            }
        case constants.TRAINER_UPDATE_FAIL:
            return {
                ...state, updateloading: false, updateerror: action.payload
            }
        case constants.TRAINER_UPDATE_RESET:
            return {
                ...state, updateloading: false, updatesuccess: false
            }
        default:
            return state
    }
}

export const deleteTrainerReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.TRAINER_DELETE_REQUEST:
            return {
                ...state,
                deleteloading: true
            }
        case constants.TRAINER_DELETE_SUCCESS:
            return {
                ...state,
                deleteloading: false,
                deletesuccess: action.payload
            }
        case constants.TRAINER_DELETE_FAIL:
            return {
                ...state, deleteloading: false, deleteerror: action.payload, deletesuccess: false
            }
        case constants.TRAINER_DELETE_RESET:
            return {
                ...state, deleteloading: false, deletesuccess: false
            }
        default:
            return state
    }
}
