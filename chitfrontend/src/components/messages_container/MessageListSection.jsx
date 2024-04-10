import React from 'react'
import './MessageListSection.css';

import FriendsItem from '../basics/InfoItem';

function MessageListSection() {
    return (
        <section className='message-list-section'>
            <MessageItem/>
            <FriendsItem/>
        </section>

    )
}

export default MessageListSection