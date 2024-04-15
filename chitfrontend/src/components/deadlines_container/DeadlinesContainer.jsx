import React from 'react'
import './DeadlinesContainer.css';

import TabsSection from '../basics/TabsSection';
import DeadlinesListSection from './DeadlinesListSection';
import AllDebtsSection from './AllDebtsSection';

function DeadlinesContainer() {
    return (
        <main className='deadlines-container'>
            <h1>Deadlines</h1>

            <TabsSection type='deadlines'/>
            <DeadlinesListSection title={'Overdue'}/>
            <DeadlinesListSection title={'Due today'}/>
            <AllDebtsSection />
        </main>
    )
}

export default DeadlinesContainer