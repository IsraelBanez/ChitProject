import React from 'react'

import NavBar from '../../components/navbar/NavBar.jsx';
import SideBar from '../../components/sidebar/SideBar.jsx';
import TransactionHistoryContainer from '../../components/transaction_history_container/TransactionHistoryContainer.jsx';

function TransactionHistory() {
    return (
        <div>
            <nav className='nav-section'>
                <NavBar/>
            </nav>

            <main className='hc-container'>
                {/* Profile sidebar content */}
                <aside>
                    <SideBar/>
                </aside>
                
                <TransactionHistoryContainer/>
            </main>
        </div>
    )
}

export default TransactionHistory