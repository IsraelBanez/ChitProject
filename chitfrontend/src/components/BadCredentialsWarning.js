import '../styles/component-styles/BadCredentialsWarning.css';

import X from '../icons/x.svg';

// Display bad credentials warning
export default function BadCredentialsWarning(){
    return (
        <div className='bad-credits'>
            <span>
                <img src={X}  alt="x error" />
                The email or password provided is invalid. Please try again.
            </span>
        </div>
    );
}