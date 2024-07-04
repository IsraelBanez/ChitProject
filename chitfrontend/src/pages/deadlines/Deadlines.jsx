import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import DeadlinesContainer from '../../components/deadlines_container/DeadlinesContainer.jsx';

function Deadlines() {
    return (
        <div>
            <NavBar/>

            <div className='hc-container'>
                {/* Profile sidebar content */}
            
                <SideBar/>
        
                
                <DeadlinesContainer/>
            </div>
        </div>
    )
}

export default Deadlines