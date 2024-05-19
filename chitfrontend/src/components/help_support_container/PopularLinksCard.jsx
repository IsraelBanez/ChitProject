import React from 'react'
import './PopularLinksCard.css';

import FillerImg from '../../images/filler-img.svg';

function PopularLinksCard() {
    return (
        <div className='popular-links-card'>

            {/* <img src={FillerImg} alt='filler' /> */}

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