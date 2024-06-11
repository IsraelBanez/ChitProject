import React from 'react'
import './BusinessContactSection.css';

import ContactUsButton from '../buttons/GlowButton';

function BusinessContactSection() {
    return (
        <section className='business-contact-section'>
            <h2>Build Success with Chit</h2>
            <div><ContactUsButton title={'Contact us'}/></div>
        </section>
    )
}

export default BusinessContactSection