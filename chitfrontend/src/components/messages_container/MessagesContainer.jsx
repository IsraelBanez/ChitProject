import React from 'react'
import './MessagesContainer.css';

import MessageEditAndNewSection from './MessageEditAndNewSection';
import MessagesSearchSection from './MessagesSearchSection';
import PinnedSection from './PinnedSection';
import TabsComponent from '../basics/TabsComponent';
import ListInfoItemsComponent from '../basics/ListInfoItemsComponent';

function MessagesContainer() {
    return (
        <main className='content-container'>
            <h1>Messages</h1>

            <MessageEditAndNewSection/>
            <MessagesSearchSection/>
            <PinnedSection/>
            <TabsComponent type={'messages'} />
            <ListInfoItemsComponent type={'messages'}/>
        </main>
    )
}

export default MessagesContainer