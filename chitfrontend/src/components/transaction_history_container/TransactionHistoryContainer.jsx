import React from 'react'
import './TransactionHistoryContainer.css';

import SearchAndRefineSection from '../basics/SearchAndRefineSection';
import THTableHeader from './THTableHeader';
import THTableRow from './THTableRow';

function TransactionHistoryContainer() {
    return (
        <section className='transaction-history-container'>
            <h1>Transaction History</h1>

            <SearchAndRefineSection/>

            <div className='th-table-container'>
                <THTableHeader/>
                <div className='th-table-body'>
                    <THTableRow/>
                    <THTableRow/>
                </div>
            </div>
        </section>
    )
}

export default TransactionHistoryContainer