import React from 'react';
import '../css/chat.css';
import '../css/milligram.css';
import { fetchMessages } from './actions'
import { likeMessage } from '../Message/actions'
import { bindActionCreators } from 'redux';
const { connect } = require('react-redux');

const Chat = (props: any): any => {
    if (!props.data.length && !props.isFetching && !props.error)
        props.fetchMessages("https://edikdolynskyi.github.io/react_sources/messages.json");

    return (
        <>
            <button onClick={() => props.fetchMessages("https://edikdolynskyi.github.io/react_sources/messages.json")}>fetch</button>
            <div>{props.data.length}</div>
            <button onClick={() => props.likeMessage("80f08600-1b8f-11e8-9629-c7eca82aa7bd", "me")}>like 0 element</button>
        </>);


};

const mapStateToProps = (rootState: any) => ({
    data: rootState.messages.data,
    isFetching: rootState.messages.isFetching,
    error: rootState.messages.error
});

const actions = {
    fetchMessages,
    likeMessage
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
