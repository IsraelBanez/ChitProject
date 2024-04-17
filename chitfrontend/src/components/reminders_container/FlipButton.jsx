import React from 'react'
import './FlipButton.css';

import {ReactComponent as DownArrowIcon} from '../../icons/down-arrow.svg';

function FlipButton() {
    return (
        <button className='flip-btn'>
            <DownArrowIcon />
            <DownArrowIcon />
        </button>
    )
}

export default FlipButton