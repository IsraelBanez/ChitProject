import React from 'react'
import './BlogContainer.css';


import BCFeaturedSection from './BCFeaturedSection';
import BCArticleSection from './BCArticleSection';
import BCSubscribeSection from './BCSubscribeSection';

function BlogContainer() {
    return (
        <main className='blog-container'>
            <section className='bc-header-section'><h1>Blog</h1></section>
            <BCFeaturedSection/>
            <BCArticleSection/>
            <BCSubscribeSection/>
        </main>
    )
}

export default BlogContainer