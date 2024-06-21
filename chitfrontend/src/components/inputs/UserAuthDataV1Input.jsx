import React from 'react'
import './UserAuthDataV1Input.css';

function UserAuthDataV1Input({type, id, name, placeholder, onChange, style, addOns}) {
    return (
        <div className='user-auth-data-v1-input'>
            <input 
                type={type}
                id={id}
                name={name}  
                placeholder={placeholder}
                onChange={onChange}
                style={style}
            />
            {addOns}
        </div>
    )
}

export default UserAuthDataV1Input