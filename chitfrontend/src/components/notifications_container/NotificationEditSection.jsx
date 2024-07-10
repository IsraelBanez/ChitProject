import React from 'react'
import './NotificationEditSection.css';
import MarkAllAsReadButton from './MarkAllAsReadButton'

function NotificationEditSection() {
    return (
        <section className='notification-edit-section'>
            <MarkAllAsReadButton/>
        </section>
    )
}

export default NotificationEditSection