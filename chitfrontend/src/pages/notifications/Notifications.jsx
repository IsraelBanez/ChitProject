import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import NotificationsContainer from '../../components/notifications_container/NotificationsContainer.jsx';

function Notifications() {
    return (
        <div>
            <NavBar/>

            <div className='hc-container'>
                {/* Profile sidebar content */}
             
                <SideBar/>
        
                
                <NotificationsContainer/>
            </div>
        </div>
    )
}

export default Notifications