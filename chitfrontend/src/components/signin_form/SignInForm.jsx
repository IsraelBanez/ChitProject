import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './AuthForm.css';

import {useAuth} from '../../helpers/AuthContext.js';

import LogoComponent from '../basics/AuthFormLogoComponent.jsx';
import RemeberAndForgotComponent from '../basics/RemeberAndForgotComponent.jsx';
import ConfirmUserDataComponent from '../basics/ConfirmUserDataComponent.jsx';
import AuthFormDividorComponent from '../basics/AuthFormDividorComponent.jsx';
import AuthFormAlternativeComponent from '../basics/AuthFormAlternativeComponent.jsx';

import UserAuthDataV1Input from '../inputs/UserAuthDataV1Input.jsx';
import UserAuthDataV2Input from '../inputs/UserAuthDataV2Input.jsx';

import BadCredentialsWarning from '../displays/BadCredentialsWarning.jsx';

import {ReactComponent as XIcon} from '../../icons/x-red.svg';

function SignInForm({signInSuccess}) {
    const { signInUser } = useAuth();
    const navigate = useNavigate();
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [validationErrorMessages, setValidationErrorMessages] = useState({});
    const [badCreditErrorMessage, setBadCreditErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle changes to the sign in data
    const onChangeHandler = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
    };

    // Diplay or hide password when user clicks the visiblity (eye) icon
    const onClickPasswordVisiblity = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    
    // Submit the sign in form
    const onSubmitSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInUser(signInData);
            // On success, navigate back to home screen and return status
            console.log('[Successful sign in]');
            navigate('/'); 
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
        } finally {
            setLoading(false); // This will be executed whether there was an error or not
        }
    };

    return (
        <div className='auth-form-container'>
            <LogoComponent/>
            
            {/* Handle bad credentials */}
            {
                badCreditErrorMessage 
                && badCreditErrorMessage == "Bad credentials" 
                && <BadCredentialsWarning message={"The email or password provided is invalid. Please try again."}/>
            }
            <UserAuthDataV1Input 
                type={'text'} 
                id={'sign-in-email'} 
                name={'email'} 
                placeholder={'email'}
                onChange={onChangeHandler}
                style={{ borderColor: validationErrorMessages.email ? '#FB5656' : '' }}
                addOns={
                    validationErrorMessages.email 
                    && validationErrorMessages.email == "Email cannot be empty." 
                    ? <span><XIcon/>Email cannot be empty.</span> : ""
                }
            />
            
            <UserAuthDataV2Input 
                type={showPassword ? 'text' : 'password'}
                id='sign-in-password' 
                name='password' 
                placeholder='password'
                onChange={onChangeHandler}
                changeIcon={showPassword}
                onClick={onClickPasswordVisiblity}
                style={{ borderColor: validationErrorMessages.password ? '#FB5656' : '' }}
                addOns={
                    validationErrorMessages.password 
                    && validationErrorMessages.password == "Passsword cannot be empty." 
                    ? <span><XIcon/>Passsword cannot be empty.</span> : ""
                }
            />

            <RemeberAndForgotComponent />
            <ConfirmUserDataComponent 
                type='submit'
                id='sign-in-button'  
                onClick={onSubmitSignIn} 
                disabled={loading}
                title={loading ? 'Sign in...' : 'Sign in'}
            />

            <AuthFormDividorComponent/>

            <AuthFormAlternativeComponent message={`Don't have an account?`} href={'/sign-up'} title={'Sign up'}/>

        </div>
    )
}

export default SignInForm