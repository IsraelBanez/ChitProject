import React from 'react'
import './SideBarButton.css';

function SideBarButton ({icon: Icon, title}){
    return (
        <button className='sidebar-btn'><Icon/>{title}</button>
    )
}

export default SideBarButton