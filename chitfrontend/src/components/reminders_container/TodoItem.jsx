import React from 'react'
import './TodoItem.css';

import UserProfileButton from '../buttons/UserProfileButton';
import MoreButton from '../buttons/MoreButton';

import TestUser from '../../images/test-user.jpg';

import {ReactComponent as DividingDotIcon} from '../../icons/dividing-dot.svg';

function TodoItem() {
    return (
        <div className='todo-item'>
            <div className='todo-left'>
                <UserProfileButton size={'medium'} image={TestUser}/>
                <div className='todo-data'>
                    <h4 className='todo-title'>Reminder Title</h4>
                    <h4 className='todo-description'>Reminder Short Destriction</h4>
                    <div className='todo-time'><h4>Nov 10, 2024</h4><DividingDotIcon/><h4 style={{textIndent: '0px'}}>Time</h4></div>
                </div>
            </div>

            <div className='todo-right'>
                <div className='todo-participants'>
                    <UserProfileButton size={'small'} image={TestUser}/>
                    <UserProfileButton size={'small'} image={TestUser}/>
                    <UserProfileButton size={'small'} image={TestUser}/>
                </div>
                <MoreButton version={'transparent'}/>
            </div>
        </div>
    )
}

export default TodoItem