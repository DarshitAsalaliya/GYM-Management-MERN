import { combineReducers } from "redux";
import { userAuthReducer } from "./userReducer";
import { registerMemberReducer, deleteMemberReducer, getMemberListReducer, updateMemberReducer } from "./memberReducer";
import { registerTrainerReducer, deleteTrainerReducer, getTrainerListReducer, updateTrainerReducer } from "./trainerReducer";

const reducers = combineReducers({
    userlogin: userAuthReducer,
    registermember: registerMemberReducer,
    getmemberlist: getMemberListReducer,
    updatemember: updateMemberReducer,
    deletemember: deleteMemberReducer,
    registertrainer: registerTrainerReducer,
    gettrainerlist: getTrainerListReducer,
    updatetrainer: updateTrainerReducer,
    deletetrainer: deleteTrainerReducer
})

export default reducers;