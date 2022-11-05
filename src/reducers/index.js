import { combineReducers } from "redux";
import searchOnReducer from "./searchOnReducer";

import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    searchOn: searchOnReducer,
});

export default rootReducer;