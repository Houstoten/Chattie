import React from 'react';
import '../css/chat.css';
import '../css/milligram.css';
import { fetchMessages } from './actions'
import { bindActionCreators } from 'redux';
import Spinner from '../Components/Spinner';
import Header from '../Components/Header';
import Breaker from '../Components/Breaker';
import Message from '../Message';
import { Data } from '../Common';
import MessageInput from '../MessageInput';
const { connect } = require('react-redux');

const Chat = (props: any): any => {
    if (!props.data.length && !props.isFetching && !props.error)
        props.fetchMessages();

    return (<div className="chat">
        <div className="chat-wrapper">
            {props.data.length === 0 && <Spinner />}
            <div className="row chat-header">{props.data.length !== 0
                && <Header
                    userCount={props.data.map((x: Data) => x.userId).filter((v: Data, i: number, a: Data[]) => a.indexOf(v) === i).length}
                    messagesCount={props.data.length}
                    lastMessage={new Date(props.data[props.data.length - 1].createdAt)}
                />}
            </div>
            <div className="row chat-inner">
                {props.data.map((el: Data, i: number) => {
                    return (<div className="message-wrapper" key={el.id}>
                        {(new Date(el.createdAt).getTime()
                            - (props.data[i - 1]
                                ? new Date(props.data[i - 1].createdAt).getTime()
                                : 25)
                            > 1000 * 60 * 60 * 24
                        ) ? <Breaker date={new Date(el.createdAt)} /> : <></>}
                        <Message
                            data={Object.assign({} as Data, el)} />
                    </div>);
                })}
            </div>
            {!props.error &&
                    <div className="row chat-input">
                        <MessageInput />
                    </div>}
        </div>
    </div>);


};

const mapStateToProps = (rootState: any) => ({
    data: rootState.messages.data,
    isFetching: rootState.messages.isFetching,
    error: rootState.messages.error
});

const actions = {
    fetchMessages
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
