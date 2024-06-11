import React from 'react'
import './BusinessHeaderSection.css';

import TestImage7 from '../../images/test-business-7.jpg';
import TestImage8 from '../../images/test-business-8.jpg';

function BusinessHeaderSection() {
  return (
    <section className='bus-header-section'>
        <h1>Build your Business<br/> with Chit</h1>
        <p>
            Lending made Simple and Secure for Family, Friends <br/>
            and Business across the world.
        </p>
        <div className='bus-header-img-container'>
            <div>
              <img src={TestImage7} alt='test-business'/>
            </div>
            <div>
              <img src={TestImage7} alt='test-business'/>
            </div>
            <div >
              <img src={TestImage7} alt='test-business'/>
            </div>
            <div>
              <img src={TestImage8} alt='test-business'/>
            </div>
            
        </div>
    </section>
  )
}

export default BusinessHeaderSection