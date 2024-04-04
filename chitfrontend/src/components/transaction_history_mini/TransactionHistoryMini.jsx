import './TransactionHistoryMini.css'

import TestUser from '../../images/test-user.jpg';

import THMTableHeader from './THMTableHeader.jsx';
import THMTableRow from './THMTableRow.jsx';

export default function TransactionHistory(){

    return (
        <div className='transaction-history-mini'>
            <h1>Transaction</h1>

            <div className='t-table-container'>
                <THMTableHeader/>
                <div className='t-table-body'>
                    <THMTableRow/>
                    <THMTableRow/>
                </div>
            </div>
                            
        </div>
    );
}