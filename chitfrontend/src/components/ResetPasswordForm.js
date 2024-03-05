import '../styles/component-styles/ResetPasswordForm.css';
import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";

import Logo from '../images/logo-big.png';
import Eye from '../icons/eye.svg';
import EyeClosed from '../icons/eye-closed.svg';
import X from '../icons/x.svg';

import {useAuth} from '../helpers/AuthContext.js';

import PasswordCriteria from './PasswordCriteria';
import BadCredentialsWarning from './BadCredentialsWarning.js';

export default function ResetPasswordForm(){
    const { resetPasswordHandler } = useAuth();
    const navigate = useNavigate();
    const [resetPasswordData, setResetPasswordData] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });
    const [showPasswordOne, setShowPasswordOne] = useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState(false);
    const [validationErrorMessages, setValidationErrorMessages] = useState({});
    const [matchPasswordErrorMessage, setMatchPasswordErrorMessage] = useState(null);
    const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState(null);
    const [invalidJWTokenErrorMessage, setInvalidJWTokenErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Diplay or hide password when user clicks the visiblity (eye) icon
    const onClickPasswordVisiblityOne = () => {
        setShowPasswordOne((prevShowPassword) => !prevShowPassword);
    };
    const onClickPasswordVisiblityTwo = () => {
        setShowPasswordTwo((prevShowPassword) => !prevShowPassword);
    };

    // Handle changes to the reset password data
    const onChangeHandler = (e) => {
        setResetPasswordData({ ...resetPasswordData, [e.target.name]: e.target.value });
    };

    // Submit the reset password form
    const onSubmitResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await resetPasswordHandler(resetPasswordData);
            // On success, navigate back to home screen and return status
            console.log('[Successful password reset]');
            navigate('/sign-in'); 
        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with a status code outside of 2xx
                console.error('[Failed to reset password]', error.response.data);
                console.error('[Status]', error.response.status);

                // Handle password error
                if (error.response.data.detail){
                    console.error('[Failed to reset password]', error.response.data.detail);
                    if (error.response.data.detail == "New passwords do not match."){
                        setMatchPasswordErrorMessage(error.response.data.detail);
                        setInvalidJWTokenErrorMessage(null);
                        setOldPasswordErrorMessage(null); 
                    } else if (error.response.data.detail == "New password cannot be the same as old passwords."){
                        setOldPasswordErrorMessage(error.response.data.detail);
                        setInvalidJWTokenErrorMessage(null);
                        setMatchPasswordErrorMessage(null);
                    } else{
                        setInvalidJWTokenErrorMessage(error.response.data.detail);
                        setMatchPasswordErrorMessage(null);
                        setOldPasswordErrorMessage(null); 
                    }
                } else{
                    setMatchPasswordErrorMessage(null);
                    setInvalidJWTokenErrorMessage(null);
                    setOldPasswordErrorMessage(null);
                }
                
                // Handle Validation Error
                setValidationErrorMessages(error.response.data);
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('[Failed to reset password]', 'No response received');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('[Failed to reset password]', error.message);
            }
        } finally {
            setLoading(false);
        };
    };

    return(
        <div className='reset-pswd-form'>
            {/* Logo Section */}
            <img src={Logo} alt='chit logo'/>

            {/* Title Section */}
            <div className='rp-title'>
                <h1 >Reset your password</h1>
            </div>

            {/* Reset Password Message Section */}
            <div className='rp-message'>
                <p>
                    Enter a new password to reset the password on your account.<br/>
                    Make sure not to reuse your old password.
                </p>
            </div>

            {/* User Update Data Section */}
            <div className='rp-user-data'>
                {invalidJWTokenErrorMessage && <BadCredentialsWarning message={"Invalid authentication token. Check your invite link or try resetting again."}/>}

                {/* Handle new password */}
                <div className='rp-password-region'>
                    <div className='rp-password'>
                        <input 
                            type={showPasswordOne ? 'text' : 'password'}
                            id='reset-new-password' 
                            name='newPassword' 
                            placeholder='create new password'
                            onChange={onChangeHandler}
                            style={{ borderColor: validationErrorMessages.newPassword ||oldPasswordErrorMessage ?  '#FB5656' : '' }}
                        />   
                        <img src={showPasswordOne ? Eye : EyeClosed} alt='password visibility' onClick={onClickPasswordVisiblityOne}/>
                    </div>
                    {oldPasswordErrorMessage ? <span className='rp-error'><img src={X} alt='x error'/>New password cannot be the same as old passwords.</span> : ""}
                    <PasswordCriteria isError={validationErrorMessages.newPassword}/> 
                </div>

                {/* Handle confirm password */}
                <div className='rp-password-region'>
                    <div className='rp-password'>
                        <input 
                            type={showPasswordTwo ? 'text' : 'password'}
                            id='reset-confirm-password' 
                            name='confirmNewPassword' 
                            placeholder='confirm password'
                            onChange={onChangeHandler}
                            style={{ borderColor: validationErrorMessages.confirmNewPassword || matchPasswordErrorMessage ? '#FB5656' : '' }}
                        />   
                        <img src={showPasswordTwo ? Eye : EyeClosed} alt='password visibility' onClick={onClickPasswordVisiblityTwo}/>
                    </div>
                    {validationErrorMessages.confirmNewPassword && validationErrorMessages.confirmNewPassword == "Confirm passsword cannot be empty." ? <span className='rp-error'><img src={X} alt='x error'/>Confirm passsword cannot be empty.</span> : ""}
                    {matchPasswordErrorMessage ? <span className='rp-error'><img src={X} alt='x error'/>Password must match new password.</span> : ""}
                </div>
            </div>

            {/* Reset Button Section */}
            <button 
                type='submit' 
                id='reset-button' 
                onClick={onSubmitResetPassword} 
                className='rp-reset-pswd-btn'
                disabled={loading} 
            >
                {loading ? 'Reset Password...' : 'Reset Password'}
            </button>
    
            {/* Alternative Section */}
            <div className='rp-alternative'>
                <Link to="/sign-in" className='rp-sign-in-link'>Return to Sign in</Link>
            </div>
        </div>
    );
}