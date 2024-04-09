import React from 'react'
import './FriendsListSection.css';

import FriendsItem from './FriendsItem';

function FriendsListSection() {
    return (
        <section className='friends-list-section'>
            <FriendsItem/>
            <FriendsItem/>
            <FriendsItem/>
        </section>
    )
}

export default FriendsListSection