import React from 'react'
import './MoreButtonV1.css';

import {ReactComponent as MoreIcon} from '../../icons/more.svg';

function MoreButtonV1({style}) {

    return (
        <button className='more-btn-v1' style={style}>
            <MoreIcon/>
        </button>
    )
}

export default MoreButtonV1