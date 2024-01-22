import '../styles/page-styles/CheckEmail.css';

import CheckEmailMessage from "../components/CheckEmailMessage.js";

export default function CheckEmail({userEmail}){
    return (
        <div className='check-email-container'>
            <CheckEmailMessage userEmail={userEmail} />
        </div>
    );
}