import React, { useState } from 'react';
import '../css/chat.css';
import '../css/milligram.css';
import { fetchData } from '../utils/Fetcher'
import Spinner from './chat_components/Spinner'
import Message from './chat_components/Message'
import Breaker from './chat_components/Breaker'
import Header from './chat_components/Header'
import MessageInput from './chat_components/MessageInput'
import { mock } from './chat_components/mockUser';
import { errorData } from './chat_components/loadErrorMessage'

export interface Data {
    id: string,
    text: string,
    user: string,
    avatar: string,
    userId: string,
    editedAt: string,
    createdAt: string,
    likes?: string[]
}

function Chat() {
    const [data, setData] = useState([] as Data[]);
    const [error, setError] = useState(false);

    function fetcherCallback(arg: Array<Data>): void {
        if (!arg.length) {
            var errData = Object.assign({}, errorData);
            errData.createdAt = new Date(Date.now()).toString();
            setData(data.concat(errData));
            setError(true);
        } else {
            setData(arg.sort((a, b) => {
                return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

            }));
        }
    }

    if (data.length === 0) {
        fetchData("https://edikdolynskyi.github.io/react_sources/messages.json", fetcherCallback);
    }

    function inputAppendCallBack(arg: Data | undefined): void {
        if (arg)
            setData(data.concat([arg]))
    }

    function deleteSelfMessage(messageId: string): void {
        setData(data.filter(el => el.id !== messageId));
    }

    function likeNotSelfMessage(messageId: string, userId: string): void {
        data.map(el => {
            if (el.id === messageId && el.userId !== mock.userId) {
                if (el.likes?.find(e => e === userId)) {
                    el.likes = el.likes.filter(ee => ee !== userId)
                } else {
                    if (el.likes) {
                        el.likes.push(userId);
                    } else {
                        el.likes = [userId];
                    }
                }
            }
            return el;
        });
        setData(data.slice(0, data.length))
    }

    function changeSelfMessage(messageId: string, newData: string): void {
        data.map(el => {
            if (el.id === messageId && el.userId === mock.userId) {
                el.text = newData
            }
            return el;
        });
        setData(data.slice(0, data.length))
    }

    return (
        <div className="chat">
            <div className="chat-wrapper">
                {data.length === 0 && <Spinner />}
                <div className="row chat-header">{data.length !== 0
                    && <Header
                        userCount={data.map(x => x.userId).filter((v, i, a) => a.indexOf(v) === i).length}
                        messagesCount={data.length}
                        lastMessage={new Date(data[data.length - 1].createdAt)}
                    />}
                </div>
                <div className="row chat-inner">
                    {data.map((el, i) => {

                        return (<div className="message-wrapper" key={el.id}>
                            {(new Date(el.createdAt).getTime()
                                - (data[i - 1]
                                    ? new Date(data[i - 1].createdAt).getTime()
                                    : 25)
                                > 1000 * 60 * 60 * 24
                            ) ? <Breaker date={new Date(el.createdAt)} /> : <></>}
                            <Message
                                like={(el.userId !== mock.userId) ? likeNotSelfMessage : undefined}
                                delete={(el.userId === mock.userId) ? deleteSelfMessage : undefined}
                                edit={(el.userId === mock.userId) ? changeSelfMessage : undefined}
                                thisUserId={mock.userId}
                                data={el} />
                        </div>);
                    })}
                </div>
                {!error &&
                    <div className="row chat-input">
                        <MessageInput inputCallback={inputAppendCallBack} />
                    </div>}
            </div>
        </div>
    );
}

export default Chat;
