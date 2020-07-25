import React, { useState } from 'react';
import '../css/chat.css';
import { Data } from '../Common'
import { bindActionCreators } from 'redux';
import { inputMessage } from './actions'
import { editMessageShowUnindexed } from '../Message/actions'
const { connect } = require('react-redux');


const MessageInput = (props: { inputMessage: (message: string) => void, editMessageShowUnindexed: (head: boolean) => void }): any => {
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

    function handleLastEditing(): any {
        props.editMessageShowUnindexed(false);
    }

    return (
        <div className="inputWrapper">
            <textarea autoFocus onKeyDown={e => {
                if (e.keyCode === 38 && input.trim().length === 0) {
                    e.preventDefault();
                    handleLastEditing();
                }
            }} placeholder="Are ya winning son?" value={input} onChange={handleInputChange} className="inputArea"></textarea>
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
    inputMessage,
    editMessageShowUnindexed
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(MessageInput);