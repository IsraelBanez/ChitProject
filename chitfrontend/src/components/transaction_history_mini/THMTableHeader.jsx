import React from 'react'
import './THMTableHeader.css';

function THMTableHeader() {
    return (
        <div className='t-table-header'>
            <div className='t-th-cell-user'>User</div>
            <div className='t-th-cell-info'>Info</div>
            <div className='t-th-cell-amount'>Amount</div>
        </div>
    )
}

export default THMTableHeader