import React from 'react'
import './ArticleCard.css';

import FillerImg from '../../images/test-help-2.jpg';

function ArticleCard() {
    return ( 
        <div className='article-card' style={{backgroundImage: `url(${FillerImg})`}}>
            <h3>Article Title</h3>

            <h4>short article intro...</h4>
        </div>
    )
}

export default ArticleCard