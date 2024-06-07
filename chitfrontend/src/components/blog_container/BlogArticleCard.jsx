import React from 'react'
import './BlogArticleCard.css';

import TestImage4 from '../../images/test-blog-4.jpg';
import ReadMoreButton from '../buttons/ReadMoreButton';

function BlogArticleCard() {
    return (
        <div className='blog-article-card'>
            <div className='bac-top'>
                <img src={TestImage4} alt='test-blog'/>
            </div>
            <div className='bac-bottom'>
                <div className='bac-info'>
                    <div className='bac-topics'>topic</div>
                    <h3>Title</h3>
                    <h4>
                        Lorem ipsum dolor sitamet consectetur. Enim blanditim.
                    </h4>
                </div>
                <div className='bac-more'>
                    < ReadMoreButton/>
                    <h4>
                        Nov 14, 2024
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default BlogArticleCard