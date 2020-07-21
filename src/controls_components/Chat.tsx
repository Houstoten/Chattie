import React, { useState } from 'react';
import '../css/chat.css';
import '../css/milligram.css';
import { fetchData } from '../utils/Fetcher'
import Spinner from './chat_components/Spinner'
import Message from './chat_components/Message'
import Breaker from './chat_components/Breaker'

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
        fetchData("https://5f162559a346a00016738b2a.mockapi.io/data", fetcherCallback);
    }
    return (
        <div className="chat">
            <div className="chat-wrapper">
                {data.length === 0 && <Spinner />}
                <div className="row">head</div>
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
                <div className="row">textblock</div>
            </div>
        </div>
    );
}

export default Chat;
