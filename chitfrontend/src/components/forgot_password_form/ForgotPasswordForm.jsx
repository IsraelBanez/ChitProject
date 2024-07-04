import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {useAuth} from '../../helpers/AuthContext.js';

import AuthFormLogoComponent from '../basics/AuthFormLogoComponent.jsx';
import AuthFormTitleComponent from '../basics/AuthFormTitleComponent.jsx';
import AuthFormInstructionsComponent from '../basics/AuthFormInstructionsComponent.jsx';
import AuthFormAlternativeComponent from '../basics/AuthFormAlternativeComponent.jsx';
import ConfirmUserDataComponent from '../basics/ConfirmUserDataComponent.jsx';

import UserAuthDataV1Input from '../inputs/UserAuthDataV1Input.jsx';

import {ReactComponent as XIcon} from '../../icons/x-red.svg';

function ForgotPasswordForm() {
    const { forgotPasswordHandler} = useAuth();
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState({
        email: ''
    });
    const [validationErrorMessages, setValidationErrorMessages] = useState({});
    const [loading, setLoading] = useState(false);


    // Handle changes to the forgot password data
    const onChangeHandler = (e) => {
        setUserEmail({ ...userEmail, [e.target.name]: e.target.value });
    };

    // Submit the forgot password form
    const onSubmitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await forgotPasswordHandler(userEmail);
            // On success, navigate back to Check Email and return status
            console.log('[Successfully sent email request]');
            navigate('/forgot-password/check-email', { state: { email: userEmail.email } }); 
        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with a status code outside of 2xx
                console.error('[Failed to send email request]', error.response.data);
                console.error('[Status]', error.response.status);
                
                // Handle Validation Error
                setValidationErrorMessages(error.response.data);
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('[Failed to send email request]', 'No response received');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('[Failed to send email request]', error.message);
            }
        } finally {
            setLoading(false);
        };
    };

    return (
        <div className='auth-form-container'>
            <AuthFormLogoComponent/>

            <AuthFormTitleComponent title={'Forgot your password'}/>

            <AuthFormInstructionsComponent 
                instructions={
                <>
                    Enter the email address you signed up with, and <br/>
                    we'll send you an email to reset your password.
                </>}
            />

            <UserAuthDataV1Input 
                type={'text'} 
                id={'forgot-pswd-email'} 
                name={'email'} 
                placeholder={'email'}
                onChange={onChangeHandler}
                style={{ borderColor: validationErrorMessages.email ? '#FB5656' : '' }}
                addOns={
                    <>
                        {validationErrorMessages.email && validationErrorMessages.email == "Please provide an email." 
                        ? <span><XIcon/>Please provide an email.</span> : ""}
                        {validationErrorMessages.email && validationErrorMessages.email == "Please provide a valid email address." 
                        ? <span><XIcon/>Please provide a valid email address.</span> : ""}
                    </>
                }
            />

            <ConfirmUserDataComponent 
                type='submit'
                id='forgot-button'  
                onClick={onSubmitEmail} 
                disabled={loading}
                title={loading ? 'Send Email...' : 'Send Email'}
            />

            <AuthFormAlternativeComponent message={``} href={'/sign-in'} title={'Return to Sign in'} style={{margin: '0px'}}/>
        </div>
    )
}

export default ForgotPasswordForm