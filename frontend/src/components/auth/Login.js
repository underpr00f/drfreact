import React, { Component } from "react";
// import T from "prop-types";

import { reduxForm, Field, clearSubmitErrors, propTypes } from "redux-form";
import { Link } from "react-router-dom";
import { required } from "redux-form-validators"

import { renderField, renderError} from "../../utils/renderUtils";
import { loginUser } from "../../actions/authActions";

import { Button, } from 'reactstrap';

class Login extends Component {
    static propTypes = {
        ...propTypes
    };
    // static propTypes = {
    //     form: T.string.isRequired,
    //     onSubmit: T.func.isRequired,
    // }

    render() {
        const { handleSubmit, error, pristine, submitting } = this.props;

        return (
            <div className="row justify-content-center">

                <form
                    className="col col-sm-4 card mt-5 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">Please Log In</h4>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="email" label="Email" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>


                    <fieldset className="form-group">
                        <Field name="password" label="Password" component={renderField}
                               type="password"  validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        { renderError(error) }
                        <div className="form-button">
                            <Link role="button" to="/signup" className="btn btn-outline-info rounded-0 form-button__part">SignUp</Link>
                            <Button action="submit" color="info" className="rounded-0 form-button__part" disabled={pristine || submitting}>Login</Button>
                        </div>
                    </fieldset>

                    <Link to="/reset_password" className="text-center info-link">forgot password?</Link>
                </form>
            </div>
        )
    }
}
// Sync field level validation for password match
const validateLoginForm = values => {
    const errors = {};
    const { email } = values;

    if (!email) {
        errors.email = 'This field is required.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email address'
    }
    
    return errors;
};
export default reduxForm({
    form: "login",
    onSubmit: loginUser,
    onChange: (values, dispatch, props) => {
        if (props.error) dispatch(clearSubmitErrors('login'));
    },
    validate: validateLoginForm
})(Login);
