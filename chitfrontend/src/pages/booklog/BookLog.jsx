import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import BookLogContainer from '../../components/booklog_container/BookLogContainer.jsx';

function BookLog() {
  return (
    <div>
      <NavBar/>

      <div className='hc-container'>
          {/* Profile sidebar content */}
      
          <SideBar/>

          
          <BookLogContainer/>
      </div>
  </div>
  )
}

export default BookLog