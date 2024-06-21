import React from 'react'
import './InfoItemComponent.css';

import UserProfileButton from '../buttons/UserProfileButton';
import MoreButton from '../buttons/MoreButton';

import TestUser from '../../images/test-user.jpg';

import {ReactComponent as DividingDotIcon} from '../../icons/dividing-dot.svg';

function InfoItemComponent({type}) {
    let itemInfo;
    let itemHeader;

    switch (type) {
        case 'network':
            itemHeader = <h4 className='ifc-default-header'>First Last</h4>;
            itemInfo = <a className='ifc-username' href=''>@Username</a>
            break;
        case 'messages':
            itemHeader = <h4 className='ifc-default-header'>First Last</h4>;
            itemInfo = <div className='ifc-message'><h4>"Last said"</h4><DividingDotIcon/><h4 style={{textIndent: '0px'}}>Time</h4></div>
            break;
        case 'notifications':
            itemHeader = <div className='ifc-notification-header'><h4>Notification message</h4></div>
            itemInfo = <h4 className='ifc-time'>Time</h4>
            break;
        default:
            itemHeader = null;
            itemInfo = null;
            break;

    };

    return (
        <div className='info-item-component'>
            <div className='ifc-data'>
                <UserProfileButton size={'medium'} image={TestUser}/>
                <div className='ifc-body'>
                    {itemHeader}
                    {itemInfo}
                </div>
            </div>

            <MoreButton/>
        </div>
    )
}

export default InfoItemComponent