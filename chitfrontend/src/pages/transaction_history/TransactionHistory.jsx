import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import TransactionHistoryContainer from '../../components/transaction_history_container/TransactionHistoryContainer.jsx';

function TransactionHistory() {
    return (
        <div className='signed-in-container'>
            <NavBar/>

            <div className='hc-container'>
                {/* Profile sidebar content */}
             
                <SideBar/>
        
                
                <TransactionHistoryContainer/>
            </div>
        </div>
    )
}

export default TransactionHistory