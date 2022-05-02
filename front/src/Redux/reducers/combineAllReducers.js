import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { registerMemberReducer, deleteMemberReducer, getMemberListReducer, updateMemberReducer } from "./memberReducer";

const reducers = combineReducers({
    user: userReducer,
    registermember: registerMemberReducer,
    getmemberlist: getMemberListReducer,
    updatemember:updateMemberReducer,
    deletemember: deleteMemberReducer
})

export default reducers;