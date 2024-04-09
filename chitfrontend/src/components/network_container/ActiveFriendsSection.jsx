import React from 'react'
import './ActiveFriendsSection.css';

import ActiveFriendButton from './ActiveFriendButton';

function ActiveFriendsList() {
    return (
        <section className='active-friends-section'>
            <ActiveFriendButton version={'new-friend'}/>
            <ActiveFriendButton version={'current-friend'}/>
            <ActiveFriendButton version={'current-friend'}/>
            <ActiveFriendButton version={'current-friend'}/>
            <ActiveFriendButton version={'current-friend'}/>
        </section>
    )
}

export default ActiveFriendsList