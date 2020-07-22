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
                <div className="chatName">Christians</div>
                <div className="chatParticipants">{props.userCount} participants</div>
                <div className="chatMessages">{props.messagesCount} messages</div>
            </div>
            <div className="chatLast">last message {new Date().getTime() - props.lastMessage.getTime() < (1000 * 60 * 60 * 24)
                ? "at " + props.lastMessage.toLocaleTimeString()
                : props.lastMessage.toLocaleDateString()
            }</div>
        </div>
    );
}

export default Header;
