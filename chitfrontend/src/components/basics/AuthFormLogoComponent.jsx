import React from 'react'
import './AuthFormLogoComponent.css';

import {ReactComponent as Logo} from '../../icons/logo.svg';

function AuthFormLogoComponent() {
    return (
        <div className='auth-form-logo-component'><Logo/></div>
    )
}

export default AuthFormLogoComponent