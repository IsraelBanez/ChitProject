import React from 'react'
import './UserAuthDataV2Input.css';

import {ReactComponent as Eye} from '../../icons/eye.svg';
import {ReactComponent as EyeClosed} from '../../icons/eye-closed.svg';

function UserAuthDataV2Input({type, id, name, placeholder, onChange, changeIcon, onClick, style, addOns}) {
    return (
        <div className='user-auth-data-v2-input-container'>
            <div className='user-auth-data-v2-input'>
                <input 
                    type={type} 
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    style={style}
                />
                <div>
                    {changeIcon ? <Eye onClick={onClick}/> : <EyeClosed onClick={onClick}/>}
                </div>
            </div>
            {addOns}
        </div>

    )
}

export default UserAuthDataV2Input