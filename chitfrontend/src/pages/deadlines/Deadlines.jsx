import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import DeadlinesContainer from '../../components/deadlines_container/DeadlinesContainer.jsx';

function Deadlines() {
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
                
                <DeadlinesContainer/>
            </main>

        </div>
    )
}

export default Deadlines