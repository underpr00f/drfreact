import {combineReducers} from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as notifications } from 'react-notification-system-redux';

import notesReducer from "./notesReducer";
import noteDetailReducer from "./noteDetailReducer";
import authReducer from "./authReducer";
import paymentsReducer from "./paymentsReducer";
// import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    form: formReducer,
    notifications,
    auth: authReducer,
    notes: notesReducer,
    detail: noteDetailReducer,
    lead: paymentsReducer,
    // routing: routerReducer
});

export default rootReducer;


