import React from 'react'
import './SearchContainer.css';

import SearchAndRefineSection from '../basics/SearchAndRefineSection';
import CreditorsDebtorsSection from './CreditorsDebtorsSection';

import {ReactComponent as SearchIcon} from '../../icons/search-icon.svg';

function SearchContainer() {
    return (
        <section className='search-container'>
            <h1>Search</h1>

            <SearchAndRefineSection type={'search'} />

            <CreditorsDebtorsSection version={'creditors'} />
            <CreditorsDebtorsSection version={'debtors'} />
        </section>
    )
}

export default SearchContainer