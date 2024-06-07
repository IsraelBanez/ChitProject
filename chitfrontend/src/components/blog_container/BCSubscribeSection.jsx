import React from 'react'
import './BCSubscribeSection.css';

import SubscribeInput from './SubscribeInput';

function BCSubscribeSection() {
    return (
        <section className='bc-subscribe-section'>
            <div>
                <h2>Subscribe to receive the latest</h2>
                <h4>No spam. We promise.</h4>
            </div>
            <SubscribeInput/>
        </section>
    )
}

export default BCSubscribeSection