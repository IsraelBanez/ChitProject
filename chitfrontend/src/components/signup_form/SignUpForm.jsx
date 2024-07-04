import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../signin_form/AuthForm.css';

import {useAuth} from '../../helpers/AuthContext.js';

import AuthFormLogoComponent from '../basics/AuthFormLogoComponent.jsx';
import ConfirmUserDataComponent from '../basics/ConfirmUserDataComponent.jsx';
import AuthFormDividorComponent from '../basics/AuthFormDividorComponent.jsx';
import AuthFormAlternativeComponent from '../basics/AuthFormAlternativeComponent.jsx';

import UserAuthDataV1Input from '../inputs/UserAuthDataV1Input.jsx';
import UserAuthDataV2Input from '../inputs/UserAuthDataV2Input.jsx';

import PasswordCriteria from '../displays/PasswordCriteria.jsx';

import {ReactComponent as XIcon} from '../../icons/x-red.svg';

function SignUpForm({signUpSuccess}) {
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

    // Handle changes to the sign in data
    const onChangeHandler = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

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

    // Submit the sign up form
    const onSubmitSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signUpUser(signUpData);
            // On success, navigate back to home screen and return status
            console.log('[Successful sign in]');
            navigate('/sign-in'); 
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

    return (
        <div className='auth-form-container'>
            <AuthFormLogoComponent/>

            <UserAuthDataV1Input 
                type={'text'} 
                id={'sign-up-fullname'} 
                name={'fullName' }
                placeholder={'full name'} 
                style={{ borderColor: validationErrorMessages.fullName ? '#FB5656' : '' }}
                addOns={
                    validationErrorMessages.fullName 
                    ? <span><XIcon/>Full name cannot be emtpy.</span> : ""
                }
            />

            <UserAuthDataV1Input 
                type={'text'} 
                id={'sign-up-username'}
                name={'userName'}
                placeholder={'create username'} 
                onChange={onChangeHandler}
                style={{ 
                    borderColor: validationErrorMessages.userName 
                    || (duplicateErrorMessages && duplicateErrorMessages == "Username already exists.") 
                    ? '#FB5656' : '' 
                }}
                addOns={
                    <>
                     {validationErrorMessages.userName && validationErrorMessages.userName == "Username cannot be empty." 
                     ? <span><XIcon/>Username cannot be empty.</span> : ""}
                     {duplicateErrorMessages && duplicateErrorMessages == "Username already exists."
                     ? <span><XIcon/>Username already exists.</span> : ""}
                    </>
                }
            />
            <UserAuthDataV1Input 
                type={'text'} 
                id={'sign-up-email'} 
                name={'email'} 
                placeholder={'email address'}
                onChange={onChangeHandler}
                style={{ 
                    borderColor: validationErrorMessages.email 
                    || (duplicateErrorMessages && duplicateErrorMessages == "Email already exists.") 
                    ? '#FB5656' : '' 
                }}
                addOns={
                    <>
                    {validationErrorMessages.email && validationErrorMessages.email == "Email cannot be empty." 
                    ? <span><XIcon/>Email cannot be empty.</span> : ""}
                    {validationErrorMessages.email && validationErrorMessages.email == "Email must be a valid email address." 
                    ? <span><XIcon/>Please enter a valid email.</span> : ""}
                    {duplicateErrorMessages && duplicateErrorMessages == "Email already exists." 
                    ? <span><XIcon/>Email already exists</span> : ""}
                    </>
                }
            />
            <UserAuthDataV2Input 
                type={showPassword ? 'text' : 'password'}
                id={'sign-in-password'}
                name={'password' }
                placeholder={'create password'}
                onChange={onChangeHandler}
                changeIcon={showPassword}
                onClick={onClickPasswordVisiblity}
                onFocus={onPasswordFocus}
                onBlur={onPasswordBlur} 
                style={{ borderColor: validationErrorMessages.password ? '#FB5656' : '' }}
                addOns={
                    isPasswordFocused 
                    && <PasswordCriteria isError={validationErrorMessages.password}/> 
                    || validationErrorMessages.password 
                    && <PasswordCriteria isError={validationErrorMessages.password}/>
                }
            /> 

            <ConfirmUserDataComponent 
                type='submit'
                id='sign-in-button'  
                onClick={onSubmitSignUp} 
                onMouseDown={(e) => e.preventDefault()} // To overcome the focus of the password criteria
                onTouchStart={(e) => e.preventDefault()} 
                disabled={loading}
                title={loading ? 'Sign up...' : 'Sign up'}
            />

            <AuthFormDividorComponent/>

            <AuthFormAlternativeComponent message={`Already have an account?`} href={'/sign-in'} title={'Sign in'}/>
        </div>
    )
}

export default SignUpForm