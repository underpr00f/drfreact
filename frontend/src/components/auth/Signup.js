import React, { Component } from "react";
// import PropTypes from "prop-types";
import { reduxForm, Field, propTypes, clearSubmitErrors } from "redux-form";
import { required } from "redux-form-validators"
import { renderField, renderError } from "../../utils/renderUtils";
import { signupUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { Button, } from 'reactstrap';

class Signup extends Component {

    static propTypes = {
        ...propTypes
    };


    render() {
        const { handleSubmit, error, pristine, submitting } = this.props;

        return (
            <div className="row justify-content-center">
                <form
                    className="col col-sm-4 card mt-5 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">Sign Up</h4>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="email" label="Email" component={renderField}
                               type="text"/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="username" label="Username" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="password1" label="Password" component={renderField}
                               type="password" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="password2" label="Confirm Password" component={renderField}
                               type="password" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    { renderError(error) }

                    <fieldset className="form-group">
                        <div className="form-button">
                            <Link role="button" to="/login" className="btn btn-outline-info rounded-0 form-button__part">Login</Link>
                            <Button action="submit" color="info" className="rounded-0 form-button__part" disabled={pristine || submitting}>Sign Up</Button>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

// Sync field level validation for password match
const validateForm = values => {
    const errors = {};
    const { email, username, password1, password2 } = values;

    if (!username) {
        errors.username = 'This field is required.'
    } else if (username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }
    if (!email) {
        errors.email = 'This field is required.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email address'
    }
    
    if (password1 !== password2) {
        errors.password2 = "Password does not match."
    }
    return errors;
};

export default reduxForm({
    form: "signup",
    validate: validateForm,
    onChange: (values, dispatch, props) => {
        if (props.error) dispatch(clearSubmitErrors('signup'));
    },
    onSubmit: signupUser
})(Signup);
