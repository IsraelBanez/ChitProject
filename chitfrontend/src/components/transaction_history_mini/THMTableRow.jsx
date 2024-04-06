import React from 'react'
import './THMTableRow.css';

import UserProfileButton from '../buttons/UserProfileButton';

import TestUser from '../../images/test-user.jpg';

function THMTableRow() {
    return (
        <div className='t-table-row'>
            <div className='t-cell-user'>
                <UserProfileButton size={'small'} image={TestUser}/>
            </div>
            <div className='t-cell-info'>
                <h4 className='t-exchange'>You paid User</h4>
                <h4 className='t-time'>Today</h4>
                <h4 className='t-for'>Poker for game night</h4>
            </div>
            <div className='t-cell-amount'><h4>+$0.00</h4></div>
        </div>
    )
}

export default THMTableRow