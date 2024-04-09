import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import NetworkContainer from '../../components/network_container/NetworkContainer.jsx';

function Network() {
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
            
            <NetworkContainer/>
        </main>

    </div>
  )
}

export default Network