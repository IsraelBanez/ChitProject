import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import NotificationsContainer from '../../components/notifications_container/NotificationsContainer.jsx';

function Notifications() {
    return (
        <div>
            <nav className='nav-section'>
                <NavBar/>
            </nav>
            <main className='hc-container'>
                {/* Profile sidebar content */}
                <aside>
                    <SideBar/>
                </aside>
                
                <NotificationsContainer/>
            </main>

        </div>
    )
}

export default Notifications