import React from 'react'
import './ReadMoreButton.css'

import {ReactComponent as RightArrowIcon} from '../../icons/right-arrow.svg';

function ReadMoreButton() {
    return (
        <button className='read-more-btn'>
            Read more
            <div>
                <RightArrowIcon/>
            </div>
        </button>
    )
}

export default ReadMoreButton