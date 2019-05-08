import React, {Component} from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import Header from "./Header";
import MainContent from "./MainContent";

export default class App extends Component {
    render() {
        return (
            <>                
              <Header />
              <div className="container">
                  <ToastContainer 
                    hideProgressBar={true} 
                    position="bottom-right"
                    autoClose={3000}
                    removeCloseButton={true}
                  />
              </div>
              <div className="container">
                <MainContent />
              </div>              
            </>
        );
    }
}