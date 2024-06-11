import React from 'react'
import './ACHeaderSection.css';

import TestImage7 from '../../images/test-about-7.jpg';
import TestImage8 from '../../images/test-about-8.jpg';
import TestImage9 from '../../images/test-about-9.jpg';

function ACHeaderSection() {
    return (
        <section className='ac-header-section'>            
            <h1>Get to Know Chit</h1>
            <div className='ac-header-img-container'>
                <div >
                    <img src={TestImage9} alt='test-about'/>
                </div>
                <div>
                    <img src={TestImage7} alt='test-about'/>
                </div>
                <div>
                    <img src={TestImage8} alt='test-about'/>
                </div>
            </div>
 
        </section>
    )
}

export default ACHeaderSection