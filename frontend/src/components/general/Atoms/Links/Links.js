import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NavItem from 'reactstrap/lib/NavItem';

import { renderUser } from "../../../../utils/renderUtils";

export class NavigationLink extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  forceLink = (url) => {
  	// this.context.router.history.location.state = {fromDashboard: false, prevLink: window.location.pathname}
  	window.location.href = '/'+url;
  }
  render() {
  	const { urltext, customclass, user } = this.props;
  	const url = urltext.toLowerCase()
    return (               
    		<NavItem key={`/${url}`}>
    			<Link className={`nav-link ${customclass}`} 
    			  onClick={(e) => {
    			  	e.preventDefault() 
    			  	this.forceLink(url)}}
    			  to={{
			    	  pathname: `/${url}`,
      				  state: {fromDashboard: false, prevLink: window.location.pathname}
      			  }}>
      			  	{user ? renderUser(user) : urltext}
    			</Link>
    		</NavItem>
        )    
  }
}

export class NavigationUserLink extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  forceLink = (url) => {
  	window.location.href = '/'+url;
  }
  render() {
  	const { urltext, customclass, user } = this.props;
  	const url = urltext.toLowerCase()
    return (               
    		<NavItem key={`/${url}`}>
    			<Link className={`nav-link ${customclass}`} 
    			  onClick={(e) => {
    			  	e.preventDefault() 
    			  	this.forceLink(url)}}
    			  to={{
			    	  pathname: `/${url}`,
      				  state: {fromDashboard: false, prevLink: window.location.pathname}
      			  }}>
      			  	{user ? renderUser(user) : ""}
    			</Link>
    		</NavItem>
        )    
  }
}