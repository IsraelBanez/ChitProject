import '../styles/component-styles/TransactionHistory.css'

import TestUser from '../images/test-user.jpg';

export default function TransactionHistory(){

    return (
            <div className='transaction-history'>
                <h1>Transaction</h1>

                <div className='t-table-container'>
                    <div className='t-table-header'>
                        <div className='t-th-cell-user'>User</div>
                        <div className='t-th-cell-info'>Info</div>
                        <div className='t-th-cell-amount'>Amount</div>
                    </div>
                    <div className='t-table-body'>
                        <div className='t-table-row'>
                            <div className='t-tb-cell-user'>
                                <img src={TestUser} alt="User Profile Picture"/>
                            </div>
                            <div className='t-tb-cell-info'>
                                <span className='t-type'>You paid User</span>
                                <span className='t-time'>Today</span>
                                <span className='t-reason'>Poker</span>
                            </div>
                            <div className='t-tb-cell-amount'><span>+$0.00</span></div>
                        </div>
                        <div className='t-table-row'>
                            <div className='t-tb-cell-user'>
                                <img src={TestUser} alt="User Profile Picture"/>
                            </div>
                            <div className='t-tb-cell-info'>
                                <span className='t-type'>User paid you</span>
                                <span className='t-time'>Yesterday</span>
                                <span className='t-reason'>Poker</span>
                            </div>
                            <div className='t-tb-cell-amount'><span>-$0.00</span></div>
                        </div>
                    </div>
                </div>
                                
            </div>
    );
}