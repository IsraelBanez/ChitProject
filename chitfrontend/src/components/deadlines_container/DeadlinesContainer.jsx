import React from 'react'
import './DeadlinesContainer.css';

import TabsComponent from '../basics/TabsComponent';
import DeadlinesListSection from './DeadlinesListSection';
import AllDebtsSection from './AllDebtsSection';

function DeadlinesContainer() {
    return (
        <main className='content-container'>
            <h1>Deadlines</h1>

            <TabsComponent type='deadlines'/>
            <DeadlinesListSection title={'Overdue'}/>
            <DeadlinesListSection title={'Due today'}/>
            <AllDebtsSection />
        </main>
    )
}

export default DeadlinesContainer