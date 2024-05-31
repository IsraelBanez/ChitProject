import React from 'react'
import './ExploreOpsButton.css'

import {ReactComponent as RightArrowIcon} from '../../icons/right-arrow.svg';

function ExploreOpsButton() {
    return (
        <button className='explore-ops-btn'>
            Explore opportunities
            <div>
                <RightArrowIcon/>
            </div>
        </button>
    )
}

export default ExploreOpsButton