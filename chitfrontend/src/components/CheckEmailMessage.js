import '../styles/component-styles/CheckEmailMessage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";

import Logo from '../images/logo-big.png';

import {useAuth} from '../helpers/AuthContext.js';

// TODO: Eventually take this path away and merge it with the forgot-password; just switch pages

export default function CheckEmailMessage(){
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
                    <span onClick={onClickResend} className='cy-resend'>Resend</span> or <Link to="/forgot-password" className='cy-forgot-pswd-link'>Try different email</Link>
                </p>
            </div>

            {/* Alternative Section */}
            <div className='cy-alternative'>
                <Link to="/sign-in" className='cy-sign-in-link'>Return to Sign in</Link>
            </div>
        </div>
    );
}