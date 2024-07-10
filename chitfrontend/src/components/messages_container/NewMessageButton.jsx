import React from 'react'
import './NewMessageButton.css';

import {ReactComponent as NewMessageIcon} from '../../icons/new-message.svg';

function NewMessageButton() {
    return (
        <button className='new-message-btn'><NewMessageIcon/></button>
    )
}

export default NewMessageButton