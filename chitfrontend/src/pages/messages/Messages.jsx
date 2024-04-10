import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';

import MessagesContainer from '../../components/messages_container/MessagesContainer.jsx';

function Messages() {
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
                
                <MessagesContainer/>
            </main>

        </div>
    )
}

export default Messages