import React, { Component } from "react";
import { reduxForm, Field, propTypes, clearSubmitErrors } from "redux-form";

import { renderField, renderError} from "../../utils/renderUtils";
import { resetPassword } from "../../actions/authActions";
import { BackgroundContainer } from '../general/Atoms/BackgroundContainer/BackgroundContainer'

import { email, required } from '../../utils/formValidators'
class PasswordReset extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit, error, pristine, invalid, submitting } = this.props;

        return (
            <>
            <BackgroundContainer header="" />
            <div className="row justify-content-center">

                <form
                    className="col col-sm-4 card mt-5 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">Reset Your Password</h4>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="email" label="Please enter your email" component={renderField}
                               type="text" validate={[email, required]}
                        />
                    </fieldset>
                    <fieldset className="form-group text-center">
                        {renderError(error)}
                        <button action="submit" className="btn btn-secondary rounded-0" disabled={invalid || pristine || submitting}>Submit</button>
                    </fieldset>
                </form>
            </div>
            </>
        )
    }
}

export default reduxForm({
    form: "password_reset",
    onChange: (values, dispatch, props) => {
        if (props.error) dispatch(clearSubmitErrors('password_reset'));
    },
    onSubmit: resetPassword,
})(PasswordReset);
