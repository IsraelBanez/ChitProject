import '../signin/AuthPages.css';

import ResetPasswordForm from "../../components/reset_password_form/ResetPasswordForm.jsx";

export default function ResetPassword(){
    return (
        <div className='auth-page'>
            <ResetPasswordForm />
        </div>
    );
}