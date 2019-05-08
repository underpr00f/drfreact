import React from "react";
import { Switch, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import { Landing } from "./Landing";
import Login from "./auth/Templates/Login";
import Logout from "./auth/Templates/Logout";
import Signup from "./auth/Signup";
import { SignupDone } from "./auth/Templates/SignupDone";
import AccountActivation from "./auth/AccountActivation";
import UserProfile from "./auth/Templates/UserProfile";
import UserProfileDetail from "./auth/Templates/UserProfileDetail";
import UserProfileEdit from "./auth/UserProfileEdit";
import PasswordChange from "./auth/PasswordChange";
import PasswordReset from "./auth/PasswordReset";
import { PasswordResetDone } from "./auth/Templates/PasswordResetDone";
import PasswordResetConfirm from "./auth/PasswordResetConfirm";
import {ErrorPage} from "./general/Organisms/ErrorPage/ErrorPage";

import Notes from './notes/Templates/Notes/Notes'
import NoteDetail from './notes/Templates/NoteDetail/NoteDetail'
import NoteNew from './notes/Templates/NoteNew/NoteNew'
import Payments from './notes/Templates/Payments/Payments'

const MainContent = () => (

    <Switch>
        <Route exact path="/" component={props => <Landing {...props} />} />
        <Route path="/reload" component={null} key="reload" />
        <Route path="/login" component={props => <Login {...props} />} />
        <Route path="/logout" component={props => <Logout {...props} />}/>
        <Route path="/signup" component={props => <Signup {...props} />}/>
        <Route path="/activation/confirm-email/:key" component={props => <AccountActivation {...props} />}/>
        <Route path="/signup_done" component={props => <SignupDone {...props} />}/>
        <Route path="/reset_password" component={props => <PasswordReset {...props} />}/>
        <Route path="/reset_password_done" component={props => <PasswordResetDone {...props} />}/>
        <Route path="/pass/reset/:uid/:token/" component={props => <PasswordResetConfirm {...props} />}/>
        <Route exact path="/profile" component={RequireAuth(UserProfile)}/>
        <Route path='/profile/:id' component={RequireAuth(UserProfileDetail)}/>
        <Route path="/profile_edit" component={RequireAuth(UserProfileEdit)}/>
        <Route path="/change_password" component={RequireAuth(PasswordChange)}/>
        <Route exact path='/investors' component={RequireAuth(Notes)} />
        <Route path='/investors/add' component={RequireAuth(NoteNew)}/>
        <Route path='/investors/:id' component={RequireAuth(NoteDetail)}/>
        <Route exact path='/payments' component={RequireAuth(Payments)} />

        <Route component={props => <ErrorPage {...props} />}/>
    </Switch>

);

export default MainContent;
