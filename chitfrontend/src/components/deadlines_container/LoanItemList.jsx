import React from 'react'
import './LoanItemList.css';

import LoanItem from './LoanItem';

function LoanItemList() {
    return (
        <div className='loan-item-list'>
            <LoanItem/>
            <LoanItem/>
        </div>
    )
}

export default LoanItemList