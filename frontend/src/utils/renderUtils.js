import React from "react";
import { toast } from 'react-toastify';

export const renderUser = (user) => {
  if (user) {
      return (
        <div className="user">
            {user.avatar ? <img src={`${user.avatar}`} className="user-avatar" alt="Avatar" /> : ""}            
            <span className="user-username">{user.username}</span>
        </div>
      );
  }
};

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input className="form-control" {...input} type={type}/>
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);

export const renderTextAreaField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <textarea className="form-control" {...input} type={type} />
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);
export const renderImageField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input className="form-control" {...input} type={type}/>
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);
export const renderError = (errorMessages) => {
    if ( errorMessages ) {
        if (JSON.stringify(errorMessages)!=="[]") {
            toast.error(errorMessages[0][0])          
        } else {
            toast.error("Error...")
        }  
    } 
};
