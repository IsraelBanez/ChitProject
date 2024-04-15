import React from 'react'
import './LoanItem.css';

import LoanItemHeader from './LoanItemHeader';
import LoanItemFooter from './LoanItemFooter';

function LoanItem() {
    return (
        <div className='loan-item'>
            <LoanItemHeader />
            <LoanItemFooter />
        </div>
    )
}

export default LoanItem