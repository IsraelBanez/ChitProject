import '../styles/component-styles/PasswordCriteria.css';

import Dot from '../icons/dot.svg';
import RedDot from '../icons/dot-red.svg';

// Display password criteria for users
export default function PasswordCriteria({isError}) {
    return (
        <div className='password-criteria'>
            <span style={{ color: isError ? '#FB5656' : '' }}>
                <img src={isError ? RedDot : Dot}  alt="Dot" />
                must be at least 10 characters
            </span>
            <span style={{ color: isError ? '#FB5656' : '', fill: isError ? '#FB5656' : ''}} >
                <img src={isError ? RedDot : Dot}  alt="Dot" />
                contain an uppercase letter
            </span>
            <span style={{ color: isError ? '#FB5656' : '', fill: isError ? '#FB5656' : ''}} >
                <img src={isError ? RedDot : Dot}  alt="Dot" />
                contain a special character
            </span>
            <span style={{ color: isError ? '#FB5656' : '', fill: isError ? '#FB5656' : ''}} >
                <img src={isError ? RedDot : Dot}  alt="Dot" />
                contain a number
            </span>
        </div>
    );
}