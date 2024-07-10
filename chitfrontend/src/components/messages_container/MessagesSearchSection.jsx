import React from 'react'

import SearchBarV1Input from '../inputs/SearchBarV1Input';

function MessagesSearchSection() {
    return (
        <section className='m-search-section'>
           <SearchBarV1Input size={'small'} placeholder="Search" /> 
        </section>
    )
}

export default MessagesSearchSection