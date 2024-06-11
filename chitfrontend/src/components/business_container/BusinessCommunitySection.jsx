import React from 'react'
import './BusinessCommunitySection.css';

import TestImage4 from '../../images/test-business-4.jpg';

import LearnMoreButton from '../buttons/GlowButton';

function BusinessCommunitySection() {
    return (
        <section className='business-community-section'>
            <div>
                <img src={TestImage4} alt='business-test'/>
            </div>
            <div >
                <h2>
                    Create online and in person
                    payments 
                </h2>
                <p>
                    Lorem ipsum dolor sitametconsectetur. Enim blanditim blandit
                    psum dolor sitam  Lorem ipsum dolor sitametconsectetu  
                </p>
                <LearnMoreButton title={'Learn More'}/>
            </div>
            <div>
                <img src={TestImage4} alt='business-test'/>
            </div>

        </section>
    )
}

export default BusinessCommunitySection