import React from 'react'
import './FriendsItem.css';

import UserProfileButton from '../buttons/UserProfileButton';
import MoreButton from '../buttons/MoreButton';

import TestUser from '../../images/test-user.jpg';

function FriendsItem() {
    return (
        <div className='friends-item'>
            <div className='fi-profile'>
                <UserProfileButton size={'medium'} image={TestUser}/>
                <div>
                    <h4>First Last</h4>
                    <a href=''>@Username</a>
                </div>
            </div>

            <MoreButton/>
        </div>
    )
}

export default FriendsItem