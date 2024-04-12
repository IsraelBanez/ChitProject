import React from 'react'
import './CDItem.css';

import UserProfileButton from '../buttons/UserProfileButton';

import TestUser from '../../images/test-user.jpg';

function CDItem({version}) {
    let transactionType;

    switch (version) {
        case 'creditors':
            transactionType = 'Offering';
            break;
        case 'debtors':
            transactionType = 'Requesting';
            break;
        default:
            transactionType = 'Transaction';
            break;
    };

    return (
        <div className='cd-item'>
            <UserProfileButton  size={'small'} image={TestUser}/>
            <div className='cd-item-info'> 
                <h4 className='cd-item-name'>First Last</h4>
                <h4 className='cd-item-rate'>Rating : <span>Bronze</span></h4>
                <h4 className='cd-item-score'>Score : 600</h4>
                <h4 className='cd-item-transaction'>{transactionType} : <span>$2,000</span></h4>
            </div>
        </div>
    )
}

export default CDItem