import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import SearchContainer from '../../components/search_container/SearchContainer.jsx';

function Search() {
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
                
                <SearchContainer/>
            </main>

        </div>
    )
}

export default Search