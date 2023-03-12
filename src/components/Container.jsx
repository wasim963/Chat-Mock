import React, { useState, useEffect, useRef } from 'react';
import  { View } from './View/View'
import ChatView from './ChatView/ChatView';

import './View/View.css'
const Container = () => {

    const [tabs, setTabs] = useState([])
    const [ activeTab, setActiveTab ] = useState(null);
    const [ isFetching, setIsFetching ] = useState( false );
    const [queryString, setQueryString] = useState('');
    const [userChats, setUserChats   ] = useState([]);

    const data = useRef(null);

    useEffect( () => {
        fetchChatList('https://my-json-server.typicode.com/codebuds-fk/chat/chats')
            .then( res => {
                setTabs( res );
                data.current = res;
            } )
            .catch( error => {
                console.log( error )
            } )
    }, [] );

    const sendChat = ( chatMessage ) => {
        setUserChats( [ ...userChats, { id: userChats?.length + 1, message: chatMessage } ] )
    }


    const debounce = (delay, func) => {
        let timer;
        return function() {
            let context = this;
            let args = arguments;
            clearTimeout( timer );
            setTimeout( () => {
                func.apply( context, args );
            }, delay )
        }
    }

    const fetchChatList = async ( url ) => {
        try{
            setIsFetching( true );
            const res = await fetch( url );
            const data = await res.json();

            setIsFetching( false );
            return data;
        }catch( error ) {
            console.log( 'something went unexpected' );
            throw error;
        }
    };

    const onFilter = async ( query ) => {

        if( query === '' || query === null || query === undefined ) {
            setTabs( data.current );
        }else {
            const _tabs = data?.current?.filter( tab => {
                return tab.orderId === query || tab.title === query;
            } );
            setTabs( _tabs )
        }

        setQueryString( query );
    };

    const betterFilter = debounce( 1000, onFilter );

    const handleList = ( tab ) => {
        setActiveTab( tab?.id );
    }

    const widgetData = tabs?.length && tabs?.find( tab => tab.id === activeTab );


  return (
    <div className='main' >
        <View
            tabs= { tabs }
            onChange={handleList}
            activeTab={activeTab}
            isFetching={isFetching}
            value={queryString}
            onFilter={betterFilter}
        >
            { activeTab && 
                <ChatView 
                    { ...widgetData }
                    userChats={userChats}
                    sendChat={sendChat}
                />
             }
        </View>
    </div>
  )
}

export default Container