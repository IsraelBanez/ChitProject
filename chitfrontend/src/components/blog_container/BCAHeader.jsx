import React from 'react'
import './BCAHeader.css';

import SearchBarV2Input from '../inputs/SearchBarV2Input';
import ArticleFilterButton from './ArticleFilterButton';

function BCAHeader() {
    return (
        <div className='bca-header'>
            <div className='bcah-search'>
                <SearchBarV2Input/>
            </div>

            <ArticleFilterButton title={'Topics'} width={'100px'}/>
            <ArticleFilterButton title={'Date'} width={'85px'}/>
        </div>
    )
}

export default BCAHeader