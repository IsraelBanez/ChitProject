import React from 'react'
import './SearchAndRefineSection.css';

import SearchBar from '../inputs/SearchBar.jsx';
import AddFilterButton from '../buttons/AddFilterButton.jsx';
import SortByButton from '../buttons/SortByButton.jsx';
import CalendarCheckButton from '../buttons/CalendarCheckButton.jsx';
import QRCodeButton from '../buttons/QRCodeButton.jsx';

function SearchAndRefineSection({type}) {
    return (
        <div className='search-refine-section'>
            
            <SearchBar size={'small'} placeholder="Search"/>

            {type == 'network' ? <CalendarCheckButton/> : <AddFilterButton/> }

            {type == 'network' ? <QRCodeButton/> : <SortByButton/>}
        </div>
    )
}

export default SearchAndRefineSection