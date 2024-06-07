import React from 'react'
import './BCAHeader.css';

import SearchBarV2 from '../help_support_container/SearchBarV2';
import ArticleFilterButton from './ArticleFilterButton';

function BCAHeader() {
    return (
        <div className='bca-header'>
            <div className='bcah-search'>
                <SearchBarV2/>
            </div>

            <ArticleFilterButton title={'Topics'} width={'100px'}/>
            <ArticleFilterButton title={'Date'} width={'85px'}/>
        </div>
    )
}

export default BCAHeader