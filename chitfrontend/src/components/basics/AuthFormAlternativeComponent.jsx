import React from 'react'
import './AuthFormAlternativeComponent.css';

function AuthFormAlternativeComponent({message, href, title}) {
    return (
        <div className='auth-form-alternative-component'>
            {message} <a href={href}>{title}</a>
        </div>
    )
}

export default AuthFormAlternativeComponent