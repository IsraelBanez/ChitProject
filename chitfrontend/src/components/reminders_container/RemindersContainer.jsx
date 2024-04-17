import React from 'react'
import './ReminderContainer.css';

import CalendarSection from './CalendarSection';
import TodoSection from './TodoSection';

function RemindersContainer() {
    return (
        <section className='content-container'>
            <h1>Reminders</h1>

            <CalendarSection/>

            <TodoSection/>
        </section>
    )
}

export default RemindersContainer