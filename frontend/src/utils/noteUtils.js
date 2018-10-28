import React from "react";


export const renderUser = (user) => {
  // const user = this.props.user;
  if (user) {
      return <h3>{user.username} add new note</h3>
  }
  return <h3>Login please</h3>;
};
export const renderError = (errors) => {

	if (Object.keys(errors).length) {
	  return (
	    <div>
	        <div>{ errors['text'] }</div> 
	        <div>{ errors['phone'] }</div>
	    </div>
	    );
	}
	return null;
};