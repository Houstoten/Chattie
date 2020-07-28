import Chat from "./Chat";
import React from "react";
import MessageEdit from "./MessageEdit";
import LoginPage from "./LoginPage";
import { Switch, Route } from 'react-router-dom'
import { LoginRedirector } from "./LoginPage/LoginRedirector";

const { connect } = require('react-redux');


const App = (props: any) => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/" component={props.token ? Chat : LoginRedirector} />
            <Route path="/edit/:id" component={props.token ? MessageEdit : LoginRedirector} />
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
