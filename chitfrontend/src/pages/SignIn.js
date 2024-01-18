import '../styles/page-styles/SignIn.css';

import SignInForm from '../components/SignInForm.js';

export default function SignIn({signInSuccess}){
    return (
        <div className='sign-in-container'>
            <SignInForm signInSuccess={signInSuccess}/>
        </div>
    );
}