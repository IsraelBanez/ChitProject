import React from 'react'
import './HSHeaderSection.css';

import SearchBarV2 from './SearchBarV2';


function HSHeader() {
    return (
        <section className='hs-header-section'>   
            <div className='hs-header-content'>
                <h1>Hello, how can we help?</h1>
                <div className='hs-header-search'><SearchBarV2/></div>
            </div>
        </section>
    )
}

export default HSHeader