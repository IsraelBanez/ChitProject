import React from 'react'
import './HelpSupportContainer.css';

import HSHeaderSection from './HSHeaderSection.jsx';
import HSPopularLinksSection from './HSPopularLinksSection.jsx';
import HSCommonQuestionsSection from './HSCommonQuestionsSection.jsx';
import HSPopularArticlesSection from './HSPopularArticlesSection.jsx';
import HSMoreHelpSection from './HSMoreHelpSection.jsx';

function HelpSupportContainer() { // 0 gap between nav &header | 30 gaps for between elements |50 for footer 
    return (
        <main className='hs-container'>
            <HSHeaderSection/>
            <HSPopularLinksSection/>
            <HSCommonQuestionsSection/>
            <HSPopularArticlesSection/>
            <HSMoreHelpSection/>
        </main>
    )
}

export default HelpSupportContainer