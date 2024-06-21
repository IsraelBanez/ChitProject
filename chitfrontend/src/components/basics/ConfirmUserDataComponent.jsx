import React from 'react'
import './ConfirmUserDataComponent.css';

function ConfirmUserDataComponent({type, id, onClick, disabled, title}) {
    return (
        <div className='confirm-user-data-component'>
            <button 
                className='confirm-user-data-btn'
                type={type}
                id={id}
                onClick={onClick} 
                disabled={disabled}
            >
                {title}
            </button>
        </div>
    )
}

export default ConfirmUserDataComponent