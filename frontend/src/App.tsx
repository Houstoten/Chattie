import Chat from "./Chat";
import React from "react";
import MessageEdit from "./MessageEdit";
import LoginPage from "./LoginPage";
import { Switch, Route } from 'react-router-dom'
import { LoginRedirector } from "./LoginPage/LoginRedirector";
import EditCreateUser from "./EditCreateUser";

const { connect } = require('react-redux');


const App = (props: any) => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/" component={props.token ? Chat : LoginRedirector} />
            <Route path="/edit/:id" component={props.token ? MessageEdit : LoginRedirector} />
            <Route path="/user/:id" component={props.token ? EditCreateUser : LoginRedirector}/>
        </Switch>
    );
}

const mapStateToProps = (rootState: any) => ({
    token: rootState.thisUser.credentials.token
});

export default connect(
    mapStateToProps,
    null
)(App);
