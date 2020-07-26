import React, { useState, useEffect, useRef } from 'react';
import '../css/chat.css';
import { likeMessage, deleteMessage } from './actions'
import { editMessageShow } from '../MessageEdit/actions'
import { bindActionCreators } from 'redux';
import { Data } from '../Common';
const { connect } = require('react-redux');

const Message = (props: {
    data: Data,
    thisUserId: string,
    editingMessage: any
    likeMessage: (messageId: string, likerId: string) => void,
    editMessageShow: (messageId: string) => void,
    deleteMessage: (messageId: string) => void
}): any => {

    const [scrolling, setScrolling] = useState(true);
    const selfMessage = props.data.userId === props.thisUserId;

    const scrollToRef = (ref: any) => window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
    const messageRef = useRef(null);

    function toggleScrolling() {
        setScrolling(!scrolling);
    }

    useEffect(() => { if (scrolling) { toggleScrolling(); return scrollToRef(messageRef) } });
    return (
        <div ref={messageRef} className={"message " + (selfMessage ? "self-message" : "")}>
            {!selfMessage &&
                <img src={props.data.avatar} alt="User is not user" onError={
                    e => (e.target as HTMLImageElement).src = '../../default.jpg'
                } />}
            <div className="data">
                <div className={"message-holderName " + (selfMessage ? "message-holderName-self" : "")}>{selfMessage ? "me" : props.data.user}</div>
                <div className="message-text">{props.data.text}</div>
                <div className="message-additional">
                    <div className="message-timestamp additional-component">
                        {new Date(props.data.createdAt).toLocaleTimeString() + (props.data.editedAt ? " edited" : "")}
                    </div>
                    {selfMessage &&
                        <div className="message-edit additional-component additional-onHover">
                            {props.editingMessage.messageId.length === 0 &&
                                <i className="fas fa-cog" onClick={() => { props.editMessageShow(props.data.id) }}></i>
                            }
                        </div>
                    }
                    {selfMessage &&
                        <div className="message-delete additional-component additional-onHover">
                            <i className="fas fa-trash-alt" onClick={() => props.deleteMessage(props.data.id)}></i>
                        </div>
                    }
                    {!selfMessage &&
                        <div className="message-like additional-component">
                            <i className={"fas fa-heart " + (props.data.likes?.find((e: string) => e === props.thisUserId) ? "heart-liked" : "")}
                                onClick={() => props.likeMessage(props.data.id, props.thisUserId)}>
                            </i>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (rootState: any) => ({
    thisUserId: rootState.messages.thisUserId as string,
    editingMessage: rootState.edit.editingMessage
});

const actions = {
    likeMessage,
    editMessageShow,
    deleteMessage
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message);
