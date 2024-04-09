import React from 'react'
import './NetworkContainer.css';

import ActiveFriendsSection from './ActiveFriendsSection';
import SearchAndRefineSection from '../basics/SearchAndRefineSection';
import TabsSection from '../basics/TabsSection';
import FriendsListSection from './FriendsListSection';

function NetworkContainer() {
    return (
        <section className='network-container'>
            <h1>Network</h1>

            <ActiveFriendsSection/>
            <SearchAndRefineSection type={'network'} />
            <TabsSection type={'network'} />
            <FriendsListSection/>
        </section>
    )
}

export default NetworkContainer