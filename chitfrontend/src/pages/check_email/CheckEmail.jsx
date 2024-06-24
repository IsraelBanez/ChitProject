import '../signin/AuthPages.css';

import CheckEmailForm from "../../components/check_email_message/CheckEmailForm.jsx";

export default function CheckEmail({userEmail}){
    return (
        <div className='auth-page'>
            <CheckEmailForm userEmail={userEmail} />
        </div>
    );
}