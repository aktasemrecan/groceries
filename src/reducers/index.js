import { combineReducers } from "redux";
import productDataReducer from "./productDataReducer";
import productDetailReducer from "./productDetailReducer";
import sumTotalReducer from "./sumTotalReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    productDetailReducer: productDetailReducer,
    productDataReducer: productDataReducer,
    sumTotalReducer: sumTotalReducer
});

export default rootReducer;