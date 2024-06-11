import React from 'react'
import './HSMoreHelpSection.css';

import ContactUsButton from '../buttons/GlowButton.jsx';

function HSMoreHelpSection() {
    return (
        <section className='hs-mh-section'>
            <h2>Still Need Help?</h2>

            <div><ContactUsButton title={'Contact us'}/></div>
        </section>
    )
}

export default HSMoreHelpSection