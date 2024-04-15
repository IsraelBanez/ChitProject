import React from 'react'
import './DCTableHeader.css';

function DCTableHeader() {
    return (
        <div className='dc-table-header'>
            <div className='dc-cell-user'>User</div>
            <div className='dc-cell-amount'>Amount</div>
            <div className='dc-cell-deadline'>Deadline</div>
            <div className='dc-cell-info'>Info</div>
            <div className='dc-cell-more'></div>
        </div>
    )
}

export default DCTableHeader