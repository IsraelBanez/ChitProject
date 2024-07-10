import React from 'react'
import './LoanItemHeader.css';

import TestUser from '../../images/test-user.jpg';

import UserProfileButton from '../buttons/UserProfileButton';
import PayAmountButton from './PayAmountButton';
import MoreButton from '../buttons/MoreButtonV2';

function LoanItemHeader() {
    return (
        <div className='loan-item-header'>
            <div className='li-left-region'>
                <div className='li-l-header'>
                    <UserProfileButton size={'medium'} image={TestUser}/>
                    <h4>First Last</h4>
                </div>
                <div className='li-l-body'>
                    <h4>Amount: <span style={{fontWeight: '500', color: '#EDAB5E', fontFamily: 'Montserrat'}}>$0.00</span></h4>
                    <h4>Due date: <span style={{fontWeight: '500'}}>Nov 25, 2024</span></h4>
                </div>
            </div>
            <div className='li-right-region'>
                <PayAmountButton />
                <MoreButton />
            </div>
        </div>
    )
}

export default LoanItemHeader