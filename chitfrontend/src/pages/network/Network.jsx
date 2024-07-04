import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import NetworkContainer from '../../components/network_container/NetworkContainer.jsx';

function Network() {
  return (
    <div className='signed-in-container'>
      <NavBar/>

      <div className='hc-container'>
          {/* Profile sidebar content */}
      
          <SideBar/>

          
          <NetworkContainer/>
      </div>
    </div>
  )
}

export default Network