import React from 'react'
import './HSPopularArticlesSection.css';

import SlidingWindow from './SlidingWindow';

function HSPopularArticlesSection() {
    return (
        <section className='hs-pa-section'>
            <h2>Popular Articles</h2>

            <SlidingWindow/>
        </section>
    )
}

export default HSPopularArticlesSection