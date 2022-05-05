import { combineReducers } from "redux";
import { userAuthReducer, getLoggedUserDataReducer } from "./userReducer";
import { getAdminDashboardDataReducer } from "./dashboardReducer";
import { registerMemberReducer, deleteMemberReducer, getMemberListReducer, updateMemberReducer } from "./memberReducer";
import { registerTrainerReducer, deleteTrainerReducer, getTrainerListReducer, updateTrainerReducer } from "./trainerReducer";
import { createMembershipReducer, deleteMembershipReducer, getMembershipListReducer, updateMembershipReducer } from "./membershipReducer";
import { createSupplementReducer, deleteSupplementReducer, getSupplementListReducer, updateSupplementReducer } from "./supplementReducer";

const reducers = combineReducers({
    userauth: userAuthReducer,
    admindashboarddata:getAdminDashboardDataReducer,
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
    createsupplement: createSupplementReducer,
    getsupplementlist: getSupplementListReducer,
    updatesupplement: updateSupplementReducer,
    deletesupplement: deleteSupplementReducer,
})

export default reducers;