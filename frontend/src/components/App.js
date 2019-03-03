import React, {Component} from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import Header from "./Header";
import MainContent from "./MainContent";

export default class App extends Component {

    render() {
        return (
            <div>                
                <Header />
                <div className="container">
                    <ToastContainer 
                      hideProgressBar={true} 
                      position="bottom-center"
                      autoClose={3000}
                      removeCloseButton={true}
                    />
                	<MainContent />
                </div>
            </div>
        );
    }
}