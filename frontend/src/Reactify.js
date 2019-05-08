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

import DynamicRouteComp from './routingComps/DynamicRouteComp'
import StaticRouteComp from './routingComps/StaticRouteComp'
import InputForm from './routingComps/InputForm'

import ReactifyComp from './routingComps/ReactifyComp'
// import Posts from './posts/Posts';
import PostDetail from './reactify/PostDetail';
import PostCreate from './reactify/PostCreate'

import NotFound from './routingComps/NotFound'

class ReactifyDjango extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
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
            <Route exact path='/react/posts/:slug' component={PostDetail}/>
            <Route exact path='/react/posts' component={ReactifyComp} />
            
            <Route exact path='/user' render={() => (
              loggedIn === true ? (
                <Redirect to='/user/menu/'/>
              ) : (
                <StaticRouteComp />
              )
            )} />
            <Route component={NotFound} />



          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default ReactifyDjango