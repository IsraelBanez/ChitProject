import React from 'react'
import './SortByButton.css';

import {ReactComponent as DownArrowIcon} from '../../icons/down-arrow.svg';

function SortByButton() {
    return (
        <button className='sort-by-btn'>
            Sort by
            <DownArrowIcon/>
        </button>
    )
}

export default SortByButton