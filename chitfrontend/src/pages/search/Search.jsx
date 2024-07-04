import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import SearchContainer from '../../components/search_container/SearchContainer.jsx';

function Search() {
    return (
        <div>
            <NavBar/>

            <div className='hc-container'>
                {/* Profile sidebar content */}
             
                <SideBar/>
        
                
                <SearchContainer/>
            </div>
        </div>
    )
}

export default Search