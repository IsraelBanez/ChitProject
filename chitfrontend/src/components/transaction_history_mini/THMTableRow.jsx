import React from 'react'
import './THMTableRow.css';

import UserProfileButton from '../buttons/UserProfileButton';

import TestUser from '../../images/test-user.jpg';

function THMTableRow() {
    return (
        <div className='t-table-row'>
            <div className='t-tb-cell-user'>
                <UserProfileButton size={'small'} image={TestUser}/>
            </div>
            <div className='t-tb-cell-info'>
                <span className='t-type'>You paid User</span>
                <span className='t-time'>Today</span>
                <span className='t-reason'>Poker</span>
            </div>
            <div className='t-tb-cell-amount'><span>+$0.00</span></div>
        </div>
    )
}

export default THMTableRow