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
//import { mock } from './chat_components/mockUser'

export interface Data {
    id: string,
    text: string,
    user: string,
    avatar: string,
    userId: string,
    editedAt: string,
    createdAt: string
}

function Chat() {
    const [data, setData] = useState([] as Data[]);

    function fetcherCallback(arg: Array<Data>): void {
        setData(arg.sort((a, b) => {
            return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        }));
    }

    if (data.length === 0) {
        fetchData("https://edikdolynskyi.github.io/react_sources/messages.json", fetcherCallback);
    }

    function inputAppendCallBack(arg: Data | undefined): void {
        if (arg)
            setData(data.concat([arg]))
    }

    // function deleteSelfMessage(messageId: string):void{

    // }

    // function likeNotSelfMessage(messageId: string):void{

    // }

    function changeSelfMessage(messageId: string, newData: string): void {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === messageId && data[i].userId === mock.userId) {
                data[i].text = newData;
            }
        }
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
                        if (new Date(el.createdAt).getTime()
                            - (data[i - 1]
                                ? new Date(data[i - 1].createdAt).getTime()
                                : 25)
                            > 1000 * 60 * 60 * 24
                        )
                            return (<>
                                <Breaker date={new Date(el.createdAt)} />
                                <Message edit={(el.userId === mock.userId) ? changeSelfMessage : undefined} id={el.id} avatar={el.avatar} text={el.text} createdAt={el.createdAt} />
                            </>);
                        return (<Message edit={(el.userId === mock.userId) ? changeSelfMessage : undefined} id={el.id} avatar={el.avatar} text={el.text} createdAt={el.createdAt} />);
                    })}
                </div>
                <div className="row chat-input">
                    <MessageInput inputCallback={inputAppendCallBack} />
                </div>
            </div>
        </div>
    );
}

export default Chat;
