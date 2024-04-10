import React from 'react'
import './SearchAndRefineSection.css';

import SearchBar from '../inputs/SearchBar.jsx';
import AddFilterButton from '../buttons/AddFilterButton.jsx';
import SortByButton from '../buttons/SortByButton.jsx';
import CalendarCheckButton from '../buttons/CalendarCheckButton.jsx';
import QRCodeButton from '../buttons/QRCodeButton.jsx';

function SearchAndRefineSection({type}) {
    let searchComponent;
    let button1;
    let button2;

    switch (type) {
        case 'network':
            searchComponent = <SearchBar size={'small'} placeholder="Name or username" />;
            button1 = <CalendarCheckButton />;
            button2 = <QRCodeButton />;
            break;
        case 'messages':
            searchComponent = <SearchBar size={'medium'} placeholder="Search" />;
            button1 = null;
            button2 = null;
            break;
        default:
            searchComponent = <SearchBar size={'small'} placeholder="Search" />;
            button1 = <AddFilterButton />;
            button2 = <SortByButton />;
            break;
    }
    return (
        <div className='search-refine-section'>
            {searchComponent}
            {button1}
            {button2}
        </div>
    )
}

export default SearchAndRefineSection