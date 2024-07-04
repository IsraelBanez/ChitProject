import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import RemindersContainer from '../../components/reminders_container/RemindersContainer.jsx';

function Reminders() {
    return (
        <div className='signed-in-container'>
            <NavBar/>

            <div className='hc-container'>
                {/* Profile sidebar content */}
             
                <SideBar/>
        
                
                <RemindersContainer/>
            </div>
        </div>
    )
}

export default Reminders