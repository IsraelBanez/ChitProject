import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import RemindersContainer from '../../components/reminders_container/RemindersContainer.jsx';

function Reminders() {
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
                
                <RemindersContainer/>
            </main>

        </div>
    )
}

export default Reminders