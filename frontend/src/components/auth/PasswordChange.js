import React, { Component } from "react";
// import PropTypes from "prop-types";
import { reduxForm, Field, propTypes, clearSubmitErrors } from "redux-form";
import { required } from "redux-form-validators"
import { changePassword } from "../../actions/authActions";
import { renderField, renderError } from "../../utils/renderUtils";
import { Link } from "react-router-dom";
import { Button, } from 'reactstrap';
class PasswordChange extends Component {

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
                    <h4 className="text-md-center">Change Password</h4>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="old_password" label="Old Password" component={renderField}
                               type="password" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="new_password1" label="New Password" component={renderField}
                               type="password" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="new_password2" label="Confirm New Password" component={renderField}
                               type="password" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        {renderError(error)}
                        <div className="form-button">
                            <Button action="submit" color="info" className="rounded-0 form-button__part" disabled={pristine || submitting}>Submit</Button>
                            <Link to="/profile" className="btn btn-outline-info rounded-0 form-button__part">Cancel</Link>
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
    const { new_password1, new_password2 } = values;
    if (new_password1 !== new_password2) {
        errors.new_password2 = "Password does not match."
    }
    return errors;
};

export default reduxForm({
    form: "change_password",
    onSubmit: changePassword,
    onChange: (values, dispatch, props) => {
        if (props.error) dispatch(clearSubmitErrors('change_password'));
    },
    validate: validateForm
})(PasswordChange);
