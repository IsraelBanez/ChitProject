import React from 'react'
import './MoreButton.css';

import {ReactComponent as MoreIcon} from '../../icons/more.svg';

function MoreButton() {
    return (
        <button className='more-btn'>
            <MoreIcon/>
        </button>
    )
}

export default MoreButton