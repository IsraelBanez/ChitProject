import React from 'react'
import './MessagesContainer.css';

import SearchAndRefineSection from '../basics/SearchAndRefineSection';
import PinnedSection from './PinnedSection';
import TabsSection from '../basics/TabsSection';
import ListItemsSection from '../basics/ListItemsSection';

function MessagesContainer() {
    return (
        <main className='messages-container'>
            <h1>Messages</h1>

            <SearchAndRefineSection type={'messages'} />
            <PinnedSection/>
            <TabsSection type={'messages'} />
            <ListItemsSection type={'messages'}/>
        </main>
    )
}

export default MessagesContainer