import { combineReducers } from "redux";
import checkChangeReducer from "./checkChangeReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    checkChangeReducer: checkChangeReducer
});

export default rootReducer;