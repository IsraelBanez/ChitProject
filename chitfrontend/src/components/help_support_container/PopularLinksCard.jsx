import React from 'react'
import './PopularLinksCard.css';

import FillerImg from '../../images/test-help-1.jpg';

function PopularLinksCard() {
    return (
        <div className='popular-links-card' style={{backgroundImage: `url(${FillerImg})`}}>
            <div className='plc-content'>
                <h3>
                    Link Title
                </h3>
                <h4>
                    short description
                </h4>
            </div>
        </div>
    )
}

export default PopularLinksCard