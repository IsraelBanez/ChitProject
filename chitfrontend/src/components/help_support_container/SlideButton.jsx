import React from 'react'
import './SlideButton.css';

import {ReactComponent as DownArrow} from '../../icons/down-arrow.svg';

function SlideButton({ version, onClick }) {
    return (
        <button 
            className='slide-btn' 
            style={{
                rotate: version == 'left'? '90deg' : '-90deg', 
                padding: version == 'left'? 'padding: 7px 1px 5px 1px' : 'padding: 5px 1px 7px 1px',
            }} 
            onClick={onClick}
        >
            <DownArrow/>
        </button>
    )
}

export default SlideButton