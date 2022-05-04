import { combineReducers } from "redux";
import { userAuthReducer, getLoggedUserDataReducer } from "./userReducer";
import { registerMemberReducer, deleteMemberReducer, getMemberListReducer, updateMemberReducer } from "./memberReducer";
import { registerTrainerReducer, deleteTrainerReducer, getTrainerListReducer, updateTrainerReducer } from "./trainerReducer";
import { createMembershipReducer, deleteMembershipReducer, getMembershipListReducer, updateMembershipReducer } from "./membershipReducer";

const reducers = combineReducers({
    userauth: userAuthReducer,
    loggeduserdata: getLoggedUserDataReducer,
    registermember: registerMemberReducer,
    getmemberlist: getMemberListReducer,
    updatemember: updateMemberReducer,
    deletemember: deleteMemberReducer,
    registertrainer: registerTrainerReducer,
    gettrainerlist: getTrainerListReducer,
    updatetrainer: updateTrainerReducer,
    deletetrainer: deleteTrainerReducer,
    createmembership: createMembershipReducer,
    getmembershiplist: getMembershipListReducer,
    updatemembership: updateMembershipReducer,
    deletemembership: deleteMembershipReducer,
})

export default reducers;