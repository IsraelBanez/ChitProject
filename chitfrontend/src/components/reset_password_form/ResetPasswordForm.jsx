import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {useAuth} from '../../helpers/AuthContext.js';

import LogoComponent from '../basics/AuthFormLogoComponent.jsx';
import AuthFormTitleComponent from '../basics/AuthFormTitleComponent.jsx';
import AuthFormInstructionsComponent from '../basics/AuthFormInstructionsComponent.jsx';
import ConfirmUserDataComponent from '../basics/ConfirmUserDataComponent.jsx';
import AuthFormAlternativeComponent from '../basics/AuthFormAlternativeComponent.jsx';

import BadCredentialsWarning from '../displays/BadCredentialsWarning.jsx';
import PasswordCriteria from '../displays/PasswordCriteria.jsx';

import UserAuthDataV2Input from '../inputs/UserAuthDataV2Input.jsx';

import {ReactComponent as XIcon} from '../../icons/x.svg';

function ResetPasswordForm() {
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

    // Handle changes to the reset password data
    const onChangeHandler = (e) => {
        setResetPasswordData({ ...resetPasswordData, [e.target.name]: e.target.value });
    };

    // Diplay or hide password when user clicks the visiblity (eye) icon
    const onClickPasswordVisiblityOne = () => {
        setShowPasswordOne((prevShowPassword) => !prevShowPassword);
    };
    const onClickPasswordVisiblityTwo = () => {
        setShowPasswordTwo((prevShowPassword) => !prevShowPassword);
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

    return (
        <div className='auth-form-container'>
            <LogoComponent/>

            <AuthFormTitleComponent title={'Reset your password'}/> 
           
            <AuthFormInstructionsComponent 
                instructions={
                <>
                    Enter a new password to reset the password on your account.<br/>
                    Make sure not to reuse your old password.
                </>}
            />

            {invalidJWTokenErrorMessage && 
            <BadCredentialsWarning message={"Invalid authentication token. Check your invite link or try resetting again."}/>}
            
            <UserAuthDataV2Input 
                type={showPasswordOne ? 'text' : 'password'}
                id={'reset-new-password'} 
                name={'newPassword'} 
                placeholder={'create new password'}
                onChange={onChangeHandler}
                style={{ borderColor: validationErrorMessages.newPassword ||oldPasswordErrorMessage ?  '#FB5656' : '' }}
                containerStyle={{marginBottom: '30px'}}
                changeIcon={showPasswordOne}
                onClick={onClickPasswordVisiblityOne}
                addOns={
                    <>
                        {oldPasswordErrorMessage 
                        ? <span className='rp-error'><XIcon/>New password cannot be the same as old passwords.</span> : ""}
                        <PasswordCriteria isError={validationErrorMessages.newPassword}/> 
                    </>
                }
            />

            <UserAuthDataV2Input 
                type={showPasswordTwo ? 'text' : 'password'}
                id={'reset-confirm-password'} 
                name={'confirmNewPassword'} 
                placeholder={'confirm password'}
                onChange={onChangeHandler}
                style={{ borderColor: validationErrorMessages.confirmNewPassword || matchPasswordErrorMessage ? '#FB5656' : ''}}
                changeIcon={showPasswordTwo}
                onClick={onClickPasswordVisiblityTwo}
                addOns={
                    <>
                        {validationErrorMessages.confirmNewPassword 
                        && validationErrorMessages.confirmNewPassword == "Confirm passsword cannot be empty." 
                        ? <span className='rp-error'><XIcon/>Confirm passsword cannot be empty.</span> : ""}
                        {matchPasswordErrorMessage 
                        ? <span className='rp-error'><XIcon/>Password must match new password.</span> : ""}
                    </>
                }
            />

            <ConfirmUserDataComponent 
                type='submit'
                id='reset-button'  
                onClick={onSubmitResetPassword} 
                disabled={loading}
                title={loading ? 'Reset Password...' : 'Reset Password'}
            />

            <AuthFormAlternativeComponent message={``} href={'/sign-in'} title={'Return to Sign in'} style={{margin: '0px'}}/>

        </div>
    )
}

export default ResetPasswordForm