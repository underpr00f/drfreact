import React, { Component } from 'react'
import { Link } from "react-router-dom";
import NavItem from 'reactstrap/lib/NavItem';
import { LoadObject } from '../../Organisms/LoadScreen/LoadScreen'
import { renderUser } from "../../../../utils/renderUtils";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

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
      			  	{user ? renderUser(user) : <LoadObject objectclass="loaduser"/>}
    			</Link>
    		</NavItem>
        )    
  }
}

export const HomeButton = () => (
	<Link className="btn btn-outline-info rounded-0 button-icon"
		role="button" 
		to={{
		  	pathname: `/investors`,
			state: {fromDashboard: false}
		  }}>
		  	<FontAwesomeIcon icon={faHome} color="info"/>
	</Link>
);

export const BrandButton = () => (
    <Link className="navbar-brand"
      to={{
          pathname: `/`,
          state: {fromDashboard: false}
      }}>
        Lead Platform
    </Link>

);
