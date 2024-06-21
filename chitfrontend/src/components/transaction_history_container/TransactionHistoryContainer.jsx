import React from 'react'
import './TransactionHistoryContainer.css';

import SearchAndRefineComponent from '../basics/SearchAndRefineComponent';
import THTableHeader from './THTableHeader';
import THTableRow from './THTableRow';

function TransactionHistoryContainer() {
    return (
        <main className='content-container'>
            <h1>Transaction History</h1>

            <SearchAndRefineComponent/>

            <div className='th-table-container'>
                <THTableHeader/>
                <div className='th-table-body'>
                    <THTableRow/>
                    <THTableRow/>
                </div>
            </div>
        </main>
    )
}

export default TransactionHistoryContainer