import React, {Component} from "react";
// import { Notifs } from 'redux-notifications';
// <Notifs />

import Header from "./Header";
import MainContent from "./MainContent";

export default class App extends Component {

    render() {
        return (
            <div>                
                <Header />
                <div className="container">
                	<MainContent />
                </div>
            </div>
        );
    }
}