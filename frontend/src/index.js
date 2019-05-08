import "bootstrap/dist/css/bootstrap.css";

import "./styles/style.scss"
import React from "react";
import ReactDOM from "react-dom";
// import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Router } from 'react-router-dom'
import store from "./store";
import history from "./utils/historyUtils";
import { authLogin } from "./actions/authActions";
import App from "./components/App";
import registerServiceWorker from './registerServiceWorker';

registerServiceWorker();

const token = localStorage.getItem("token");

if (token) {
    store.dispatch(authLogin(token));
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
    , document.getElementById("root"));
