import React from "react";
import { Switch, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Landing from "./Landing";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Signup from "./auth/Signup";
import SignupDone from "./auth/SignupDone";
import AccountActivation from "./auth/AccountActivation";
import UserProfile from "./auth/UserProfile";
import UserProfileEdit from "./auth/UserProfileEdit";
import PasswordChange from "./auth/PasswordChange";
import PasswordReset from "./auth/PasswordReset";
import PasswordResetDone from "./auth/PasswordResetDone";
import PasswordResetConfirm from "./auth/PasswordResetConfirm";
import NoMatch from "./NoMatch";

import ReactifyComp from '../routingComps/ReactifyComp'
import PostDetail from '../reactify/PostDetail';
import PostCreate from '../reactify/PostCreate'
import InputForm from './notes/InputForm'
import NoteDetail from './notes/NoteDetail'
import NewNote from './notes/NewNote'
import Payments from './notes/Payments'

const MainContent = () => (
    <div>
        <Switch>
            <Route exact path="/" component={props => <Landing {...props} />} />
            <Route path="/login" component={props => <Login {...props} />} />
            <Route path="/logout" component={props => <Logout {...props} />}/>
            <Route path="/signup" component={props => <Signup {...props} />}/>
            <Route path="/account/confirm-email/:key" component={props => <AccountActivation {...props} />}/>
            <Route path="/signup_done" component={props => <SignupDone {...props} />}/>
            <Route path="/reset_password" component={props => <PasswordReset {...props} />}/>
            <Route path="/reset_password_done" component={props => <PasswordResetDone {...props} />}/>
            <Route path="/reset/:uid/:token/" component={props => <PasswordResetConfirm {...props} />}/>
            <Route path="/profile" component={RequireAuth(UserProfile)}/>
            <Route path="/profile_edit" component={RequireAuth(UserProfileEdit)}/>
            <Route path="/change_password" component={RequireAuth(PasswordChange)}/>
            <Route path='/react/posts/create' component={RequireAuth(PostCreate)}/>
            <Route path='/react/posts/:slug' component={RequireAuth(PostDetail)}/>
            <Route path='/react/posts' component={RequireAuth(ReactifyComp)} />
            <Route exact path='/investors' component={RequireAuth(InputForm)} />
            <Route path='/investors/add' component={RequireAuth(NewNote)}/>
            <Route path='/investors/:id' component={RequireAuth(NoteDetail)}/>
            <Route exact path='/payments' component={RequireAuth(Payments)} />

            <Route component={props => <NoMatch {...props} />}/>
        </Switch>
    </div>
);

export default MainContent;
