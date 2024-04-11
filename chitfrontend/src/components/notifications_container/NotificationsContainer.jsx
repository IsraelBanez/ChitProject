import React from 'react'
import './NotificationsContainer.css';

import TabsSection from '../basics/TabsSection';
import NotificationListSection from './NotificationListSection';

function NotificationsContainer() {
    return (
        <section className='notifications-container'>
            <h1>Notifications</h1>

            <TabsSection type={'notifications'}/>
            <NotificationListSection title={'Pinned'}/>
            <NotificationListSection title={'Today'}/>
            <NotificationListSection title={'This week'}/>
        </section>
    )
}

export default NotificationsContainer