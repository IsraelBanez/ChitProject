import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import MessagesContainer from '../../components/messages_container/MessagesContainer.jsx';

function Messages() {
    return (
        <div className='signed-in-container'>
            <NavBar/>

            <div className='hc-container'>
                {/* Profile sidebar content */}
             
                <SideBar/>
        
                
                <MessagesContainer/>
            </div>
        </div>
    )
}

export default Messages