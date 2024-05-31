import React from 'react'
import './ACOurStorySection.css';

import TestImage2 from '../../images/test-about-2.jpg';

function ACOurStorySection() {
    return (
        <section className='ac-our-story-section'>
            <div className='ac-story-img'>
                <img src={TestImage2} alt='test-about'/>
            </div>
            <div className='ac-story-content'>
                <h2>Our Story</h2>
                <p>
                    Lorem ipsum dolor sitamet consectetur.
                    Enim blandit magnis
                    maecenas amet ultrices tellus
                    proin viverra. Dui imperdiet 
                    tellus a elit nunc parturient quisque. 
                    Vitae sit ut amet risus semper interdum
                    vulputate id. Mi placerat orci ac
                    aliquam mauris.
                </p>
                <p>
                    Lorem ipsum dolor sitamet consectetur.
                    Enim blandit magnis
                    maecenas amet ultrices tellus
                    proin viverra. Dui imperdiet 
                    tellus a elit nunc parturient quisque. 
                    Vitae sit ut amet risus semper interdum
                    vulputate id. Mi placerat orci ac
                    aliquam mauris.
                </p>
            </div>
        </section>
    )
}

export default ACOurStorySection