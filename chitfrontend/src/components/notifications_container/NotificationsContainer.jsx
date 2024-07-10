import React from 'react'
import './NotificationsContainer.css';

import NotificationEditSection from './NotificationEditSection';
import TabsComponent from '../basics/TabsComponent';
import NotificationListSection from './NotificationListSection';

function NotificationsContainer() {
    return (
        <main className='content-container'>
            <h1>Notifications</h1>

            <NotificationEditSection/>
            <TabsComponent type={'notifications'}/>
            <NotificationListSection title={'Pinned'}/>
            <NotificationListSection title={'Today'}/>
            <NotificationListSection title={'This week'}/>
        </main>
    )
}

export default NotificationsContainer