import React, { Component } from "react";
import { reduxForm, Field, propTypes, clearSubmitErrors } from "redux-form";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

import { renderField, renderTextAreaField,
    renderError} from "../../utils/renderUtils";
import { updateUserProfile } from "../../actions/authActions";
import ImageDrop from './Atoms/ImageDrop/ImageDrop'
import { maxLength15, minLength5, required, letters, isurl } from '../../utils/formValidators'

class Login extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit, error, invalid, pristine, submitting } = this.props;

        return (
            <div className="row justify-content-center">

                <form
                    className="col col-sm-4 card mt-5 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">Edit Profile</h4>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="username" label="Username" component={renderField}
                               type="text" validate={[maxLength15, minLength5, required]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="first_name" label="First Name" component={renderField}
                               type="text" validate={[maxLength15, letters]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="last_name" label="Last Name" component={renderField}
                               type="text" validate={[maxLength15, letters]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="website" label="Website" component={renderField}
                               type="text" validate={[isurl]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="about" label="About Yourself" component={renderTextAreaField}
                               type="text"
                        />
                    </fieldset>
                    <fieldset className="form-group">
                        <ImageDrop
                         name="avatar"
                         label="Avatar:"
                          classNameLabel="file-input-label"
                          className="file-input"
                          dropzone_options={{
                            multiple: false,
                            accept: 'image/*'
                          }}
                        >
                          <span>Add more</span>
                        </ImageDrop>
                    </fieldset>
                    <fieldset className="form-group">
                        {renderError(error)}
                        <div className="form-button">
                            <Link to="/profile" className="btn btn-outline-info rounded-0 form-button__part">Cancel</Link>
                            <button action="submit" className="btn btn-info rounded-0 form-button__part" disabled={invalid || pristine || submitting}>Save</button>
                        </div>
                    </fieldset>

                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        initialValues: state.auth.user
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: "update_user_profile",
    onChange: (values, dispatch, props) => {
        if (props.error) dispatch(clearSubmitErrors('update_user_profile'));
    },
    onSubmit: updateUserProfile
})(Login));