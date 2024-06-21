import React from 'react'
import './SearchContainer.css';

import SearchAndRefineComponent from '../basics/SearchAndRefineComponent';
import CreditorsDebtorsSection from './CreditorsDebtorsSection';

function SearchContainer() {
    return (
        <section className='content-container'>
            <h1>Search</h1>

            <SearchAndRefineComponent type={'search'} />

            <CreditorsDebtorsSection version={'creditors'} />
            <CreditorsDebtorsSection version={'debtors'} />
        </section>
    )
}

export default SearchContainer