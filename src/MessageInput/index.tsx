import React, { useState } from 'react';
import '../css/chat.css';
import { Data } from '../Common'
import { bindActionCreators } from 'redux';
import { inputMessage } from './actions'
const { connect } = require('react-redux');


const MessageInput = (props: { inputMessage: (message: string) => void }): any => {
    const [input, setInput] = useState("");

    function validateAndComplete(): Data | undefined {
        if (input.trim().length === 0) {
            return;
        }
        props.inputMessage(input);
        setInput("");
    }

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
                    validateAndComplete();
                }
                }>
                <i className="far fa-paper-plane"></i></button>
        </div>
    );
}

const actions = {
    inputMessage
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(MessageInput);