import React, { Component } from 'react'
import { Link } from "react-router-dom";
import NavItem from 'reactstrap/lib/NavItem';
import { LoadUser } from '../../Organisms/LoadScreen/LoadScreen'
import { renderUser } from "../../../../utils/renderUtils";

export class NavigationLink extends Component {

  render() {
  	const { urltext, customclass } = this.props;
  	const url = urltext.toLowerCase()
    return (               
    		<NavItem key={`/${url}`}>
    			<Link className={`nav-link ${customclass}`} 
    			  to={{
			    	  pathname: `/${url}`,
      				  state: {fromDashboard: false}
      			  }}>
      			  	{ urltext }
    			</Link>
    		</NavItem>
        )    
  }
}

export class NavigationUserLink extends Component {

  render() {
  	const { urltext, customclass, user } = this.props;
  	const url = urltext.toLowerCase()

    return (               
    		<NavItem key={`/${url}`}>
    			<Link className={`nav-link ${customclass}`} 
    			  to={{
			    	  pathname: `/${url}`,
      				  state: {fromDashboard: false}
      			  }}>
      			  	{user ? renderUser(user) : <LoadUser />}
    			</Link>
    		</NavItem>
        )    
  }
}
