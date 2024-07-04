import React, { useState } from 'react';
import './SearchAndRefineComponent.css';

import SearchBar from '../inputs/SearchBarV1Input.jsx';

import AddFilterButton from '../buttons/AddFilterButton.jsx';
import SortByButton from '../buttons/SortByButton.jsx';
import CalendarCheckButton from '../buttons/CalendarCheckButton.jsx';
import QRCodeButton from '../buttons/QRCodeButton.jsx';

import SortByOptionsPopUp from '../pop-ups/SortByOptionsPopUp.jsx';

function SearchAndRefineComponent({type, page}) {
    const [displayOptions, setDisplayOptions] = useState(false);
    
    let searchComponent;
    let button1;
    let button2;

    let sortOptions = [];

    const toggleSortByOptions = () => {
        setDisplayOptions(!displayOptions);
    };

    switch (page){
        case 'book-log':
            sortOptions = ['Account', 'Date', 'Deadline'];
        case 'transaction-history':
            sortOptions = ['Account +', 'Account -', 'Date'];
        case 'search-creditor':
            sortOptions = ['Score', 'Offering', 'Rating'];
        case 'search-debtor':
            sortOptions = ['Score', 'Requesting', 'Rating'];
        case 'deadline':
            sortOptions = ['Account', 'Deadline'];
        default:
            sortOptions = [];
    }

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
        case 'search':
            searchComponent = <SearchBar size={'medium'} placeholder="Name or username" />;
            button1 = null;
            button2 = null;
            break;
        default:
            searchComponent = <SearchBar size={'small'} placeholder="Search" />;
            button1 = <AddFilterButton />;
            button2 = (
                <div className='sort-by-container'>
                    <SortByButton onClick={toggleSortByOptions}/>
                    {displayOptions && <SortByOptionsPopUp />}
                </div>
            );
            break;
    }
    return (
        <div className='search-refine-component'>
            <div className='src-search-section'>
                {searchComponent}
            </div>
          
            <div className='src-refine-section'>
                <div>
                    {button1}
                </div>
                <div>
                    {button2}
                </div>
            </div>
        </div>
    )
}

export default SearchAndRefineComponent