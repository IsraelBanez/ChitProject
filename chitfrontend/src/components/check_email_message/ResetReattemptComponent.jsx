import React from 'react'
import './ResetReattemptComponent.css';

function ResetReattemptComponent({onClick, href}) {
    return (
        <div className='reset-reattempt-component'>
            <p>
                Haven’t received an email? <br/> 
                <a onClick={onClick}>Resend</a> or <a href={href}>Try different email</a>
            </p>
        </div>
    )
}

export default ResetReattemptComponent