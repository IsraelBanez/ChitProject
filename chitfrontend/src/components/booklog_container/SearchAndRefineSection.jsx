import React from 'react'
import './SearchAndRefineSection.css';

import SearchBar from '../inputs/SearchBar.jsx';
import AddFilterButton from '../buttons/AddFilterButton.jsx';
import SortByButton from '../buttons/SortByButton.jsx';

function SearchAndRefineSection() {
    return (
        <div className='search-refine-section'>
            
            <SearchBar size={'small'} placeholder="Search"/>

            <AddFilterButton/>

            <SortByButton/>
        </div>
    )
}

export default SearchAndRefineSection