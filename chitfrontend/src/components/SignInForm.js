import '../styles/component-styles/SignInForm.css';
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

import Logo from '../icons/logo-big.png';
import Eye from '../icons/eye.svg';
import EyeClosed from '../icons/eye-closed.svg';
import X from '../icons/x.svg';

import {signIn} from '../helpers/authService.js';

import BadCredentialsWarning from './BadCredentialsWarning.js';

export default function SignInForm({signInSuccess}){
    const navigate = useNavigate();
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [validationErrorMessages, setValidationErrorMessages] = useState({});
    const [badCreditErrorMessage, setBadCreditErrorMessage] = useState(null);

    // Diplay or hide password when user clicks the visiblity (eye) icon
    const onClickPasswordVisiblity = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Handle changes to the sign in data
    const onChangeHandler = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
    };

    // Submit the sign in form
    const onSubmitSignIn = async (e) => {
        e.preventDefault();

        try {
            const isSignedIn = await signIn(signInData);
            // On success, navigate back to home screen and return status
            if (isSignedIn && isSignedIn.status == 200) {
                console.log('[Successful sign in]', isSignedIn.data);
                signInSuccess = true;
                navigate('/'); 
            }
        } catch (error) {
            signInSuccess = false;
            if (error.response) {
                // The request was made, but the server responded with a status code outside of 2xx
                console.error('[Failed to sign in]', error.response.data);
                console.error('[Status]', error.response.status);

                // Handle Bad credential error
                if (error.response.data.detail){
                    console.error('[Error]', error.response.data.detail);
                    setBadCreditErrorMessage(error.response.data.detail);
                } else{
                    setBadCreditErrorMessage(null);
                }
                
                // Handle Validation Error
                setValidationErrorMessages(error.response.data);
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('[Failed to sign up]', 'No response received');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('[Failed to sign up]', error.message);
            }
        };
    };

    return (
        <div className='sign-in-form'>
            {/* Logo Section */}
            <img src={Logo} alt='Chit logo'/>

            {/* User Data Collection Section */}
            <div className='si-user-data'>
                {/* Handle bad credentials */}
                {badCreditErrorMessage && badCreditErrorMessage == "Bad credentials" && <BadCredentialsWarning message={"The email or password provided is invalid. Please try again."}/>}

                {/* Handle user email */}
                <div className='si-input-slot'>
                    <input 
                        type='text' 
                        id='sign-in-email' 
                        name='email' 
                        placeholder='email'
                        onChange={onChangeHandler}
                        style={{ borderColor: validationErrorMessages.email ? '#FB5656' : '' }}
                    />
                    {validationErrorMessages.email && validationErrorMessages.email == "Email cannot be empty." ? <span><img src={X} alt='x error'/>Email cannot be empty.</span> : ""}
                </div>

                {/* Handle user password */}
                <div className='si-password-region'>
                    <div className='si-password'>
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id='sign-in-password' 
                            name='password' 
                            placeholder='password'
                            onChange={onChangeHandler}
                            style={{ borderColor: validationErrorMessages.password ? '#FB5656' : '' }}
                        />   
                        <img src={showPassword ? Eye : EyeClosed} alt='password visibility' onClick={onClickPasswordVisiblity}/>
                    </div>

                    {validationErrorMessages.password && validationErrorMessages.password == "Passsword cannot be empty." ? <span><img src={X} alt='x error'/>Passsword cannot be empty.</span> : ""}
                    
                    {/* Handle forgot password and remeber me */}
                    <div className='si-forgot-region'>
                        <div className='si-forgot-left'>
                            <input type='checkbox' id='remember-user' name='remember-user'/>
                            Remember me
                        </div>
                        
                        <Link to='/forgot-password' className='si-forgot-pswd-link'>Forgot password?</Link>
                    </div>
                </div>
            </div>

            {/* Sign In Button Section */}
            <button
                type='submit'
                id='sign-in-button'  
                onClick={onSubmitSignIn} 
                className='si-sign-in-btn'>
                Sign in
            </button>

            {/* Dividor */}
            <div className='si-dividor'>
                <div></div>
                OR
                <div></div>
            </div>

            {/* Alternative Section */}
            <div className='si-alternative'>
                Don't have an account? <Link to="/sign-up" className='si-sign-up-link'>Sign up</Link>
            </div>
        </div>
    );
}