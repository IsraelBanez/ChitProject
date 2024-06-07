import React from 'react'
import './BCFeaturedSection.css';

import FeaturedArticleCard from './FeaturedArticleCard';
import FeaturedArticleCardMini from './FeaturedArticleCardMini';
import TestImage2 from '../../images/test-blog-2.jpg';
import TestImage3 from '../../images/test-blog-3.jpg';
import TestImage5 from '../../images/test-blog-5.jpg';
import TestImage6 from '../../images/test-blog-6.jpg';

function BCFeaturedSection() {
    return (
        <section className='bc-featured-section'>
            <div className='bcf-left-region'>
                <FeaturedArticleCard/>
            </div>
            <div className='bcf-right-region'>
                <FeaturedArticleCardMini image={TestImage2}/>
                <FeaturedArticleCardMini image={TestImage3}/>
                <FeaturedArticleCardMini image={TestImage5}/>
                <FeaturedArticleCardMini image={TestImage6}/>
            </div>
        </section>
    )
}

export default BCFeaturedSection