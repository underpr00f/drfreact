import React, { Component } from "react";

import { reduxForm, Field, clearSubmitErrors, propTypes } from "redux-form";
import { Link } from "react-router-dom";
import { Button, } from 'reactstrap';

import { renderField, renderError} from "../../utils/renderUtils";
import { loginUser } from "../../actions/authActions";
import { BackgroundContainer } from '../general/Atoms/BackgroundContainer/BackgroundContainer'
import { email, required } from '../../utils/formValidators'


class Login extends Component {
    static propTypes = {
        ...propTypes
    };
    state = { type: "password"}

    showHide = (e) => {
        e.preventDefault();

        this.setState({
          type: this.state.type === 'password' ? 'input' : 'password'
        })  
    }
    render() {
        const { handleSubmit, error, invalid, pristine, submitting } = this.props;
        const { type } = this.state;

        return (
            <>
            <BackgroundContainer header="" />
            <div className="row justify-content-center">

                <form
                    className="col col-sm-4 card mt-5 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">Please Log In</h4>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="email" label="Email" component={renderField}
                               type="text" validate={[email, required]}
                        />
                    </fieldset>


                    <fieldset className="form-group">
                        <Field name="password" label="Password" component={renderField}
                               type={type} validate={[required]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        { renderError(error) }
                        <div className="form-button">
                            <Link role="button" to="/signup" className="btn btn-outline-secondary rounded-0 form-button__part">SignUp</Link>
                            <Button action="submit" color="secondary" className="rounded-0 form-button__part" disabled={invalid || pristine || submitting}>Login</Button>
                        </div>
                    </fieldset>

                    <Link to="/reset_password" className="text-center info-link">forgot password?</Link>
                </form>
            </div>
            </>
        )
    }
}
// {passfield ? 
//   <span className="password__show" onClick={this.props.showHide}>{type === 'password' ? 'Show' : 'Hide'}</span>
// : null    
// }
export default reduxForm({
    form: "login",
    onSubmit: loginUser,
    onChange: (values, dispatch, props) => {
        if (props.error) dispatch(clearSubmitErrors('login'));
    },
})(Login);
