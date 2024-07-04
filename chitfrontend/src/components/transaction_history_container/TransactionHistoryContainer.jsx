import React from 'react'
import './TransactionHistoryContainer.css';

import THSearchAndRefineSection from './THSearchAndRefineSection';
import THTableHeader from './THTableHeader';
import THTableRow from './THTableRow';

function TransactionHistoryContainer() {
    return (
        <main className='content-container'>
            <h1>Transaction History</h1>

            <THSearchAndRefineSection/>

            <section className='th-table-container'>
                <THTableHeader/>
                <div className='th-table-body'>
                    <THTableRow/>
                    <THTableRow/>
                </div>
            </section>
        </main>
    )
}

export default TransactionHistoryContainer