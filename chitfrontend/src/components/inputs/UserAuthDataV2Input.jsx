import React, { useRef } from 'react';
import './UserAuthDataV2Input.css';

import {ReactComponent as Eye} from '../../icons/eye.svg';
import {ReactComponent as EyeClosed} from '../../icons/eye-closed.svg';

function UserAuthDataV2Input({type, id, name, placeholder, onChange, changeIcon, onClick, onFocus, onBlur, style, addOns}) {
    const inputRef = useRef(null);

    const handleFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if (onFocus) {
        onFocus();
      }
    };
  
    const handleIconClick = (e) => {
      e.preventDefault();
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if (onClick) {
        onClick();
      }
    };


    return (
        <div className='user-auth-data-v2-input-container'>
            <div className='user-auth-data-v2-input'
                tabIndex='0'
                onFocus={handleFocus}
                onBlur={onBlur}  
            >
                <input 
                    ref={inputRef}
                    type={type} 
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    style={style}
                />
                <div>
                    {changeIcon ? <Eye onClick={handleIconClick}/> : <EyeClosed onClick={handleIconClick}/>}
                </div>
            </div>
            {addOns}
        </div>

    )
}

export default UserAuthDataV2Input