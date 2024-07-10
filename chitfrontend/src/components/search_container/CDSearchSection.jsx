import React from 'react'

import SearchBarV1Input from '../inputs/SearchBarV1Input';

function CDSearchSection() {
    return (
        <section className='m-search-section'>
           <SearchBarV1Input size={'small'} placeholder="Name or username" /> 
        </section>
    )
}

export default CDSearchSection