import React from "react";


export const renderUser = (user) => {
  // const user = this.props.user;
  if (user) {
      return <div>{user.username}</div>
  }

};
// export const renderError = (errors) => {

// 	if (Object.keys(errors).length) {
// 	  return (
// 	    <div>
// 	        <div>{ errors['text'] }</div> 
// 	        <div>{ errors['phone'] }</div>
// 	    </div>
// 	    );
// 	}
// 	return null;
// };