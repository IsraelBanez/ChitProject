import './ForgotPasswordForm.css';
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

import Logo from '../../images/logo-big.png';
import X from '../../icons/x.svg';

import {useAuth} from '../../helpers/AuthContext.js';

export default function ForgotPasswordForm(){
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
        <div className='forgot-pswd-form'>
            {/* Logo Section */}
            <img src={Logo} alt='Chit logo'/>

            {/* Title Section */}
            <div className='fp-title'>
                <h1 >Forgot your password</h1>
            </div>

            {/* Forgot Password Message Section */}
            <div className='fp-message'>
                <p>
                    Enter the email address you signed up with, and <br/>
                    we'll send you an email to reset your password.
                </p>
            </div>

            {/* User Data Collection Section */}
            <div className='fp-user-data'>
                
                {/* Handle user email */}
                <div className='fp-input-slot'>
                    <input 
                        type='text' 
                        id='forgot-pswd-email' 
                        name='email' 
                        placeholder='email'
                        onChange={onChangeHandler}
                        style={{ borderColor: validationErrorMessages.email ? '#FB5656' : '' }}
                    />
                    {validationErrorMessages.email && validationErrorMessages.email == "Please provide an email." ? <span><img src={X} alt='x error'/>Please provide an email.</span> : ""}
                    {validationErrorMessages.email && validationErrorMessages.email == "Please provide a valid email address." ? <span><img src={X} alt='x error'/>Please provide a valid email address.</span> : ""}
                </div>

            </div>

            {/* Send Email Button Section */}
            <button
                type='submit'
                id='forgot-button'  
                onClick={onSubmitEmail} 
                className='fp-send-email-btn'
                disabled={loading}
            >
                {loading ? 'Send Email...' : 'Send Email'}
            </button>


            {/* Alternative Section */}
            <div className='fp-alternative'>
                <Link to="/sign-in" className='fp-sign-in-link'>Return to Sign in</Link>
            </div>
        </div>
    );
}