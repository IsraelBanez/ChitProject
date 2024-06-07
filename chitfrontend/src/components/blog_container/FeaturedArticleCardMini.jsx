import React from 'react'
import './FeaturedArticleCardMini.css';

import TestAuthor from '../../images/test-user.jpg';

function FeaturedArticleCardMini({image}) {
    return (
        <div className='feature-article-card-mini'>
            <div className='facm-left'>
                <div className='facm-topics'>topic</div>
                <h3>Title</h3>
                <h4>
                    Lorem ipsum dolor sitametconsectetur. Enim blanditim blandit  consectetur. Enim blandit 
                </h4>
                <div className='facm-author'>
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
            <div className='facm-right'>
                <img src={image} alt='test-blog'/>
            </div>
        </div>
    )
}

export default FeaturedArticleCardMini