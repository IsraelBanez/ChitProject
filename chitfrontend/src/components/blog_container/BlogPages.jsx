import React from 'react'
import './BlogPages.css';

import PageNavButton from './PageNavButton';

function BlogPages() {
    return (
        <div className='blog-pages'>
            <PageNavButton title={'prev'}/>
            <div className='bp-page-control'>
                <button className='bp-page-btn'>1</button>
                <button className='bp-page-btn'>2</button>
                <button className='bp-page-btn'>3</button>
                <button className='bp-page-btn'>4</button>
            </div>
            <PageNavButton title={'next'}/>
        </div>
    )
}

export default BlogPages