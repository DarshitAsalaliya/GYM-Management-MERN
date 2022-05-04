import axios from 'axios';
import * as constants from '../constants/trainerConstants';
const { REACT_APP_BASE_URL } = process.env;

export const registerTrainer = (formData) => async (dispatch) => {
    try {

        dispatch({
            type: constants.NEW_TRAINER_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Trainer/Registration';

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        // Request
        const { data } = await axios.post(requestURL, formData, config);

        dispatch({
            type: constants.NEW_TRAINER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.NEW_TRAINER_FAIL,
            payload: error.response.data.error
        })
    }
}

export const getTrainerList = () => async (dispatch) => {
    try {

        dispatch({
            type: constants.TRAINER_LIST_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Trainer/GetTrainerList/';

        // Request
        const { data } = await axios.get(requestURL);
       
        dispatch({
            type: constants.TRAINER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        if(error.response.status===404)
        {
            dispatch({
                type: constants.TRAINER_LIST_SUCCESS,
                payload: []
            })
        }
        else
        {
            dispatch({
                type: constants.TRAINER_LIST_FAIL,
                payload: error.response.data
            })
        }
    }
}

export const updateTrainer = (id,formData) => async (dispatch) => {
    try {

        dispatch({
            type: constants.TRAINER_UPDATE_REQUEST
        })
        
        let requestURL = REACT_APP_BASE_URL + 'api/Trainer/UpdateTrainer/'+id;

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        // Request
        const { data } = await axios.patch(requestURL, formData, config);

        dispatch({
            type: constants.TRAINER_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.TRAINER_UPDATE_FAIL,
            payload: error.response.data.error
        })
    }
}

export const deleteTrainer = (id) => async (dispatch) => {
    try {

        dispatch({
            type: constants.TRAINER_DELETE_REQUEST
        })

        let requestURL = REACT_APP_BASE_URL + 'api/Trainer/DeleteTrainer/';

        // Request
        const { data } = await axios.delete(requestURL + id);

        dispatch({
            type: constants.TRAINER_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
       
        dispatch({
            type: constants.TRAINER_DELETE_FAIL,
            payload: error.message
        })
    }
}