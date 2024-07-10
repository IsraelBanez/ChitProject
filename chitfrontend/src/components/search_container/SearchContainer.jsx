import React from 'react'
import './SearchContainer.css';

import CDSearchSection from './CDSearchSection';
import CreditorsDebtorsSection from './CreditorsDebtorsSection';

function SearchContainer() {
    return (
        <main className='content-container'>
            <h1>Search</h1>

            <CDSearchSection/>

            <CreditorsDebtorsSection version={'creditors'} />
            <CreditorsDebtorsSection version={'debtors'} />
        </main>
    )
}

export default SearchContainer