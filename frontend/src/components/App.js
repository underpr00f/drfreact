import React, {Component} from "react";
import { Notifs } from 'redux-notifications';
// import cookie from 'react-cookies'

import Header from "./Header";
import MainContent from "./MainContent";

export default class App extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 	  isLoading: false
	// 	}
	// }
	// loginCheck(){
	//   let endpoint = '/api/posts/' 
	//   // if (nextEndpoint !== undefined) {
	//   //     endpoint = nextEndpoint
	//   // }
	//   let thisComp = this
	//   let lookupOptions = {
	//       method: "GET",
	//       headers: {
	//           'Content-Type': 'application/json'
	//       }
	//   }
	//   const csrfToken = cookie.load('csrftoken')
	//   if (csrfToken !== undefined) {
	//       lookupOptions['credentials'] = 'include'
	//       lookupOptions['headers']['X-CSRFToken'] = csrfToken
	//    }

	//   fetch(endpoint, lookupOptions)
	//   .then(function(response){
	//       return response.json()
	//   }).then(function(responseData){
	//       console.log(responseData)
	//       // let currentPosts = thisComp.state.posts
	//       // let newPosts = currentPosts.concat(responseData.results)
	//       // console.log(currentPosts)
	//        thisComp.setState({
	//             loggedIn: responseData.author,

	//           })
	//   }).catch(function(error){
	//       console.log("error", error)
	//   })
	// }
    render() {
    	// const loggedIn = true
	    // const supportsHistory = 'pushState' in window.history
	    // const { isLoading } = this.state;
	    
	    // if(isLoading) { // if your component doesn't have to wait for an async action, remove this block 
	    //   return <p>Loading ...</p>;
	    // }
        return (
            <div>
                <Notifs />
                <Header />
                <div className="container">
                	<MainContent />
                </div>
            </div>
        );
    }
}