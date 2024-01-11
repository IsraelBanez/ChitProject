import '../styles/SignIn.css';
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from 'react';
import Logo from '../icons/logo-big.png';
import Eye from '../icons/eye.svg';
import EyeClosed from '../icons/eye-closed.svg';
import X from '../icons/x.svg';
import {authInstance} from '../helpers/AxiosConfig.js';

// Display bad credentials warning
const BadCredentials = ({error}) => {
    return (
        <div className='bad-credits'>
            <span>
                <img src={X}  alt="x error" />
                The email or password provided is invalid. Please try again.
            </span>
        </div>
    );
}

export default function SignIn({signInStatus}){
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    });
  
    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Store sign in  data input
    const storeUserData = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
    };

    // Error for bad credentials exist but TODO you should set the rror only for empty email here 
    const handleSubmit = (e) => {
        e.preventDefault();
        
        authInstance
        .post('/sign-in', signInData)
        .then((response) => {
            // On success, navigate back to home screen and return status 
            if (response.status === 200 ){
                console.log('[Successful sign in]', response.data);
                signInStatus = 'success';
                navigate('/');
            }
        })
        .catch((error) => {
            if (error.response) {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx
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
            <div className='sign-in-container'>
                <div className='sign-in-section'>
                    <img src={Logo} alt='chit logo'/>
                    <div className='user-data'>
                        {errorMessage && errorMessage == "Bad credentials" && <BadCredentials/>}
                        <div className='input-slot'>
                            <input 
                                type='text' 
                                id='signin-email' 
                                name='email' 
                                placeholder='email'
                                onChange={storeUserData}
                                style={{ borderColor: errorMessages.email ? '#FB5656' : '' }}
                            />
                            {errorMessages.email && errorMessages.email == "Email cannot be empty." ? <span><img src={X} alt='x error'/>Email cannot be empty.</span> : ""}
                        </div>
                        <div className='password-region'>
                            <div className='si-password'>
                                <input 
                                    type={showPassword ? 'text' : 'password'}
                                    id='signin-password' 
                                    name='password' 
                                    placeholder='password'
                                    onChange={storeUserData}
                                    style={{ borderColor: errorMessages.password ? '#FB5656' : '' }}
                                />   
                                <img src={showPassword ? Eye : EyeClosed} alt='password visibility' onClick={togglePasswordVisibility}/>
                            </div>

                            {errorMessages.password && errorMessages.password == "Passsword cannot be empty." ? <span><img src={X} alt='x error'/>Passsword cannot be empty.</span> : ""}
                            
                            <div className='forgot-region'>
                                <div className='forgot-left'>
                                    <input type='checkbox' id='remember-user' name='remember-user'/>
                                    Remember me
                                </div>
                                
                                <a href='' >Forgot password?</a>
                            </div>
                            
                        </div>
                    </div>

                    <button
                        type='submit'
                        id='signin-button'  
                        onClick={handleSubmit} 
                        className='si-sign-in-btn'>
                        Sign in
                    </button>

                    <div className='si-dividor'>
                        <div></div>
                        OR
                        <div></div>
                    </div>

                    <div className='si-alternative'>
                        Don't have an account? <Link to="/sign-up" className='si-sign-up-link'>Sign up</Link>
                    </div>
                </div>
            </div>
    );
}