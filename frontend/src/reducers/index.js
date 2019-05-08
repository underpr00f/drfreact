import {combineReducers} from "redux";
import { reducer as formReducer } from "redux-form";

import notesReducer from "./notesReducer";
import noteDetailReducer from "./noteDetailReducer";
import userDetailReducer from "./userDetailReducer";
import authReducer from "./authReducer";
import paymentsReducer from "./paymentsReducer";
// import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    notes: notesReducer,
    detail: noteDetailReducer,
    lead: paymentsReducer,
    userdetail: userDetailReducer,
    // routing: routerReducer
});

export default rootReducer;


