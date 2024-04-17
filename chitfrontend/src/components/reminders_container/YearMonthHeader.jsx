import React from 'react'
import './YearMonthHeader.css';

import YearMonthButton from './YearMonthButton';
import FlipButton from './FlipButton';

function YearMonthHeader() {
    return (
        <div className='year-month-header'>
            <YearMonthButton/>
            <FlipButton/>
        </div>
    )
}

export default YearMonthHeader