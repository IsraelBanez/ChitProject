import React from 'react'
import './NavLink.css';

function NavLink({link, nav}) {
    return (
        <button className='nav-link-btn'>{link}</button>
    )
}

export default NavLink