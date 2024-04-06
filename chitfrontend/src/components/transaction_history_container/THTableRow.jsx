import React from 'react'
import './THTableRow.css';

import UserProfileButton from '../buttons/UserProfileButton';
import DetailsButton from './DetailsButton';

import TestUser from '../../images/test-user.jpg';

function THTableRow() {
  return (
    <div className='th-table-row'>
      <div className='th-cell-user'>
        <UserProfileButton size={'medium'} image={TestUser}/>
      </div>
      <div className='th-cell-exchange'><h4><b>You</b> paid <a href=''>User</a></h4></div>
      <div className='th-cell-for'><h4>Poker for game night</h4></div>
      <div className='th-cell-date'><h4>Sept 23, 2025</h4></div>
      <div className='th-cell-amount'><h4>+$0.00</h4></div>
      <div className='th-cell-action'><DetailsButton/></div>
    </div>
  )
}

export default THTableRow