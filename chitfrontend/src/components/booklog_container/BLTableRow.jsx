import React from 'react'
import './BLTableRow.css';

function BLTableRow() {
    return (
        <div className='bl-table-row'>
            <div className='bl-cell-amount'><span>$0.00</span></div>
            <div className='bl-cell-status'><span>Pending</span></div>
            {/*  TODO: Put a tool tip to show username if username is too big  */}
            <div className='bl-cell-exchange'><span><u>lent</u> to <a href=''>User</a></span></div> 
            <div className='bl-cell-for'><span>Poker from last night </span></div>
            <div className='bl-cell-date'><span>Nov 23,2024</span></div>
            <div className='bl-cell-deadline'><span>Nov 24, 2024</span></div>
        </div>
    )
}

export default BLTableRow