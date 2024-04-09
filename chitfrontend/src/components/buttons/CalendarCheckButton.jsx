import React from 'react'
import './CalendarCheckButton.css';

import {ReactComponent as CalendarCheckIcon} from '../../icons/calendar-check.svg';
 
export default function CalendarCheckButton() {
    return (
        <button className='calendar-check-btn'><CalendarCheckIcon/>Calendar check</button>
    )
}
