import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { memberReducer,deleteMemberReducer,getMemberListReducer } from "./memberReducer";

const reducers = combineReducers({
    user: userReducer,
    member: memberReducer,
    getmemberlist:getMemberListReducer,
    deletemember:deleteMemberReducer
})

export default reducers;