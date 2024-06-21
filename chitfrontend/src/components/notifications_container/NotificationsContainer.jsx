import React from 'react'
import './NotificationsContainer.css';

import TabsComponent from '../basics/TabsComponent';
import NotificationListSection from './NotificationListSection';

function NotificationsContainer() {
    return (
        <section className='content-container'>
            <h1>Notifications</h1>

            <TabsComponent type={'notifications'}/>
            <NotificationListSection title={'Pinned'}/>
            <NotificationListSection title={'Today'}/>
            <NotificationListSection title={'This week'}/>
        </section>
    )
}

export default NotificationsContainer