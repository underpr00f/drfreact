import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { BackgroundContainer } from '../general/Atoms/BackgroundContainer/BackgroundContainer'

class Logout extends Component {

    static propTypes = {
        logoutUser: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.logoutUser();
    }

    render() {
        return (
            <BackgroundContainer header="Welcome to Lead Platform. Please Login or Signup..." />
        );
    }
}

export default connect(null, { logoutUser })(Logout);