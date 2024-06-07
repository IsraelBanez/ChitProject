import React from 'react'
import './ArticleFilterButton.css';

import {ReactComponent as DownArrow} from '../../icons/down-arrow.svg';

function ArticleFilterButton({title, width}) {
    return (
        <button className='article-filter-btn' style={{width:width}}>{title} <DownArrow/></button>
    )
}

export default ArticleFilterButton