import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
    } from 'reactstrap';

import { getUserProfile } from "../actions/authActions";
import { renderUser } from "../utils/noteUtils";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };
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
                
                    <Nav navbar>
                        <NavItem key="investors">
                            <NavLink href={"/investors"}>Investors</NavLink>
                        </NavItem>
                        <NavItem key="payments">
                            <NavLink href={"/payments"}>Payments</NavLink>
                        </NavItem>
                        <div className="navbar-profile">
                            <NavItem key="profile">
                                <NavLink href="/profile">{renderUser(user)}</NavLink>
                            </NavItem>
                            <NavItem key="logout">
                                <NavLink href="/logout">Logout</NavLink>
                            </NavItem>
                        </div>
                    </Nav>
                
            );

        } else {
            return (
                    <Nav className="ml-auto" navbar>
                        <NavItem key="login">
                            <NavLink href="/login">Login</NavLink>
                        </NavItem>,
                        <NavItem key="signup">
                            <NavLink href="/signup">Sign Up</NavLink>
                        </NavItem>
                    </Nav>
            );
        }
    }

    render() {
        return (
            <Navbar color="info" dark expand="md">
                <NavbarBrand href="/">Lead Platform</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} />
                  <Collapse isOpen={!this.state.collapsed} navbar>                    
                        {this.renderLinks()}
                  </Collapse>
            </Navbar>
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