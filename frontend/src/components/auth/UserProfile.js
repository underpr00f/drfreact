import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../actions/authActions";
import {withRouter} from "react-router-dom";
import { Table } from 'reactstrap';

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
                <Table striped>
                  <thead><tr><th colSpan="2">Your Profile</th></tr></thead>
                  <tbody>
                    <tr>
                      <th>Username:</th>
                      <td>{user.username}</td>
                    </tr>
                    <tr>
                      <th>First Name:</th>
                      <td>{user.first_name}</td>
                    </tr>                    
                    <tr>
                      <th>Last Name:</th>
                      <td>{user.last_name}</td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th>Website:</th>
                      <td>{user.website}</td>
                    </tr>                    
                    <tr>
                      <th>About:</th>
                      <td>{user.about}</td>
                    </tr>
                  </tbody>
                </Table>
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
                
                <fieldset className="form-group">
                    <div className="form-button">
                        <Link to="/profile_edit" className="btn btn-info rounded-0 form-button__part">Update Profile</Link>
                        <Link to="/change_password" className="btn btn-outline-info rounded-0 form-button__part">Change Password</Link>
                    </div>
                </fieldset>

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