import React from 'react'
import './DayItem.css';

function DayItem({day, num}) {
    return (
        <div className='day-item'>
            <h4>{day}</h4>
            <div>
                <h4>{num}</h4>
            </div>
        </div>
    )
}

export default DayItem