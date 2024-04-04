import React from 'react'
import './SearchBar.css';

import {ReactComponent  as SearchIcon} from '../../icons/search-icon.svg';

function SearchBar({size, placeholder}) {
    let barWidth;
    let barHeight;

    switch (size) {
        case 'small':
            barWidth = '450px';
            barHeight = '35px';
            break;
        case 'large':
            barWidth = '100%';
            barHeight = '50px';
            break;
        default:
            barWidth = '100%';
            barHeight = '50px';
            break;
    }

    return (
        <div className='search-bar-inpt' style={{maxWidth: barWidth, height: barHeight}}>
            <input type="search" placeholder={placeholder}>
            </input> 
            <button>
                <SearchIcon/>
            </button>
        </div>
    )
}

export default SearchBar