import React from 'react'
import './HSPopularLinksSection.css';

import PopularLinksCard from './PopularLinksCard';

function HSPopularLinksSection() {
    return (
        <section className='hs-popular-links-section'>
            {/* will become a map for card image/title/ short description */}
            <PopularLinksCard/>
            <PopularLinksCard/>
            <PopularLinksCard/>
            <PopularLinksCard/>
            <PopularLinksCard/>
            <PopularLinksCard/>
        {/* <PopularLinksCard/> */}
        </section>
    )
}

export default HSPopularLinksSection