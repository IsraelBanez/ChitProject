import React from 'react'
import './AddUsersButton.css';

import {ReactComponent as AddUserIcon} from '../../icons/add-user.svg'; 

function AddUsersButton() {
  return (
    <button className='add-users-btn'><AddUserIcon/></button>
  )
}

export default AddUsersButton