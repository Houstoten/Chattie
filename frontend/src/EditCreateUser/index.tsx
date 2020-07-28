import React, { useState, useEffect } from 'react';
import '../css/chat.css';
import '../css/milligram.css';
import { bindActionCreators } from 'redux';
import { editOrCreateUser } from './actions';
const { connect } = require('react-redux');


const EditCreateUser = (props: any) => {
    const [avatar, setAvatar] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);


    function handleInputChange(event: any, setInput: any): any {
        setInput(event.target.value);
    }

    function updateState() {
        setAvatar(props.editingUser.details.avatar);
        setUsername(props.editingUser.details.username);
        setPassword(props.editingUser.details.password);
        setAdmin(props.editingUser.details.admin)
    }

    useEffect(() => updateState());

    return (
        <div className="loginPage">
            <img src={avatar} alt="Chattie"></img>
            <input type="text" placeholder="image URL" value={avatar} onChange={(e) => handleInputChange(e, setAvatar)} />
            <input type="text" placeholder="username" value={username} onChange={(e) => handleInputChange(e, setUsername)} />
            <input type="text" placeholder="password" value={password} onChange={(e) => handleInputChange(e, setPassword)} />
            <input type="checkbox" placeholder="admin" checked={admin} onChange={() => setAdmin(!admin)} />
            <button className="button"
                onClick={() => props.editOrCreateUser({ username: username, password: password, avatar: avatar, admin: admin })}>Save</button>
        </div>
    );
}

const mapStateToProps = (rootState: any) => ({
    editingUser: rootState.userEditCreate
});

const actions = {
    editOrCreateUser
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCreateUser);
