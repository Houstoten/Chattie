import React from 'react';
import '../css/chat.css';
import { Link } from 'react-router-dom'
import { openUserEditCreate } from '../EditCreateUser/actions';
import { bindActionCreators } from 'redux';
const { connect } = require('react-redux');


interface HeaderData {
    userCount: number,
    messagesCount: number,
    lastMessage: Date
}

const Header = (props: any) => {
    return (
        <div className="headerWrapper">
            <div className="chatSummary">
                <div className="chatName">Chattie <p style={{ marginBottom: "0", fontSize: "1rem" }}>{props.thisUser.admin && <Link to={`/user/new`} onClick={() => props.openUserEditCreate(null)}>New User</Link>}</p></div>
                <div className="chatParticipants"><i className="fas fa-users" style={{ paddingRight: "5px" }}></i>{props.userCount}</div>
                <div className="chatMessages"><i className="fas fa-envelope-open" style={{ paddingRight: "5px" }}></i>{props.messagesCount}</div>
            </div>
            <div className="chatLast">last message {new Date().getTime() - props.lastMessage.getTime() < (1000 * 60 * 60 * 24)
                ? "today at " + props.lastMessage.toLocaleTimeString()
                : props.lastMessage.toLocaleDateString()
            }</div>
        </div>
    );
}

const mapStateToProps = (rootState: any) => ({
    thisUser: rootState.thisUser.credentials as string
});

const actions = {
    openUserEditCreate
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);