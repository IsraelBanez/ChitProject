import React from 'react'
import './MessagesContainer.css';

import SearchAndRefineComponent from '../basics/SearchAndRefineComponent';
import PinnedSection from './PinnedSection';
import TabsComponent from '../basics/TabsComponent';
import ListInfoItemsComponent from '../basics/ListInfoItemsComponent';

function MessagesContainer() {
    return (
        <section className='content-container'>
            <h1>Messages</h1>

            <SearchAndRefineComponent type={'messages'} />
            <PinnedSection/>
            <TabsComponent type={'messages'} />
            <ListInfoItemsComponent type={'messages'}/>
        </section>
    )
}

export default MessagesContainer