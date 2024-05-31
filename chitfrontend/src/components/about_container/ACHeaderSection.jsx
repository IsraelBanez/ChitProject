import React from 'react'
import './ACHeaderSection.css';

import TestImage1 from '../../images/test-about-1.jpg';

function ACHeaderSection() {
    return (
        <section className='ac-header-section'>            
            <h1>Get to Know Chit</h1>
            <div>
                <img src={TestImage1} alt='test-about'/>
            </div>
        </section>
    )
}

export default ACHeaderSection