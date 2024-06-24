import React from 'react'
import './AuthFormInstructionsComponent.css';

function AuthFormInstructionsComponent({instructions}) {
     return (
        <div className='auth-form-intructions-component'>
            <p>
                {instructions}
            </p>
        </div>
    )
}

export default AuthFormInstructionsComponent