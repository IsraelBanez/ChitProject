import '../styles/page-styles/SignUp.css';

import SignUpForm from '../components/SignUpForm.js';

export default function SignUp({signUpSuccess}){

    return (
        <div className='sign-up-container'>
            <SignUpForm signUpSuccess={signUpSuccess}/>
        </div>
    );
}