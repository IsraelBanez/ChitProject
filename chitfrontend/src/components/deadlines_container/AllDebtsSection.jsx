import React from 'react'
import './AllDebtsSection.css';

import SearchAndRefineSection from '../basics/SearchAndRefineSection';
import DCTableHeader from './DCTableHeader';
import DCTableRow from './DCTableRow';

function AllDebtsSection() {
    return (
        <section className='all-debts-section'>
            <h3>All debts</h3>

            <SearchAndRefineSection />

            <div className='dc-table-container'>
                    <DCTableHeader/>
                    <div className='dc-table-body'>
                        <DCTableRow/>
                        <DCTableRow/>
                    </div>
                </div>
        </section>
    )
}

export default AllDebtsSection