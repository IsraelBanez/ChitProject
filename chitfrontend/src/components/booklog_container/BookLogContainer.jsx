import React from 'react'
import './BookLogContainer.css';

import BLSearchAndRefineSection from './BLSearchAndRefineSection';
import BLTableHeader from './BLTableHeader';
import BLTableRow from './BLTableRow';

function BookLogContainer() {
    return (
        <main className='content-container'>
            <h1>Book Log</h1>

            <BLSearchAndRefineSection/>

            <div className='bl-table-container'>
                <BLTableHeader/>
                <div className='bl-table-body'>
                    <BLTableRow/>
                    <BLTableRow/>
                </div>
            </div>
        </main>
    )
}

export default BookLogContainer