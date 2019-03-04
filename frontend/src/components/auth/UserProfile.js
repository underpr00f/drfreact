import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../actions/authActions";
import {withRouter} from "react-router-dom";

class UserProfile extends Component {

    static propTypes = {
        getUserProfile: PropTypes.func.isRequired,
        user: PropTypes.object
    };

    componentWillMount() {
        this.props.getUserProfile();
    }

    renderUser() {
        const user = this.props.user;
        if (user) {
            return (

                <div className="mx-2 mt-2 text-center">
                    <h3>Your Profile</h3>
                    <hr />
                    <h4>Username: {user.username}</h4>
                    <h4>First Name: {user.first_name}</h4>
                    <h4>Last Name: {user.last_name}</h4>
                    <h4>Email: {user.email}</h4>
                    <h4>Website: {user.website}</h4>
                    <hr />
                    <h4>About Myself:</h4>
                    <p>{user.about}</p>

                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                {this.renderUser()}
                {" "}
                <hr />
                <Link className="btn btn-info mr-2 rounded-0" to="/profile_edit">Update Profile</Link>
                <Link className="btn btn-info rounded-0" to="/change_password">Change Password</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default withRouter(connect(mapStateToProps, { getUserProfile } )(UserProfile));