import React from 'react'
import './SubscribeInput.css';

function SubscribeInput() {
    return (
        <div className='subscribe-inpt'>
            <input type="email" placeholder='Your email' />
            <button>sub</button>
        </div>
    )
}

export default SubscribeInput