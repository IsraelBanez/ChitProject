import React from 'react'
import './WeeklyCalendar.css';

import DayItem from './DayItem';

function WeeklyCalendar() {
    

    return (
        <div className='weekly-calendar'>
            <DayItem day={'Sun'} num={'24'}/>
            <DayItem day={'Mon'} num={'24'}/>
            <DayItem day={'Sun'} num={'24'}/>
            <DayItem day={'Sun'} num={'24'}/>
            <DayItem day={'Sun'} num={'24'}/>
            <DayItem day={'Sun'} num={'24'}/>
            <DayItem day={'Sat'} num={'24'}/>
        </div>
    )
}

export default WeeklyCalendar