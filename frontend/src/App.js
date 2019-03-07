import React, {Component} from "react";
// import DataProvider from "./components/DataProvider";
// import Table from "./components/Table";

// const App = () => (
//   <DataProvider endpoint="api/item/" 
//                 render={data => <Table data={data} />} />
// );
// const wrapper = document.getElementById("root");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import cookie from 'react-cookies'

import DynamicRouteComp from './routingComps/DynamicRouteComp'
import StaticRouteComp from './routingComps/StaticRouteComp'
import InputForm from './routingComps/InputForm'

import ReactifyComp from './routingComps/ReactifyComp'
// import Posts from './posts/Posts';
import PostDetail from './reactify/PostDetail';
import PostCreate from './reactify/PostCreate'

import NotFound from './routingComps/NotFound'

class DrfReact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }
  loginCheck(){
      let endpoint = '/api/posts/' 
      // if (nextEndpoint !== undefined) {
      //     endpoint = nextEndpoint
      // }
      let thisComp = this
      let lookupOptions = {
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          }
      }
      const csrfToken = cookie.load('csrftoken')
      if (csrfToken !== undefined) {
          lookupOptions['credentials'] = 'include'
          lookupOptions['headers']['X-CSRFToken'] = csrfToken
       }

      fetch(endpoint, lookupOptions)
      .then(function(response){
          return response.json()
      }).then(function(responseData){
          // console.log(responseData)
          // let currentPosts = thisComp.state.posts
          // let newPosts = currentPosts.concat(responseData.results)
          // console.log(currentPosts)
           thisComp.setState({
                loggedIn: responseData.author,

              })
      }).catch(function(error){
          console.log("error", error)
      })
  }

  render () {
    const loggedIn = true
    const supportsHistory = 'pushState' in window.history
    const { isLoading } = this.state;
    
    if(isLoading) { // if your component doesn't have to wait for an async action, remove this block 
      return <p>Loading ...</p>;
    }

    return (
      <div className='App' >

        <BrowserRouter forceRefresh={!supportsHistory}>
          <Switch>
            <Route exact path='/' component={StaticRouteComp} />
            <Route exact path='/about' component={StaticRouteComp} />
            <Route path='/posts/:slug' component={DynamicRouteComp} />
            <Route exact path='/user/menu' component={InputForm} />
            
            <Route exact path='/react/posts/create' component={PostCreate}/>
            <Route path='/react/posts/:slug' component={PostDetail}/>
            <Route exact path='/react/posts' component={ReactifyComp} />
            
            <Route exact path='/user' render={() => (
              loggedIn === true ? (
                <Redirect to='/user/menu'/>
              ) : (
                <StaticRouteComp />
              )
            )} />
            <Route exact path='/auth' component={StaticRouteComp} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default DrfReact