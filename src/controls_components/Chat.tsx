import React, { useState } from 'react';
import '../css/chat.css';
import '../css/milligram.css';
import { fetchData } from '../utils/Fetcher'
import Spinner from './chat_components/Spinner'
import Message from './chat_components/Message'
import Breaker from './chat_components/Breaker'
import Header from './chat_components/Header'

interface Data {
    id: string,
    text: string,
    user: string,
    avatar: string,
    userId: string,
    editedAt: string,
    createdAt: string
}

function Chat() {
    const [data, setData] = useState(new Array<Data>());
    function fetcherCallback(arg: Array<Data>): void {
        setData(arg.sort((a, b) => {
            return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        }));
    }
    if (data.length === 0) {
        fetchData("https://edikdolynskyi.github.io/react_sources/messages.json", fetcherCallback);
    }
    return (
        <div className="chat">
            <div className="chat-wrapper">
                {data.length === 0 && <Spinner />}
                <div className="row chat-header">{data.length !== 0 && <Header userCount={data.map(x=>x.userId).filter((v, i, a) => a.indexOf(v) === i).length} messagesCount={data.length} lastMessage={new Date(data[data.length - 1].createdAt)} />}</div>
                <div className="row chat-inner">
                    {data.map((el, i) => {
                        if (new Date(el.createdAt).getUTCHours()
                            < (data[i - 1]
                                ? new Date(data[i - 1].createdAt).getUTCHours()
                                : 25)
                        )
                            return (<><Breaker date={new Date(el.createdAt)} /><Message avatar={el.avatar} text={el.text} createdAt={el.createdAt} /></>);
                        return (<Message avatar={el.avatar} text={el.text} createdAt={el.createdAt} />);
                    })}
                </div>
                <div className="row chat-input">textblock</div>
            </div>
        </div>
    );
}

export default Chat;
