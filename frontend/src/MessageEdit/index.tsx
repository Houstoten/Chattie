import { useState, useEffect } from "react";
import { Data } from "../Common";
import { bindActionCreators } from "redux";
import React from "react";
import { Link } from 'react-router-dom';
import { editMessageSave, editMessageInvalidateAndClose } from './actions'
const { connect } = require('react-redux');


const MessageEdit = (props: {
    editingMessage: { messageId: string, message: string }
    , editMessageSave: (messageId: string, message: string) => void
    , editMessageInvalidateAndClose: () => void
}): any => {
    const [input, setInput] = useState(props.editingMessage.message);
    const [editing, setEditing] = useState(false);
    function validateAndComplete(): Data | undefined {
        if (input.trim().length === 0) {
            return;
        }
        props.editMessageSave(props.editingMessage.messageId, input);
        props.editMessageInvalidateAndClose();
        setInput("");
        setEditing(false);
    }

    function abortEdit() {
        props.editMessageInvalidateAndClose();
        setEditing(false);
        setInput("");
    }

    function handleInputChange(event: any): any {
        setInput(event.target.value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (!editing && props.editingMessage.message !== input) { editRef.current.focus(); setInput(props.editingMessage.message); setEditing(true) } })

    const editRef: any = React.createRef();

    return (
        <div className={"editWrapper " + (props.editingMessage.messageId.trim().length === 0
            ? "eraser"
            : "")}
        >
            <div className="editInner">
                <label style={{ userSelect: "none", fontSize: "1.2rem" }} >Enter to edit data. Shift+Enter for new line.</label>
                <textarea ref={editRef} onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        validateAndComplete();
                    }
                    if (e.keyCode === 27) {
                        e.preventDefault();
                        abortEdit();
                    }
                }} placeholder="Are ya winning son?" value={input} onChange={handleInputChange} className="inputArea editInputArea"></textarea>
                <div className="editControlBox">
                    <Link to="/">
                        <button
                            className="button editBtn abortEditBtn"
                            onClick={() => {
                                abortEdit();
                            }
                            }>
                            <i className="fas fa-times"></i></button>
                    </Link>
                    <Link to="/" style={input.trim().length === 0 ? { pointerEvents: "none" } : {}}>
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
                    </Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (rootState: any) => ({
    editingMessage: rootState.edit.editingMessage
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