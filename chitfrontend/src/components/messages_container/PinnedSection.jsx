import React from 'react'
import './PinnedSection.css';

import UserProfileButton from '../buttons/UserProfileButton';

import TestUser from '../../images/test-user.jpg';

function PinnedSection() {
    return (
        <section className='pinned-section'>
            <h3>Pinned</h3>
            <ul>
                <UserProfileButton size={'medium'} image={TestUser}/>
                <UserProfileButton size={'medium'} image={TestUser}/>
                <UserProfileButton size={'medium'} image={TestUser}/>
            </ul>
        </section>
    )
}

export default PinnedSection