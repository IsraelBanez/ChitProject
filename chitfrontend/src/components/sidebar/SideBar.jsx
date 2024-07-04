import './SideBar.css'

import {ReactComponent as BookIcon} from '../../icons/book.svg'; 
import {ReactComponent as NetworkIcon} from '../../icons/network.svg'; 
import {ReactComponent as TransactionIcon} from '../../icons/transaction.svg';
import {ReactComponent as SearchIcon} from '../../icons/search-small.svg';
import {ReactComponent as MessagesIcon} from '../../icons/messages.svg';
import {ReactComponent as DeadlinesIcon} from '../../icons/deadlines.svg'; 
import {ReactComponent as RemindersIcon} from '../../icons/reminders.svg'; 
import {ReactComponent as NotificationsIcon} from '../../icons/notifications.svg';
import {ReactComponent as SettingsIcon} from '../../icons/settings.svg';
import {ReactComponent as LogOutIcon} from '../../icons/logout.svg';

import LendBorrowButton from '../buttons/LendBorrowButton';
import UserProfileButton from '../buttons/UserProfileButton';
import ManageBalanceButton from './ManageBalanceButton';
import SideBarButton from './SideBarButton';

import TestUser from '../../images/test-user.jpg';

export default function SideBar(){

    return (
            <aside className='profile-sidebar'>
                {/* User Profile Section  */}
                <div className="user-profile">
                    <UserProfileButton size={'large'} image={TestUser}/>
                    <h2>First Last</h2>
                    <h3>@Username</h3>
                </div>

                {/* User Currency Section */}
                <div className='currency'>
                    <h2>${0.0}</h2>
                    <ManageBalanceButton/>
                </div>

                {/* Lending or Borrowing Button */}
                <LendBorrowButton/>

                {/* Navigation Section */}
                <nav className='navigation'>
                    <ul>
                        <SideBarButton icon={BookIcon} title="Book"/>
                        <SideBarButton icon={NetworkIcon} title="Network"/>
                        <SideBarButton icon={TransactionIcon} title="Transaction"/>
                        <SideBarButton icon={SearchIcon} title="Search"/>
                        <SideBarButton icon={MessagesIcon} title="Messages"/>
                        <SideBarButton icon={DeadlinesIcon} title="Deadlines"/>
                        <SideBarButton icon={RemindersIcon} title="Reminders"/>
                        <SideBarButton icon={NotificationsIcon} title="Notifications"/>
                    </ul>

                    <ul>
                        <SideBarButton icon={SettingsIcon} title="Settings"/>
                        <SideBarButton icon={LogOutIcon} title="Log out"/>
                    </ul>
                </nav>
                        
            </aside>
    );
}