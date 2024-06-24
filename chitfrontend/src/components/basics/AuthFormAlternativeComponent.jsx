import React from 'react'
import './AuthFormAlternativeComponent.css';

function AuthFormAlternativeComponent({message, href, title, style}) {
    return (
        <div className='auth-form-alternative-component' style={style}>
            {message} <a href={href}>{title}</a>
        </div>
    )
}

export default AuthFormAlternativeComponent