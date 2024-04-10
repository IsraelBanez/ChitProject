import React from 'react'
import './InfoItem.css';

import UserProfileButton from '../buttons/UserProfileButton';
import MoreButton from '../buttons/MoreButton';

import TestUser from '../../images/test-user.jpg';

import {ReactComponent as DividingDotIcon} from '../../icons/dividing-dot.svg';

function InfoItem({type}) {
    let itemInfo;

    switch (type) {
        case 'network':
            itemInfo = <a href=''>@Username</a>
            break;
        case 'messages':
            itemInfo = <div className='message-info'><h4>"Last said"</h4><DividingDotIcon/><h4 style={{textIndent: '0px'}}>Time</h4></div>
            break;
        default:
            itemInfo = <a href=''>@Username</a>
            break;

    };

    return (
        <div className='friends-item'>
            <div className='fi-profile'>
                <UserProfileButton size={'medium'} image={TestUser}/>
                <div>
                    <h4>First Last</h4>
                    {itemInfo}
                </div>
            </div>

            <MoreButton/>
        </div>
    )
}

export default InfoItem