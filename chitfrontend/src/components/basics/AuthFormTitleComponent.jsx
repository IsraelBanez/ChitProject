import React from 'react'
import './AuthFormTitleComponent.css';

function AuthFormTitleComponent({title}) {
    return (
        <div className='auth-form-title-component'>
            <h1>{title}</h1>
        </div>
    )
}

export default AuthFormTitleComponent