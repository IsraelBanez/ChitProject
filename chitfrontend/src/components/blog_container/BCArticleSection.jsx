import React from 'react'
import './BCArticleSection.css';

import BCAHeader from './BCAHeader';
import BlogArticleCard from './BlogArticleCard';
import BlogPages from './BlogPages';

function BCArticleSection() {
    return (
        <section className='bc-article-section'>
            <BCAHeader/>
            
            <div className='bca-list'>
                <BlogArticleCard/>
                <BlogArticleCard/>
                <BlogArticleCard/>
                <BlogArticleCard/>
                <BlogArticleCard/>
                <BlogArticleCard/>
            </div>

            <BlogPages/>
        </section>
    )
}

export default BCArticleSection