import React, { useState, useEffect, useRef } from 'react';
import '../css/chat.css';
import { likeMessage, deleteMessage } from './actions'
import { editMessageShow } from '../MessageEdit/actions'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { Data } from '../Common';
import { openUserEditCreate } from '../EditCreateUser/actions';
const { connect } = require('react-redux');

const Message = (props: {
    data: Data,
    thisUser: any,
    editingMessage: any
    likeMessage: (messageId: string, likerId: string) => void,
    editMessageShow: (messageId: string) => void,
    deleteMessage: (messageId: string) => void,
    openUserEditCreate: (id: string | null) => void
}): any => {

    const [scrolling, setScrolling] = useState(true);
    const selfMessage = props.data.userId === props.thisUser.id;

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
                {props.thisUser.admin && <Link style={{ fontSize: "1rem" }} to={`/user/${props.data.userId}`} onClick={() => props.openUserEditCreate(props.data.userId)}>Edit sender</Link>}
                <div className="message-text">{props.data.text}</div>
                <div className="message-additional">
                    <div className="message-timestamp additional-component">
                        {new Date(props.data.createdAt).toLocaleTimeString() + (props.data.editedAt ? " edited" : "")}
                    </div>
                    {selfMessage &&
                        <div className="message-edit additional-component additional-onHover">
                            {props.editingMessage.messageId.length === 0 &&
                                <Link to={`/edit/${props.data.id}`}><i className="fas fa-cog" onClick={() => { props.editMessageShow(props.data.id); }}></i></Link>
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
                            <i className={"fas fa-heart " + (props.data.likes?.find((e: string) => e === props.thisUser.id) ? "heart-liked" : "")}
                                onClick={() => props.likeMessage(props.data.id, props.thisUser.id)}>
                            </i>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (rootState: any) => ({
    thisUser: rootState.thisUser.credentials as string,
    editingMessage: rootState.edit.editingMessage,
    editingUser: rootState.userEditCreate.details
});

const actions = {
    likeMessage,
    editMessageShow,
    deleteMessage,
    openUserEditCreate
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message);
