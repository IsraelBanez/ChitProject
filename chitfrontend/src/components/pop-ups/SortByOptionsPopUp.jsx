import React from 'react'
import './SortByOptionsPopUp.css';

function SortByOptionButton ({title}){
    return(
    <button className='sort-by-options-btn'>
        {title}
    </button>
    )
}

function SortByOptionsPopUp({titles}) {
    return (
        <div className='sort-by-options-pu'>
            <SortByOptionButton title={'head'}/>
        
        </div>
    )
}

export default SortByOptionsPopUp