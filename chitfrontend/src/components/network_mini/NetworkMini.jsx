import './NetworkMini.css'

import UserProfileButton from '../buttons/UserProfileButton.jsx';
import AddUsersButton from '../buttons/AddUsersButton.jsx';

import TestUser from '../../images/test-user.jpg';

export default function Network(){

    return (
            <div className='network'>
                <h1>Network</h1>
                <div className="network-list">
                    <ul>
                        <AddUsersButton/> 
                        <UserProfileButton size={'medium'} image={TestUser}/>
                        <UserProfileButton size={'medium'} image={TestUser}/>
                    </ul>
                    {/* <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                <img src={user.image} alt={`User ${user.id}`} />
                            </li>
                        ))}
                    </ul> */}
                </div>
                                
            </div>
    );
}