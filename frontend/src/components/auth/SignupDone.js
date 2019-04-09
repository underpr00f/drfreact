import React, { Component } from "react";
import { BackgroundContainer } from '../general/Atoms/BackgroundContainer/BackgroundContainer'

export default class SignupDone extends Component {
    render() {
        return (
            <BackgroundContainer header="Thanks for your registration, please follow the link sent to your provided email to activate your account." />
        )
    }
}