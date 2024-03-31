import './SignUp.css';

import SignUpForm from '../../components/signup_form/SignUpForm.jsx';

export default function SignUp({signUpSuccess}){

    return (
        <div className='sign-up-container'>
            <SignUpForm signUpSuccess={signUpSuccess}/>
        </div>
    );
}