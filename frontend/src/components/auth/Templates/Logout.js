import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { BackgroundContainer } from '../../general/Atoms/BackgroundContainer/BackgroundContainer'

const Logout = ({ logoutUser }) => {
    useEffect(() => {
        logoutUser()
    }, []); 

    return (
        <BackgroundContainer header="Welcome to Lead Platform. Please Login or Signup..." />
    );

}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default connect(null, { logoutUser })(Logout);