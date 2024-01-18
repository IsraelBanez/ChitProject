import '../styles/component-styles/SignInForm.css';
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

import Logo from '../icons/logo-big.png';
import Eye from '../icons/eye.svg';
import EyeClosed from '../icons/eye-closed.svg';

import {authInstance} from '../helpers/AxiosConfig.js';

import BadCredentialsWarning from './BadCredentialsWarning.js';

export default function SignInForm({signInSuccess}){
    const navigate = useNavigate();
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    // Diplay or hide password when user clicks the visiblity (eye) icon
    const onClickPasswordVisiblity = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Handle changes to the sign in data
    const onChangeHandler = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
    };

    // Submit the sign in form
    const onSubmitSignIn= (e) => {onSubmitSignIn
        e.preventDefault();
        
        authInstance
        .post('/sign-in', signInData)
        .then((response) => {
            // On success, navigate back to home screen and return status 
            if (response.status === 200 ){
                console.log('[Successful sign in]', response.data);
                signInSuccess = true;
                navigate('/');
            }
        })
        .catch((error) => {
            signInSuccess = false;
            if (error.response) {
                // The request was made, but the server responded with a status code outside of 2xx
                console.error('[Failed to sign in]', error.response.data);
                console.error('[Status]', error.response.status);

                // Handle Bad credential error
                if (error.response.data.detail){
                    console.error('[Error]', error.response.data.detail);
                    setErrorMessage(error.response.data.detail);
                } else{
                    setErrorMessage(null);
                }
                
                // Handle Validation Error
                setErrorMessages(error.response.data);
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('[Failed to sign up]', 'No response received');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('[Failed to sign up]', error.message);
            }
        });
    };

    return (
        <div className='sign-in-form'>
            {/* Logo Section */}
            <img src={Logo} alt='Chit logo'/>

            {/* User Data Collection Section */}
            <div className='si-user-data'>
                {/* Handle bad credentials */}
                {errorMessage && errorMessage == "Bad credentials" && <BadCredentialsWarning/>}

                {/* Handle user email */}
                <div className='si-input-slot'>
                    <input 
                        type='text' 
                        id='signin-email' 
                        name='email' 
                        placeholder='email'
                        onChange={onChangeHandler}
                        style={{ borderColor: errorMessages.email ? '#FB5656' : '' }}
                    />
                    {errorMessages.email && errorMessages.email == "Email cannot be empty." ? <span><img src={X} alt='x error'/>Email cannot be empty.</span> : ""}
                </div>

                {/* Handle user password */}
                <div className='si-password-region'>
                    <div className='si-password'>
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id='signin-password' 
                            name='password' 
                            placeholder='password'
                            onChange={onChangeHandler}
                            style={{ borderColor: errorMessages.password ? '#FB5656' : '' }}
                        />   
                        <img src={showPassword ? Eye : EyeClosed} alt='password visibility' onClick={onClickPasswordVisiblity}/>
                    </div>

                    {errorMessages.password && errorMessages.password == "Passsword cannot be empty." ? <span><img src={X} alt='x error'/>Passsword cannot be empty.</span> : ""}
                    
                    {/* Handle forgot password and remeber me */}
                    <div className='si-forgot-region'>
                        <div className='si-forgot-left'>
                            <input type='checkbox' id='remember-user' name='remember-user'/>
                            Remember me
                        </div>
                        
                        <a href=''>Forgot password?</a>
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
                Don't have an account? 
                <Link to="/sign-up" className='si-sign-up-link'>Sign up</Link>
            </div>
        </div>
    );
}