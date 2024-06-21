import React from 'react'
import './NetworkContainer.css';

import ActiveFriendsSection from './ActiveFriendsSection';
import SearchAndRefineComponent from '../basics/SearchAndRefineComponent';
import TabsComponent from '../basics/TabsComponent';
import ListInfoItemsComponent from '../basics/ListInfoItemsComponent';

function NetworkContainer() {
    return (
        <section className='content-container'>
            <h1>Network</h1>

            <ActiveFriendsSection/>
            <SearchAndRefineComponent type={'network'} />
            <TabsComponent type={'network'} />
            <ListInfoItemsComponent type={'network'}/>
        </section>
    )
}

export default NetworkContainer