import React from 'react'
import './CDItemHeader.css';

import AddFilterButton from '../buttons/AddFilterButton';
import SortByButton from '../buttons/SortByButton';

function CDItemHeader({sectionTitle}) {
    return (
        <div className='cd-header'>
            <div>
                <h2>{sectionTitle}</h2>
            </div>

            <div>
                <AddFilterButton/>
                <SortByButton/>
            </div>
        </div>
    )
}

export default CDItemHeader