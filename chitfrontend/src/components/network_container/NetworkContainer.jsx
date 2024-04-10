import React from 'react'
import './NetworkContainer.css';

import ActiveFriendsSection from './ActiveFriendsSection';
import SearchAndRefineSection from '../basics/SearchAndRefineSection';
import TabsSection from '../basics/TabsSection';
import ListItemsSection from '../basics/ListItemsSection';

function NetworkContainer() {
    return (
        <section className='network-container'>
            <h1>Network</h1>

            <ActiveFriendsSection/>
            <SearchAndRefineSection type={'network'} />
            <TabsSection type={'network'} />
            <ListItemsSection type={'network'}/>
        </section>
    )
}

export default NetworkContainer