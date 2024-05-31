import React from 'react'
import './AboutContainer.css';

import ACHeaderSection from './ACHeaderSection';
import ACOurStorySection from './ACOurStorySection';
import ACOurTeamSection from './ACOurTeamSection';
import ACMoreInfoSection from './ACMoreInfoSection';

function AboutContainer() {
    return (
        <main className='about-container'>

            <ACHeaderSection/>
            <ACOurStorySection/>
            <ACOurTeamSection/>
            <ACMoreInfoSection/>
            
        </main>
    )
}

export default AboutContainer