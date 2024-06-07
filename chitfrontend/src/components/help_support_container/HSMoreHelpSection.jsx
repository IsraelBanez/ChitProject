import React from 'react'
import './HSMoreHelpSection.css';

import ContactUsButton from '../buttons/ContactUsButton.jsx';

function HSMoreHelpSection() {
    return (
        <section className='hs-mh-section'>
            <h2>Still Need Help?</h2>

            <div><ContactUsButton/></div>
        </section>
    )
}

export default HSMoreHelpSection