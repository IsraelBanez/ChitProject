import React from 'react'
import './CalendarSection.css';

import YearMonthHeader from './YearMonthHeader';
import WeeklyCalendar from './WeeklyCalendar';

function CalendarSection() {
    return (
        <section className='calendar-section'>
            <YearMonthHeader/>
            <WeeklyCalendar/>
        </section>
    )
}

export default CalendarSection