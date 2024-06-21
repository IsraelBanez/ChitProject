import React from 'react'
import './BookLogContainer.css';

import SearchAndRefineComponent from '../basics/SearchAndRefineComponent';
import BLTableHeader from './BLTableHeader';
import BLTableRow from './BLTableRow';

function BookLogContainer() {
    return (
        <section className='content-container'>
            <h1>Book Log</h1>

            <SearchAndRefineComponent/>

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