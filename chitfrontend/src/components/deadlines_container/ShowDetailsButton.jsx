import React from 'react'
import './ShowDetailsButton.css';

import {ReactComponent as DownArrowIcon} from '../../icons/down-arrow.svg';

function ShowDetailsButton() {
    return (
        <button className='show-details-btn'>
            Show Details
            <DownArrowIcon/>
        </button>
    )
}

export default ShowDetailsButton