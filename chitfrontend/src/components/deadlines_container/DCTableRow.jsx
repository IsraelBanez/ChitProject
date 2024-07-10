import React from 'react'
import './DCTableRow.css';

import UserProfileButton from '../buttons/UserProfileButton';
import MoreButton from '../buttons/MoreButtonV1';
import SummaryButton from './SummaryButton';

import TestUser from '../../images/test-user.jpg';

function DCTableRow() {
    return (
        <div className='dc-table-row'>
            <div className='dc-cell-user'>
                <UserProfileButton size={'medium'} image={TestUser}/>
            </div>
            <div className='dc-cell-amount'><h4>$0.00</h4></div>
            <div className='dc-cell-deadline'><span>Nov 23,2024</span></div>
            <div className='dc-cell-info'><SummaryButton/></div>
            <div className='dc-cell-more'><MoreButton/></div>
        </div>
    )
}

export default DCTableRow