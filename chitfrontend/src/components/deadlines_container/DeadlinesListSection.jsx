import React from 'react'
import './DeadlinesListSection.css';

import LoanItemList from './LoanItemList';

function DeadlinesListSection({title}) {

    return (
        <section className='deadlines-list-section'>
            <h3 className='dl-title' style={{color: title === 'Overdue' ? '#FB5656' : ''}}>{title}</h3>

            <LoanItemList />
        </section>
    )
}

export default DeadlinesListSection