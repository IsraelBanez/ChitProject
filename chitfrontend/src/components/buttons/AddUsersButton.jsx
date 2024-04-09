import React from 'react'
import './AddUsersButton.css';

import {ReactComponent as AddUserIcon} from '../../icons/add-user.svg'; 

function AddUsersButton({type}) {
  let borderColor;

  switch (type){
    case 'network':
      borderColor = '#fff';
      break;
    default:
      borderColor = '#010E14';
      break;
  };

  return (
    <button className='add-users-btn' style={{borderColor: borderColor}}><AddUserIcon/></button>
  )
}

export default AddUsersButton