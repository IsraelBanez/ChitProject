import React from 'react'
import './BusinessFinancialSection.css';

import TestImage3 from '../../images/test-business-3.jpg';

import LearnMoreButton from '../buttons/GlowButton';

function BusinessFinancialSection() {
    return (
        <section className='business-financial-service-section'>
            <div >
                <h2>
                    Offer customers various financial
                    services
                </h2>
                <p>
                    Lorem ipsum dolor sitametconsectetur. Enim blanditim blandit
                    psum dolor sitam  Lorem ipsum dolor sitametconsectetu  
                </p>
                <LearnMoreButton title={'Learn More'}/>
            </div>
            <div>
                <img src={TestImage3} alt='business-test'/>
            </div>
        </section>
    )
}

export default BusinessFinancialSection