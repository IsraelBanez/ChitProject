import '../styles/SignUp.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from "react-router-dom";
import Logo from '../icons/logo-big.png';
import Eye from '../icons/eye.svg';
import EyeClosed from '../icons/eye-closed.svg';
import Dot from '../icons/dot.svg';
import RedDot from '../icons/dot-red.svg';
import Check from '../icons/check.svg';
import X from '../icons/x.svg';
import {authInstance} from '../helpers/AxiosConfig.js';

// Display password criteria for users
const PasswordCriteria = ({error}) => {

    return (
        <div className='password-requirements'>
            <span style={{ color: error ? '#FB5656' : '' }}>
                <img src={error ? RedDot : Dot}  alt="Dot" />
                must be at least 10 characters
            </span>
            <span style={{ color: error ? '#FB5656' : '', fill: error ? '#FB5656' : ''}} >
                <img src={error ? RedDot : Dot}  alt="Dot" />
                contain an uppercase letter
            </span>
            <span style={{ color: error ? '#FB5656' : '', fill: error ? '#FB5656' : ''}} >
                <img src={error ? RedDot : Dot}  alt="Dot" />
                contain a special character
            </span>
            <span style={{ color: error ? '#FB5656' : '', fill: error ? '#FB5656' : ''}} >
                <img src={error ? RedDot : Dot}  alt="Dot" />
                contain a number
            </span>
        </div>
    );
}

export default function SignUp({signUpStatus}){
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [signUpData, setSignUpData] = useState({
        fullName: '',
        userName: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
  
    // Handle password visiblity with eye icon
    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Handle password criteria 
    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
    };
    const handlePasswordBlur = () => {
        setIsPasswordFocused(false);
    };

    // Store sign up data input
    const storeUserData = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    // Handle submitted credentials from user (Sucess and failure)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        authInstance
        .post('/sign-up', signUpData)
        .then((response) => {
            // On success, navigate back to home screen and return status 
            if (response.status === 200 ){
                console.log('[Successful sign up]', response.data);
                signUpStatus = 'success';
                navigate('/');
            }
        })
        .catch((error) => {
            if (error.response) {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx
                console.error('[Failed to sign up]', error.response.data);
                console.error('[Status]', error.response.status);

                // Handle Duplicated error
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
            <div className='sign-up-container'>
                <div className='sign-up-section'>
                    <img src={Logo} alt='chit logo'/>
 
                    <div className='su-user-data'>
                        <div className='input-slot'>
                            <input 
                                type='text' 
                                id='signup-fullname' 
                                name='fullName' 
                                placeholder='full name' 
                                onChange={storeUserData} 
                                style={{ borderColor: errorMessages.fullName ? '#FB5656' : '' }}
                            /> 
                            {errorMessages.fullName ? <span><img src={X} alt='x error'/>Full name cannot be emtpy.</span> : ""}
                        </div>
                        <div className='input-slot'>
                            <input 
                                type='text' 
                                id='signup-username' 
                                name='userName' 
                                placeholder='create username' 
                                onChange={storeUserData}
                                style={{ borderColor: errorMessages.userName || (errorMessage && errorMessage == "userName: Username already exists.") ? '#FB5656' : '' }}
                            />
                            {errorMessages.userName && errorMessages.userName == "Username cannot be empty." ? <span><img src={X} alt='x error'/>Username cannot be empty.</span> : ""}
                            {errorMessage && errorMessage == "userName: Username already exists."? <span><img src={X} alt='x error'/>Username already exists.</span> : ""}
                        </div>
                        <div className='input-slot'>
                            <input 
                                type='text' 
                                id='signup-email' 
                                name='email' 
                                placeholder='email address' 
                                onChange={storeUserData}
                                style={{ borderColor: errorMessages.email || (errorMessage && errorMessage == "email: Email already exists.") ? '#FB5656' : '' }}
                            />
                            {errorMessages.email && errorMessages.email == "Email cannot be empty." ? <span><img src={X} alt='x error'/>Email cannot be empty.</span> : ""}
                            {errorMessages.email && errorMessages.email == "Email must be a valid email address." ? <span><img src={X} alt='x error'/>Please enter a valid email.</span> : ""}
                            {errorMessage && errorMessage == "email: Email already exists." ? <span><img src={X} alt='x error'/>Email already exists</span> : ""}
                        </div>
                        <div className='su-password-region'>
                            <div className='su-password'>
                                <input 
                                    type={showPassword ? 'text' : 'password'}
                                    id='signup-password' 
                                    name='password' 
                                    placeholder='create password'
                                    onChange={storeUserData}
                                    onFocus={handlePasswordFocus}
                                    onBlur={handlePasswordBlur} 
                                    style={{ borderColor: errorMessages.password ? '#FB5656' : '' }}
                                />   
                                <img src={showPassword ? Eye : EyeClosed} alt='password visibility' onClick={togglePasswordVisibility}/>
                            </div>
                            {isPasswordFocused && <PasswordCriteria error={errorMessages.password}/> || errorMessages.password && <PasswordCriteria error={errorMessages.password}/>}
                        </div>

                    </div>

                    <button 
                        type='submit' 
                        id='signup-button' 
                        onClick={handleSubmit} 
                        className='si-sign-in-btn'
                        onMouseDown={(e) => e.preventDefault()} // To overcome the focus of the password criteria
                        onTouchStart={(e) => e.preventDefault()} >
                        Sign up
                    </button>
            

                    <div className='si-dividor'>
                        <div></div>
                        OR
                        <div></div>
                    </div>

                    <div className='si-alternative'>
                    Already have an account? <Link to="/sign-in" className='si-sign-up-link'>Sign in</Link>
                    </div>
                </div>
            </div>
    );
}