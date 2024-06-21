import './SignIn.css';

import SignInForm from '../../components/signin_form/SignInForm.jsx';

export default function SignIn({signInSuccess}){
    return (
        <div className='sign-in-page'>
            <SignInForm signInSuccess={signInSuccess}/>
        </div>
    );
}