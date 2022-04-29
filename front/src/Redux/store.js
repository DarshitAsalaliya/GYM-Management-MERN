import { applyMiddleware, compose } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import reducers from "./reducers/combineAllReducers";

// For Track Redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Configure Store
export const store = configureStore({
  reducer: reducers
}, {}, composeEnhancers(applyMiddleware(thunk)));