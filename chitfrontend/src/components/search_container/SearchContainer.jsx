import React from 'react'
import './SearchContainer.css';

import SearchAndRefineSection from '../basics/SearchAndRefineSection';
import CreditorsDebtorsSection from './CreditorsDebtorsSection';

function SearchContainer() {
    return (
        <section className='content-container'>
            <h1>Search</h1>

            <SearchAndRefineSection type={'search'} />

            <CreditorsDebtorsSection version={'creditors'} />
            <CreditorsDebtorsSection version={'debtors'} />
        </section>
    )
}

export default SearchContainer