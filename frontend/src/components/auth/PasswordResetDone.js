import React, { Component } from "react";
import { BackgroundContainer } from '../general/Atoms/BackgroundContainer/BackgroundContainer'

export default class PasswordResetDone extends Component {
    render() {
        return (
            <BackgroundContainer header="An password reset email has been sent to your email. Please follow the link to reset your password." />
        )
    }
}