import '../styles/component-styles/SideBar.css'

import TestUser from '../images/test-user.jpg';
import {ReactComponent as BookIcon} from '../icons/book.svg'; 
import {ReactComponent as TransactionIcon} from '../icons/transaction.svg';
import {ReactComponent as SearchIcon} from '../icons/search-small.svg';
import {ReactComponent as MessagesIcon} from '../icons/messages.svg';
import {ReactComponent as NotificationsIcon} from '../icons/notifications.svg';
import {ReactComponent as SettingsIcon} from '../icons/settings.svg';
import {ReactComponent as LogOutIcon} from '../icons/logout.svg';

export default function SideBar(){

    return (
            <div className='profile-sidebar'>
                {/* User Profile Section  */}
                <div className="user-profile">
                    <img src={TestUser} alt="User Profile Picture"/>
                    <h2>First Last</h2>
                    <h3>@Username</h3>
                </div>

                {/* User Currency Section */}
                <div className='currency'>
                    <h2>${0.0}</h2>
                    <a href=''>Manage Balance</a>
                </div>

                {/* Lending or Borrowing Button */}
                <button className='lend-borrow-btn'>Lend or Borrow</button>

                {/* Navigation Section */}
                <nav className="navigation">
                    <ul>
                        <li><button><BookIcon/>Book</button></li>
                        <li><button><TransactionIcon/>Transaction</button></li>
                        <li><button><SearchIcon/>Search</button></li>
                        <li><button><MessagesIcon/>Messages</button></li>
                        <li><button><NotificationsIcon/>Notifications</button></li>
                    </ul>

                    <ul>
                        <li><button><SettingsIcon/>Settings</button></li>
                        <li><button><LogOutIcon/>Log out</button></li>
                    </ul>
                </nav>
                        
            </div>
    );
}