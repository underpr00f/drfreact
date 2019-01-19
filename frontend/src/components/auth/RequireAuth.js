import React, { Component } from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";

export default function(ComposedComponent) {
    class Authentication extends Component {

        static propTypes = {
            history: PropTypes.object
        };

        componentWillMount() {
            this.checkAuthentication(this.props);

        }

        componentWillUpdate(nextProps) {
            this.checkAuthentication(nextProps);
        }

        checkAuthentication(props) {
            if (!props.authenticated) {
                this.props.history.push("/login");
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        // provide is_staff to props
        let is_staff = false;
        if (state.auth.user && state.auth.user.is_staff) {
            is_staff = true;
        }
        return { authenticated: state.auth.authenticated, 
                is_staff: is_staff, 
            }
    }
    return withRouter(connect(mapStateToProps)(Authentication));
}
