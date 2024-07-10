import React from 'react'
import './NetworkContainer.css';

import ActiveFriendsSection from './ActiveFriendsSection';
import NetworkSearchAndPlanSection from './NetworkSearchAndPlanSection';
import TabsComponent from '../basics/TabsComponent';
import ListInfoItemsComponent from '../basics/ListInfoItemsComponent';

function NetworkContainer() {
    return (
        <main className='content-container'>
            <h1>Network</h1>

            <ActiveFriendsSection/>
            <NetworkSearchAndPlanSection/>
            <TabsComponent type={'network'} />
            <ListInfoItemsComponent type={'network'}/>
        </main>
    )
}

export default NetworkContainer