import React, { useState } from 'react';
import '../css/chat.css';
import '../css/milligram.css';
import { fetchData } from '../utils/Fetcher'
import Spinner from './chat_components/Spinner'
import Message from './chat_components/Message'

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
        fetchData<Data>("https://5f162559a346a00016738b2a.mockapi.io/data", fetcherCallback);
    }
    return (
        <div className="chat">
            <div className="chat-wrapper">
                {data.length === 0 && <Spinner />}
                <div className="row">head</div>
                <div className="row chat-inner">
                    {data.map((el, i) => {
                        // if (Date.now() - Date.parse(el.createdAt) >= 3)//todo append on each true and multiply
                        //     return (<div><hr /><Message avatar={el.avatar} text={el.text} createdAt={el.createdAt} /></div>);
                        return (<Message avatar={el.avatar} text={el.text} createdAt={el.createdAt} />);
                    })}
                </div>
                <div className="row">textblock</div>
            </div>
        </div>
    );
}

export default Chat;
