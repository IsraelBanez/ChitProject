import React from 'react'
import './PageNavButton.css';

function PageNavButton({title}) {
    return (
        <button className='page-nav-btn'>{title}</button>
    )
}

export default PageNavButton