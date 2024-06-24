import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import {useAuth} from '../../helpers/AuthContext.js';

import AuthFormLogoComponent from '../basics/AuthFormLogoComponent.jsx';
import AuthFormTitleComponent from '../basics/AuthFormTitleComponent.jsx';
import AuthFormInstructionsComponent from '../basics/AuthFormInstructionsComponent.jsx';
import ResetReattemptComponent from './ResetReattemptComponent.jsx';
import AuthFormAlternativeComponent from '../basics/AuthFormAlternativeComponent.jsx';

// TODO: Eventually take this path away and merge it with the forgot-password; just switch pages

function CheckEmailForm() {
    const { forgotPasswordHandler } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);

    // Retrieve email from location state when the component mounts
    useEffect(() => {
        if (location.state && location.state.email) {
            setUserEmail(location.state.email);
        }
    }, [location.state]);

    // Submit the forgot password form
    const onClickResend = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log(userEmail);
            await forgotPasswordHandler(userEmail);
            // On success, navigate back to Check Email and return status
            console.log('[Successfully resent email request]');
        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with a status code outside of 2xx
                console.error('[Failed to resend email request]', error.response.data);
                console.error('[Status]', error.response.status);
                
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('[Failed to resend email request]', 'No response received');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('[Failed to resend email request]', error.message);
            }
        } finally {
            setLoading(false);
        };
    };

    return (
        <div className='auth-form-container'>
            <AuthFormLogoComponent/>

            <AuthFormTitleComponent title={'Check your email'}/>

            <AuthFormInstructionsComponent 
                instructions={
                <>
                    We sent you an email with a link to reset your password. <br/> 
                    If you don't see it in your inbox, check your spam folder.
                </>}
            />

            <ResetReattemptComponent onClick={onClickResend} href={'/forgot-password'}/>

            <AuthFormAlternativeComponent message={``} href={'/sign-in'} title={'Return to Sign in'} style={{margin: '0px'}}/>
        </div>
    )
}

export default CheckEmailForm