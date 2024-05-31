import React from 'react'
import './MoreInfoCard.css';

import ReadMoreButton from '../buttons/ReadMoreButton';



function MoreInfoCard({image, title, description}) {
    return (
        <div className='more-info-card'>
            <div className='mic-top'>
                <img src={image} alt='test-about' />
            </div>
            <div className='mic-bottom'>
                <h3>{title}</h3>
                <h4>
                    {description}
                </h4>
                <ReadMoreButton/>
            </div>
        </div>
    )
}

export default MoreInfoCard