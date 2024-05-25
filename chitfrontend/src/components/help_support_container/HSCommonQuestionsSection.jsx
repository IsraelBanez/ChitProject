import React from 'react'
import './HSCommonQuestionsSection.css';

function HSCommonQuestionsSection({questions}) {
    return (
        <section className='hs-cq-section'>
            <h2>Common Questions</h2>

            {/* will become a map for the questions */}
            <div className='hs-questions-container'>
                <a href=''>Question about something that the user needs help for?</a>
                <a href=''>Question about something?</a>
                <a href=''>Question about user needs help for?</a>
                <a href=''>Question about something that the user needs help for?</a>
                <a href=''>Question about something?</a>
                <a href=''>Question about  the user needs help for?</a>
            </div>
        </section>
    )
}

export default HSCommonQuestionsSection