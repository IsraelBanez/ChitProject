import React from 'react'
import './NotificationListSection.css';

import InfoItem from '../basics/InfoItem';

function NotificationListSection({title}) {
    return (
        <section className='notification-list-section'>
            <h3 className='nl-title'>{title}</h3>
            <InfoItem type={'notifications'}/>
        </section>
    )
}

export default NotificationListSection