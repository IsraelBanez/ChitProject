import React from 'react'
import './TabButton.css';

function TabButton({title, isActive, onClick}) {
    return (
        <button className={`tab-btn ${isActive ? 'active' : ''}`} onClick={onClick}>
            {title}
        </button>
    )
}

export default TabButton