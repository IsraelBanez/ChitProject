import React from 'react'
import './ConfirmUserDataComponent.css';

function ConfirmUserDataComponent({type, id, onClick, onMouseDown, onTouchStart, disabled, title}) {
    return (
        <div className='confirm-user-data-component'>
            <button 
                className='confirm-user-data-btn'
                type={type}
                id={id}
                onClick={onClick} 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                disabled={disabled}
            >
                {title}
            </button>
        </div>
    )
}

export default ConfirmUserDataComponent