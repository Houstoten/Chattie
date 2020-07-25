import { useState, useEffect } from "react";
import { Data } from "../Common";
import { bindActionCreators } from "redux";
import React from "react";
import { editMessageSave, editMessageInvalidateAndClose } from './actions'
const { connect } = require('react-redux');


const MessageEdit = (props: {
    editingMessage: { messageId: string, message: string }
    , editMessageSave: (messageId: string, message: string) => void
    , editMessageInvalidateAndClose: (messageId: string) => void
}): any => {
    const [input, setInput] = useState(props.editingMessage.message);
    const [editing, setEditing] = useState(false);

    function validateAndComplete(): Data | undefined {
        if (input.trim().length === 0) {
            return;
        }
        props.editMessageSave(props.editingMessage.messageId, input);
        props.editMessageInvalidateAndClose(props.editingMessage.messageId);
        setInput("");
        setEditing(false);
    }

    function abortEdit() {
        props.editMessageInvalidateAndClose(props.editingMessage.messageId);
        setEditing(false);
        setInput("");
    }

    function handleInputChange(event: any): any {
        setInput(event.target.value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (!editing && props.editingMessage.message !== input) { setInput(props.editingMessage.message); setEditing(true) } })

    return (
        <div className={"editWrapper " + (props.editingMessage.messageId.trim().length === 0
            ? "eraser"
            : "")}
        >
            <div className="editInner">
                <textarea onKeyPress={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        validateAndComplete();
                    }
                }} placeholder="Are ya winning son?" value={input} onChange={handleInputChange} className="inputArea editInputArea"></textarea>
                <form className="editControlBox">
                    <button
                        className="button editBtn abortEditBtn"
                        onClick={() => {
                            abortEdit();
                        }
                        }>
                        <i className="fas fa-times"></i></button>
                    <button disabled={input.trim().length === 0
                        ? true
                        : false
                    }
                        className="button editBtn"
                        onClick={() => {
                            validateAndComplete();
                        }
                        }>
                        <i className="far fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = (rootState: any) => ({
    editingMessage: rootState.messages.editingMessage
});

const actions = {
    editMessageSave,
    editMessageInvalidateAndClose
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageEdit);