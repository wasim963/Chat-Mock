import React, {useState } from 'react';
import './ChatView.css'


const ChatView = ( props ) => {

    const { messageList, sendChat, userChats } = props;
    const [chat, setChat] = useState('');
    
    return(
        <div className='chat-view' >
            <div className='chat-view__title' >
                {props?.title}
            </div>
            <div className='chat-view__body'>
                { ( messageList?.length || userChats?.length ) ? 
                <ul className='chat-view__body__messages'>
                    {
                        messageList?.length && messageList?.map( ( msg, index ) => {
                            return(
                                <li 
                                    key={`bot${index}`} 
                                    className='chat-view__body__messages__msg chat-view__body__messages__left'
                                >
                                    <span>{ msg.message } </span>
                                </li>
                            )
                        } )
                    }
                    {
                        userChats.length && userChats.map( ( msg, index ) => {
                            return(
                                <li 
                                    key={`user${index}`} 
                                    className='chat-view__body__messages__msg chat-view__body__messages__right'
                                >
                                    <span>{ msg.message } </span>
                                </li>
                            )
                        } )
                    }
                </ul>
                :
                <h4>Send a message to start chatting </h4> }
                <div className='chat-view__body__send'>
                    <input type='text' onChange={( event ) => setChat( event.target.value )} value={chat} />
                    <button onClick={ () => sendChat( chat ) } >Send</button>
                </div>
            </div>
        </div>
    )
}

export default ChatView