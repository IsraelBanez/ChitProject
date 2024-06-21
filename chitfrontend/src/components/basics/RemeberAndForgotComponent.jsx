import React from 'react'
import './RemeberAndForgotComponent.css';

function RemeberAndForgotComponent() {
    return (
        <div className='remember-and-forget-component'>
            <div className='remember-user-input'>
                <input type='checkbox' id='remember-user' name='remember-user'/>
                Remember me
            </div>
            <a href='/forgot-password'>Forgot Password</a>
        </div>
    )
}

export default RemeberAndForgotComponent