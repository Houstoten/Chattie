import React, { useState } from 'react';
import '../../css/chat.css';
import { Data } from '../Chat'
import { mock } from './mockUser'
import { uuidv4 } from '../../utils/UUIDv4'


interface MessageInputInterface {
    inputCallback: (arg: Data | undefined) => void
}

function validateAndComplete(input: string): Data | undefined {
    if (input.trim().length === 0) {
        return;
    }
    var mockCopy = Object.assign({}, mock);
    mockCopy.id = uuidv4();
    mockCopy.createdAt = new Date(Date.now()).toString();
    mockCopy.text = input;
    return (mockCopy);

}

function MessageInput(props: MessageInputInterface) {
    const [input, setInput] = useState("");

    function handleInputChange(event: any): any {
        setInput(event.target.value);
    }
    return (
        <div className="inputWrapper">
            <textarea placeholder="Are ya winning son?" value={input} onChange={handleInputChange} className="inputArea"></textarea>
            <button disabled={input.trim().length === 0
                ? true
                : false
            }
                className="button inputBtn"
                onClick={() => {
                    props.inputCallback(validateAndComplete(input));
                    setInput("");
                }
                }>
                <i className="far fa-paper-plane"></i></button>
        </div>
    );
}

export default MessageInput;
