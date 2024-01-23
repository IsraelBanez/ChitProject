import '../styles/component-styles/SignUpForm.css';
import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";

import Logo from '../icons/logo-big.png';
import Eye from '../icons/eye.svg';
import EyeClosed from '../icons/eye-closed.svg';
import X from '../icons/x.svg';

import {useAuth} from '../helpers/AuthContext.js';

import PasswordCriteria from './PasswordCriteria.js';

export default function SignUpForm({signUpSuccess}){
    const {signUpUser} = useAuth();
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        fullName: '',
        userName: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [validationErrorMessages, setValidationErrorMessages] = useState({});
    const [duplicateErrorMessages, setDuplicateErrorMessages] = useState(null);
    const [loading, setLoading] = useState(false);

    // Diplay or hide password when user clicks the visiblity (eye) icon
    const onClickPasswordVisiblity = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Handle password criteria visiblity
    const onPasswordFocus = () => {
        setIsPasswordFocused(true);
    };
    const onPasswordBlur = () => {
        setIsPasswordFocused(false);
    };
    
    // Handle changes to the sign in data
    const onChangeHandler = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    // Submit the sign up form
    const onSubmitSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signUpUser(signUpData);
            // On success, navigate back to home screen and return status
            console.log('[Successful sign in]');
            navigate('/'); 
        } catch (error) {
            signUpSuccess = false;
            if (error.response) {
                // The request was made, but the server responded with a status code outside of 2xx
                console.error('[Failed to sign in]', error.response.data);
                console.error('[Status]', error.response.status);

                // Handle Duplicate error
                if (error.response.data.detail){
                    console.error('[Failed to sign in]', error.response.data.detail);
                    setDuplicateErrorMessages(error.response.data.detail);
                } else{
                    setDuplicateErrorMessages(null);
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
        } finally {
            setLoading(false);
        };
    };

    return(
        <div className='sign-up-form'>
            {/* Logo Section */}
            <img src={Logo} alt='chit logo'/>

            {/* User Data Collection Section */}
            <div className='su-user-data'>
                {/* Handle user full name */}
                <div className='su-input-slot'>
                    <input 
                        type='text' 
                        id='sign-up-fullname' 
                        name='fullName' 
                        placeholder='full name' 
                        onChange={onChangeHandler} 
                        style={{ borderColor: validationErrorMessages.fullName ? '#FB5656' : '' }}
                    /> 
                    {validationErrorMessages.fullName ? <span><img src={X} alt='x error'/>Full name cannot be emtpy.</span> : ""}
                </div>

                {/* Handle user username */}
                <div className='su-input-slot'>
                    <input 
                        type='text' 
                        id='sign-up-username' 
                        name='userName' 
                        placeholder='create username' 
                        onChange={onChangeHandler}
                        style={{ borderColor: validationErrorMessages.userName || (duplicateErrorMessages && duplicateErrorMessages == "Username already exists.") ? '#FB5656' : '' }}
                    />
                    {validationErrorMessages.userName && validationErrorMessages.userName == "Username cannot be empty." ? <span><img src={X} alt='x error'/>Username cannot be empty.</span> : ""}
                    {duplicateErrorMessages && duplicateErrorMessages == "Username already exists."? <span><img src={X} alt='x error'/>Username already exists.</span> : ""}
                </div>

                {/* Handle user email */}
                <div className='su-input-slot'>
                    <input 
                        type='text' 
                        id='sign-up-email' 
                        name='email' 
                        placeholder='email address' 
                        onChange={onChangeHandler}
                        style={{ borderColor: validationErrorMessages.email || (duplicateErrorMessages && duplicateErrorMessages == "Email already exists.") ? '#FB5656' : '' }}
                    />
                    {validationErrorMessages.email && validationErrorMessages.email == "Email cannot be empty." ? <span><img src={X} alt='x error'/>Email cannot be empty.</span> : ""}
                    {validationErrorMessages.email && validationErrorMessages.email == "Email must be a valid email address." ? <span><img src={X} alt='x error'/>Please enter a valid email.</span> : ""}
                    {duplicateErrorMessages && duplicateErrorMessages == "Email already exists." ? <span><img src={X} alt='x error'/>Email already exists</span> : ""}
                </div>

                {/* Handle user password */}
                <div className='su-password-region'>
                    <div className='su-password'>
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id='sign-up-password' 
                            name='password' 
                            placeholder='create password'
                            onChange={onChangeHandler}
                            onFocus={onPasswordFocus}
                            onBlur={onPasswordBlur} 
                            style={{ borderColor: validationErrorMessages.password ? '#FB5656' : '' }}
                        />   
                        <img src={showPassword ? Eye : EyeClosed} alt='password visibility' onClick={onClickPasswordVisiblity}/>
                    </div>
                    {isPasswordFocused && <PasswordCriteria isError={validationErrorMessages.password}/> || validationErrorMessages.password && <PasswordCriteria isError={validationErrorMessages.password}/>}
                </div>

            </div>

            {/* Sign Up Button Section */}
            <button 
                type='submit' 
                id='signup-button' 
                onClick={onSubmitSignUp} 
                className='si-sign-in-btn'
                onMouseDown={(e) => e.preventDefault()} // To overcome the focus of the password criteria
                onTouchStart={(e) => e.preventDefault()} 
                disabled={loading}
            >
                {loading ? 'Sign up...' : 'Sign up'}
            </button>
    
            {/* Dividor */}
            <div className='si-dividor'>
                <div></div>
                OR
                <div></div>
            </div>

            {/* Alternative Section */}
            <div className='si-alternative'>
                Already have an account? <Link to="/sign-in" className='si-sign-up-link'>Sign in</Link>
            </div>
        </div>
    );
}