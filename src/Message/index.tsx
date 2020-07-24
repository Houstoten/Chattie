import React, { useState, useEffect, useRef } from 'react';
import '../../css/chat.css';
import { Data } from '../Common'

interface MessageProps {
    data: Data,
    thisUserId: string,
    edit: ((messageId: string, newData: string) => void) | undefined,
    delete: ((messageId: string) => void) | undefined,
    like: ((messageId: string, userId: string) => void) | undefined
}

function Message(props: MessageProps) {

    const [edit, setEdit] = useState("");
    const [editing, setEditing] = useState(false);
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
                {!editing ?
                    <div className="message-text">{props.data.text}</div>
                    : <div className="message-edit-wrapper">
                        <input className="message-edit-input" value={edit} onChange={e => setEdit(e.target.value)}></input>
                        <button
                            className="editBtn"
                            disabled={edit.trim().length === 0
                                ? true
                                : false}
                            onClick={() => {
                                if (props.edit) {
                                    props.edit(props.data.id, edit);
                                    setEditing(false);
                                    setEdit("");
                                }
                            }
                            }><i className="far fa-paper-plane"></i></button>
                    </div>
                }
                <div className="message-additional">
                    <div className="message-timestamp additional-component">
                        {new Date(props.data.createdAt).toLocaleTimeString()}
                    </div>
                    {props.edit &&
                        <div className="message-edit additional-component">
                            {!editing ?
                                <i className="far fa-edit" onClick={() => { setEdit(props.data.text); setEditing(true) }}></i>
                                : <i className="fas fa-times" onClick={() => { setEdit(""); setEditing(false) }}></i>
                            }
                        </div>
                    }
                    {props.delete &&
                        <div className="message-delete additional-component">
                            <i className="fas fa-trash-alt" onClick={() => props.delete ? props.delete(props.data.id) : null}></i>
                        </div>
                    }
                    {props.like &&
                        <div className="message-like additional-component">
                            <i className={"fas fa-heart " + (props.data.likes?.find(e => e === props.thisUserId) ? "heart-liked" : "")}
                                onClick={() => props.like ? props.like(props.data.id, props.thisUserId) : null}>
                            </i>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Message;
