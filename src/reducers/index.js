import { combineReducers } from "redux";
import productDetailReducer from "./productDetailReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    productDetailReducer: productDetailReducer
});

export default rootReducer;