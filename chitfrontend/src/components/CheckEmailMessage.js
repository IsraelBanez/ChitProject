import '../styles/component-styles/ForgotPasswordForm.css';
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

import Logo from '../icons/logo-big.png';
import X from '../icons/x.svg';

import {forgotPassword} from '../helpers/authService.js';

export default function CheckEmailMessage({userEmail}){
    const navigate = useNavigate();

    const onClickResend = () => {

    };

    // Submit the forgot password form
    const onSubmitEmail = async (e) => {
        e.preventDefault();

        try {
            const isValidEmail = await forgotPassword(userEmail);
            console.log(isValidEmail);
            // On success, navigate back to Check Email and return status
            if (isValidEmail && isValidEmail.status == 200) {
                console.log('[Successfully sent email request]', isValidEmail.data);
                navigate('/'); 
            }
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
        };
    };

    return (
        <div className='check-email-msg'>
            {/* Logo Section */}
            <img src={Logo} alt='Chit logo'/>

            {/* Title Section */}
            <div className='cy-title'>
                <h1 >Check your email</h1>
            </div>

            {/* Check Your Email Message Section */}
            <div className='cy-message'>
                <p>
                    We sent you an email with a link to reset your password. <br/> 
                    If you don't see it in your inbox, check your spam folder.
                </p>
            </div>

            {/* Check Your Email Message Section */}
            <div className='cy-message'>
                <p>
                    Haven’t received an email? <br/> 
                    <span onClick={onClickResend}>Resend</span> or <Link to="/forgot-password" className='cy-forgot-pswd-link'>Try different email</Link>
                </p>
            </div>

            {/* Alternative Section */}
            <div className='cy-alternative'>
                <Link to="/sign-in" className='cy-sign-in-link'>Return to Sign in</Link>
            </div>
        </div>
    );
}