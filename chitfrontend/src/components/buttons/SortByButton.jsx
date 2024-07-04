import React from 'react'
import './SortByButton.css';

import {ReactComponent as DownArrowIcon} from '../../icons/down-arrow.svg';

function SortByButton({onClick}) {
    return (
        <button className='sort-by-btn' onClick={onClick}>
            Sort by
            <DownArrowIcon/>
        </button>
    )
}

export default SortByButton