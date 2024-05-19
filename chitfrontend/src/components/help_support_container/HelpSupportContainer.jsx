import React from 'react'
import './HelpSupportContainer.css';

import HSHeaderSection from './HSHeaderSection.jsx';
import HSPopularLinksSection from './HSPopularLinksSection.jsx';

function HelpSupportContainer() {
    return (
        <main className='hs-container'>
            <HSHeaderSection/>
            <HSPopularLinksSection/>
        </main>
    )
}

export default HelpSupportContainer