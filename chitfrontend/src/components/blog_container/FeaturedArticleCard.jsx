import React from 'react'
import './FeaturedArticleCard.css';

import TestImage1 from '../../images/test-blog-1.jpg';
import TestAuthor from '../../images/test-user.jpg';

function FeaturedArticleCard() {
    return (
        <div className='feature-article-card'>
            <div className='fac-top'>
                <img src={TestImage1} alt='test-blog'/>
            </div>
            <div className='fac-bottom'>
                <div className='facb-topics'>topic</div>
                <h3>Title</h3>
                <h4>
                    Lorem ipsum dolor sitametconsectetur. Enim blanditim blandit  consectetur. Enim blandit 
                    Mi placerat orci ac aliquam mauris.
                </h4>
                <div className='facb-author'>
                    <img src={TestAuthor} alt='author-profile'/>
                    <div>
                        <h4>
                            author
                        </h4>
                        <h4>
                            Nov 14, 2024
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedArticleCard