import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { memberReducer } from "./memberReducer";

const reducers = combineReducers({
    user: userReducer,
    member: memberReducer
})

export default reducers;