import './CheckEmail.css';

import CheckEmailMessage from "../../components/check_email_message/CheckEmailMessage.jsx";

export default function CheckEmail({userEmail}){
    return (
        <div className='check-email-container'>
            <CheckEmailMessage userEmail={userEmail} />
        </div>
    );
}