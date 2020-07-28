import React, { useState } from 'react';
import '../css/chat.css';
import '../css/milligram.css';
import { bindActionCreators } from 'redux';
import { login } from './actions';
import { Redirect } from 'react-router-dom';
const { connect } = require('react-redux');


const LoginPage = (props: any): any => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleInputChange(event: any, setInput: any): any {
        setInput(event.target.value);
    }

    return (
        !props.token ?
            <div className="loginPage">
                <img src="../../Chattie.svg" alt="Chattie"></img>
                <input type="text" placeholder="username" value={username} onChange={(e) => handleInputChange(e, setUsername)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => handleInputChange(e, setPassword)} />
                <button className="button" onClick={() => props.login(username, password)}>Login</button>
            </div>
            : <Redirect to="/" />);
}

const mapStateToProps = (rootState: any) => ({
    token: rootState.thisUser.credentials.token
});

const actions = {
    login
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);