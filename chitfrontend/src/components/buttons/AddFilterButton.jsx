import React from 'react'
import './AddFilterButton.css';

import {ReactComponent as AddFilterIcon} from '../../icons/add-filter.svg';

function AddFilterButton() {
    return (
        <button className='add-filter-btn'>
            <AddFilterIcon/>
            Add filter
        </button>
    )
}

export default AddFilterButton