import {combineReducers} from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as notifReducer } from 'redux-notifications';

import notes from "./notes";
import noteDetailReducer from "./noteDetailReducer";
import authReducer from "./authReducer";
import paymentsReducer from "./paymentsReducer";

const rootReducer = combineReducers({
    form: formReducer,
    notifs: notifReducer,
    auth: authReducer,
    notes: notes,
    detail: noteDetailReducer,
    lead: paymentsReducer,
});

export default rootReducer;


