import React from 'react'
import './YearMonthButton.css';

import {ReactComponent as DownArrowIcon} from '../../icons/down-arrow.svg';

function YearMonthButton() {
    return (
        <button className='year-month-btn'>Month Year <DownArrowIcon/></button>
    )
}

export default YearMonthButton