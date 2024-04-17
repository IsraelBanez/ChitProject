import React from 'react'
import './TodoHeader.css';

import AddRemindersButton from './AddRemindersButton';

function TodoHeader() {
    return (
        <div className='todo-header'>
            <h2>Todo</h2>
            <AddRemindersButton/>
        </div>
    )
}

export default TodoHeader