import React from 'react'
import './ActiveFriendButton.css';

import AddUsersButton from '../buttons/AddUsersButton';
import UserProfileButton from '../buttons/UserProfileButton';

import TestUser from '../../images/test-user.jpg';

function ActiveFriendButton({version}) {
    let backgroundColor;

    switch (version) {
        case 'new-friend':
            backgroundColor = '#CDC1FF';  
            break;
        case 'current-friend':
            backgroundColor = '#f9f9f9';
            break;
        default:
            backgroundColor = '#f9f9f9';
            break;
    };
    
    return (
        <button className='active-friend-btn' style={{backgroundColor: backgroundColor}}>
            { version == 'current-friend' ? <UserProfileButton size={'medium'} image={TestUser}/> : <AddUsersButton type={'network'}/>}

            <div className='af-info'>
                {version == 'current-friend' 
                ? 
                <>
                    <h4>First Last Long</h4> 
                    <h4 className='acb-amount'>+$0.00</h4>
                </>
                : <h4 style={{color: '#fff'}}>Add Friend</h4>}
            </div>
        </button>
    )
}

export default ActiveFriendButton