import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
    } from 'reactstrap';

import { NavigationLink, NavigationUserLink, BrandButton } from './general/Atoms/Links/Links'
import { getUserProfile } from "../actions/authActions";

class Header extends Component {
    state = {
        collapsed: true
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    static propTypes = {
        authenticated: PropTypes.bool,
        getUserProfile: PropTypes.func.isRequired,
        user: PropTypes.object
    };
    componentWillMount() {
        this.props.getUserProfile();
    } 

    renderLinks() {
        if (this.props.authenticated) {
            const { user } = this.props
            return (
                <>
                    <Nav navbar className="navbar-links">
                        <NavigationLink
                          urltext="Investors"
                          customclass="nav-links__link"
                        />
                        <NavigationLink
                          urltext="Payments"
                          customclass="nav-links__link"
                        />
                    </Nav>
                    <Nav navbar className="navbar-profile">
                        <NavigationUserLink
                            urltext="profile"
                            user={user}
                            customclass="nav-user"
                        />
                        <NavigationLink
                            urltext="Logout"
                            customclass="nav-logout"
                        />
                    </Nav>  
                </>              
            );
        } else {
            return (
                    <Nav className="ml-auto" navbar>
                        <NavigationLink
                          urltext="Login"
                          customclass="nav-links__link"
                        />
                       <NavigationLink
                          urltext="SignUp"
                          customclass="nav-links__link"
                        />
                    </Nav>
            );
        }
    }

    render() {
        return (
            <div className="content-navbar">
                <Navbar color="secondary" dark expand="md">
                    <BrandButton />
                    <NavbarToggler onClick={this.toggleNavbar} />
                      <Collapse isOpen={!this.state.collapsed} navbar>                    
                            {this.renderLinks()}
                      </Collapse>
                </Navbar>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserProfile: () => {
            return dispatch(getUserProfile());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);