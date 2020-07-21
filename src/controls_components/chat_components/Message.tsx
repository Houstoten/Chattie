import React from 'react';
import '../../css/chat.css';

interface MessageProps {
    avatar: string,
    text: string,
    createdAt: string
}

function Message(props: MessageProps) {
    return (
        <div className="message">
            <img src={props.avatar} alt="User is not user" />
            <div className="data">
                <div className="message-text">{props.text}</div>
                <div className="message-createdAt">{new Date(props.createdAt).toLocaleTimeString()}</div>
            </div>
        </div>
    );
}

export default Message;
