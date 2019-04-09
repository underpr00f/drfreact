import React, { Component } from "react";
import { reduxForm, Field, propTypes, clearSubmitErrors } from "redux-form";
import { required } from "redux-form-validators"
import { confirmPasswordChange } from "../../actions/authActions";
import { renderField, renderError } from "../../utils/renderUtils";
import { BackgroundContainer } from '../general/Atoms/BackgroundContainer/BackgroundContainer';

class PasswordResetConfirm extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit, error } = this.props;

        return (
            <>
            <BackgroundContainer header="" />
            <div className="row justify-content-center">
                <form
                    className="col col-sm-4 card mt-5 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">Create New Password</h4>
                    <hr/>

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

                    <fieldset className="form-group text-center">
                        {renderError(error)}
                        <button action="submit" className="btn btn-info rounded-0">Submit</button>
                    </fieldset>
                </form>
            </div>
            </>
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
    form: "password_reset_confirm",
    onSubmit: confirmPasswordChange,
    onChange: (values, dispatch, props) => {
        if (props.error) dispatch(clearSubmitErrors('password_reset_confirm'));
    },
    validate: validateForm
})(PasswordResetConfirm);
