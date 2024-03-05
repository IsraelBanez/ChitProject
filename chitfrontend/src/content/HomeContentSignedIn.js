import '../styles/HomeContentSignedIn.css';

import SideBar from '../components/SideBar.js';
import SearchBar from '../components/SearchBar.js'
import BookLog from '../components/BookLog.js';
import TransactionHistory from '../components/TransactionHistory.js';
import Network from '../components/Network.js';

export default function HomeContentSignedIn(){

    return (
            <main className='hcsi-container'>
                {/* Profile sidebar content */}
                <SideBar/>
                
                {/* Search bar content */}
                <section className='content'>
                    <div className='left-content'>
                        {/* Search bar content */}
                        <SearchBar/>
                        
                        {/* Book log content */}
                        <BookLog/>
                    </div>
                    
                    <div className='right-content'> 
                        {/* Transaction history content */}
                        <TransactionHistory/>
                        
                        {/* Network content */}
                        <Network/>
                    </div>
                </section>
                
            </main>
    );
}