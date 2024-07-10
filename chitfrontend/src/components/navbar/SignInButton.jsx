import React from 'react'
import './SignInButton.css';

function SignInButton({onClick}) {
    return (
        <button className='n-sign-in-btn' onClick={onClick}>
            Sign in
        </button>
    )
}

export default SignInButton