import React from "react";
// import { toast } from 'react-toastify';

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
            <input className="form-control" {...input} type={type}/>
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
    if ( errorMessages && JSON.stringify(errorMessages)!=="[]" ) {
        console.log(errorMessages)
        // toast.error(errorMessages[0][0])
        return (
            <div className="alert alert-danger">
                {errorMessages}
            </div>
        )
    } 
};
