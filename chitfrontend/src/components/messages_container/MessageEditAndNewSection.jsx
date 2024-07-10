import React from 'react'
import './MessageEditAndNewSection.css';

import EditButton from './EditButton';
import NewMessageButton from './NewMessageButton';

function MessageEditAndNewSection() {
    return (
        <section className='m-edit-and-new-section'>
            <EditButton/>
            <NewMessageButton/>
        </section>
    )
}

export default MessageEditAndNewSection