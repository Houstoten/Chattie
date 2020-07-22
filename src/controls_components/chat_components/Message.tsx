import React, { useState } from 'react';
import '../../css/chat.css';

interface MessageProps {
    avatar: string,
    text: string,
    createdAt: string,
    id: string,
    edit: ((messageId: string, newData: string) => void) | undefined
}

function Message(props: MessageProps) {
    const [edit, setEdit] = useState("");

    return (
        <div className="message slide-in-blurred-bottom">
            <img src={props.avatar} alt="User is not user" onError={
                e => (e.target as HTMLImageElement).src = '../../default.jpg'
            } />
            <div className="data">
                {edit.length === 0 ?
                    <div className="message-text">{props.text}</div>
                    : <div className="message-edit-wrapper">
                        <input className="message-edit-input" value={edit} onChange={e => setEdit(e.target.value)}></input>
                        <button onClick={() => {
                            if (props.edit) {
                                props.edit(props.id, edit);
                                setEdit("");
                            }
                        }
                        }>Ok</button>
                    </div>
                }
                <div className="message-additional">
                    <div className="message-timestamp additional-component">
                        {new Date(props.createdAt).toLocaleTimeString()}
                    </div>
                    {props.edit &&
                        <div className="message-edit additional-component">
                            {edit.length === 0 ?
                                <i className="far fa-edit" onClick={() => setEdit(props.text)}></i>
                                : <i className="fas fa-times" onClick={() => setEdit("")}></i>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Message;
