import React from 'react'
import './MoreButtonV2.css';

import {ReactComponent as MoreIcon} from '../../icons/more.svg';

function MoreButtonV2({style}) {

    return (
        <button className='more-btn-v2' style={style}>
            <MoreIcon/>
        </button>
    )
}

export default MoreButtonV2