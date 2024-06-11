import React from 'react'
import './BusinessPaymentSection.css';

import TestImage2 from '../../images/test-business-2.jpg';

import LearnMoreButton from '../buttons/GlowButton';

function BusinessPaymentSection() {
    return (
        <section className='business-payment-section'>
            <div>
                <img src={TestImage2} alt='business-test'/>
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

        </section>
    )
}

export default BusinessPaymentSection