import React from 'react'
import './InfoItem.css';

import UserProfileButton from '../buttons/UserProfileButton';
import MoreButton from '../buttons/MoreButton';

import TestUser from '../../images/test-user.jpg';

import {ReactComponent as DividingDotIcon} from '../../icons/dividing-dot.svg';

function InfoItem({type}) {
    let itemInfo;
    let itemHeader;

    switch (type) {
        case 'network':
            itemHeader = <h4 className='default-header'>First Last</h4>;
            itemInfo = <a className='item-username' href=''>@Username</a>
            break;
        case 'messages':
            itemHeader = <h4 className='default-header'>First Last</h4>;
            itemInfo = <div className='message-info'><h4>"Last said"</h4><DividingDotIcon/><h4 style={{textIndent: '0px'}}>Time</h4></div>
            break;
        case 'notifications':
            itemHeader = <div className='notification-header'><h4>Notification message</h4></div>
            itemInfo = <h4 className='notification-info'>Time</h4>
            break;
        default:
            itemHeader = null;
            itemInfo = null;
            break;

    };

    return (
        <div className='info-item'>
            <div className='item-data'>
                <UserProfileButton size={'medium'} image={TestUser}/>
                <div className='item-body'>
                    {itemHeader}
                    {itemInfo}
                </div>
            </div>

            <MoreButton/>
        </div>
    )
}

export default InfoItem