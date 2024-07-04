import './HomeContainer.css';

import SideBar from '../sidebar/SideBar.jsx';
import SearchMini from '../searchbar_mini/SearchMini.jsx'
import BookLogMini from '../booklog_mini/BookLogMini.jsx';
import TransactionHistoryMini from '../transaction_history_mini/TransactionHistoryMini.jsx';
import NetworkMini from '../network_mini/NetworkMini.jsx';

export default function HomeContainer(){

    return (
            <div className='hc-container'>
                {/* Profile sidebar content */}
                <aside>
                    <SideBar/>
                </aside>
     
                <main className='content'>
                    <div className='left-content'>
                        {/* Search bar content */}
                        <SearchMini/>
                        
                        {/* Book log content */}
                        <BookLogMini/>
                    </div>
                    
                    <div className='right-content'> 
                        {/* Transaction history content */}
                        <TransactionHistoryMini/>
                        
                        {/* Network content */}
                        <NetworkMini/>
                    </div>
                </main>
                
            </div>
    );
}