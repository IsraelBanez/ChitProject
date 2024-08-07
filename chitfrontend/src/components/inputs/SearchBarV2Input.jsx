import React from 'react'
import './SearchBarV2Input.css';

import {ReactComponent  as SearchIcon} from '../../icons/search-icon.svg';

function SearchBarV2Input() {
    return (
        <div className='search-bar-v2-inpt'>
            <input type="search" placeholder='Search'></input> 

            <div className='sb-v2-dividor'></div>

            <button>
                <SearchIcon/>
            </button>
        </div>
    )
}

export default SearchBarV2Input