import './AuthPages.css';

import SignInForm from '../../components/signin_form/SignInForm.jsx';

export default function SignIn({signInSuccess}){
    return (
        <div className='auth-page'>
            <SignInForm signInSuccess={signInSuccess}/>
        </div>
    );
}