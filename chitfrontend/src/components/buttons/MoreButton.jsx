import React from 'react'
import './MoreButton.css';

import {ReactComponent as MoreIcon} from '../../icons/more.svg';

function MoreButton({version}) {
    let backgroundColor;

    switch (version) {
        case 'transparent':
            backgroundColor = 'transparent';
            break;
        default:
            backgroundColor = '#F5EFFF';
            break;
    };

    return (
        <button className='more-btn' style={{backgroundColor: backgroundColor}}>
            <MoreIcon/>
        </button>
    )
}

export default MoreButton