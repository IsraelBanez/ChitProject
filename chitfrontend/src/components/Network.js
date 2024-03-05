import '../styles/component-styles/Network.css'

import AddUser from '../icons/add-user-icon.svg';
import TestUser from '../images/test-user.jpg';

export default function Network(){

    return (
            <div className='network'>
                <h1>Network</h1>
                <div className="network-list">
                    <ul>
                        <li>
                            <img src={AddUser} alt="Add to network icon"/>
                        </li>
                        <li>
                            <img  className='network-friend-profile' src={TestUser} alt="User friend's profile image"/>
                        </li>
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