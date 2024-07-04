import './BadCredentialsWarning.css';

import {ReactComponent as XIcon} from '../../icons/x-red.svg';

// Display bad credentials warning
export default function BadCredentialsWarning({message}){
    return (
        <div className='bad-credits'>
            <span>
                <XIcon/>
                {message}
            </span>
        </div>
    );
}