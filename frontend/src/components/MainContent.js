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
import InputForm from '../routingComps/InputForm'

const MainContent = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/account/confirm-email/:key" component={AccountActivation}/>
            <Route path="/signup_done" component={SignupDone}/>
            <Route path="/reset_password" component={PasswordReset}/>
            <Route path="/reset_password_done" component={PasswordResetDone}/>
            <Route path="/reset/:uid/:token/" component={PasswordResetConfirm}/>
            <Route path="/profile" component={RequireAuth(UserProfile)}/>
            <Route path="/profile_edit" component={RequireAuth(UserProfileEdit)}/>
            <Route path="/change_password" component={RequireAuth(PasswordChange)}/>
            <Route path='/react/posts/create' component={RequireAuth(PostCreate)}/>
            <Route path='/react/posts/:slug' component={RequireAuth(PostDetail)}/>
            <Route path='/react/posts' component={RequireAuth(ReactifyComp)} />
            <Route path='/messages' component={RequireAuth(InputForm)} />
            
            <Route component={NoMatch}/>
        </Switch>
    </div>
);

export default MainContent;
