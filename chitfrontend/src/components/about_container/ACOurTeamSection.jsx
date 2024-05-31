import React from 'react'
import './ACOurTeamSection.css';

import TestImage3 from '../../images/test-about-3.jpg';

import ExploreOpsBtn from './ExploreOpsButton.jsx';

function ACOurTeamSection() {
    return (
        <section className='ac-our-team-section'>
            <div className='ac-team-content'>
                <h2>Our Team</h2>
                <p>
                Lorem ipsum dolor sitamet consectetur. 
                Enim blandit magnis
                maecenas amet ultrices tellus
                proin viverra.
                </p>
                <div className='ac-team-btn'>
                    <ExploreOpsBtn/>
                </div>
            </div>
            <div className='ac-team-img'>
                <img src={TestImage3} alt='test-about' />
            </div>
        </section>
    )
}

export default ACOurTeamSection