import React from 'react'
import './SearchBar.css';

import {ReactComponent  as SearchIcon} from '../../icons/search-icon.svg';

function SearchBar() {
    return (
        <div className='search-bar-inpt'>
            <input type="search" placeholder="Name or username">
            </input> 
            <button>
                <SearchIcon/>
            </button>
        </div>
    )
}

export default SearchBar