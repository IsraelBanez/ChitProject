import '../styles/component-styles/BadCredentialsWarning.css';

import X from '../icons/x.svg';

// Display bad credentials warning
export default function BadCredentialsWarning({message}){
    return (
        <div className='bad-credits'>
            <span>
                <img src={X}  alt="x error" />
                {message}
            </span>
        </div>
    );
}