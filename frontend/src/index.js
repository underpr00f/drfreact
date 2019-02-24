import "bootstrap/dist/css/bootstrap.css";
import 'redux-notifications/lib/styles.css';
import "./styles/style.scss"
import React from "react";
import ReactDOM from "react-dom";
// import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom'
import store from "./store";
// import history from "./utils/historyUtils";
import { authLogin } from "./actions/authActions";
import App from "./components/App";
import registerServiceWorker from './registerServiceWorker';

// import { syncHistoryWithStore } from 'react-router-redux'


// const browserhistory = syncHistoryWithStore(history, store)

registerServiceWorker();

const token = localStorage.getItem("token");

if (token) {
    store.dispatch(authLogin(token));
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById("root"));
