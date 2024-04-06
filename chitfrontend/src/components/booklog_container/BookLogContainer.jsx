import React from 'react'
import './BookLogContainer.css';

import SearchAndRefineSection from '../basics/SearchAndRefineSection';
import BLTableHeader from './BLTableHeader';
import BLTableRow from './BLTableRow';

function BookLogContainer() {
    return (
        <section className='book-log-container'>
            <h1>Book Log</h1>

            <SearchAndRefineSection/>

            <div className='bl-table-container'>
                <BLTableHeader/>
                <div className='bl-table-body'>
                    <BLTableRow/>
                    <BLTableRow/>
                </div>
            </div>
        </section>
    )
}

export default BookLogContainer