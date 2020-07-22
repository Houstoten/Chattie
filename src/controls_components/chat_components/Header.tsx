import React from 'react';
import '../../css/chat.css';

interface HeaderData {
    userCount: number,
    messagesCount: number,
    lastMessage: Date
}

function Header(props: HeaderData) {
    return (
        <div className="headerWrapper">
            <div className="chatSummary">
                <div className="chatName">Chattie</div>
                <div className="chatParticipants"><i className="fas fa-users" style={{ paddingRight: "5px" }}></i>{props.userCount} participants</div>
                <div className="chatMessages"><i className="fas fa-envelope-open" style={{ paddingRight: "5px" }}></i>{props.messagesCount} messages</div>
            </div>
            <div className="chatLast">last message {new Date().getTime() - props.lastMessage.getTime() < (1000 * 60 * 60 * 24)
                ? "today at " + props.lastMessage.toLocaleTimeString()
                : props.lastMessage.toLocaleDateString()
            }</div>
        </div>
    );
}

export default Header;
