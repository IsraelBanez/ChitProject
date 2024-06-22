import '../signin/AuthPages.css';

import SignUpForm from '../../components/signup_form/SignUpForm.jsx';

export default function SignUp({signUpSuccess}){

    return (
        <div className='auth-page'>
            <SignUpForm signUpSuccess={signUpSuccess}/>
        </div>
    );
}