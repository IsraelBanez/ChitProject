import '../signin/AuthPages.css';

import ForgotPasswordForm from '../../components/forgot_password_form/ForgotPasswordForm.jsx';

export default function ForgotPassword(){
    return (
        <div className='auth-page'>
            <ForgotPasswordForm/>
        </div>
    );
}