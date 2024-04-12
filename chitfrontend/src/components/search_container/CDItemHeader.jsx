import React from 'react'
import './CDItemHeader.css';

import AddFilterButton from '../buttons/AddFilterButton';
import SortByButton from '../buttons/SortByButton';

function CDItemHeader({sectionTitle}) {
    return (
        <div className='cd-header'>
            <h2>{sectionTitle}</h2>

            <AddFilterButton/>
            <SortByButton/>
        </div>
    )
}

export default CDItemHeader