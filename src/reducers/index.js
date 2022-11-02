import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    productsReducer: productsReducer
});

export default rootReducer;