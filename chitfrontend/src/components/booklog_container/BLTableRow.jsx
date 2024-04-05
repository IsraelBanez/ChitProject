import React from 'react'
import './BLTableRow.css';

function BLTableRow() {
    return (
        <div className='bl-table-row'>
            <div className='bl-cell-amount'><h4>$0.00</h4></div>
            <div className='bl-cell-status'><span>Pending</span></div>
            {/*  TODO: Put a tool tip to show username if username is too big  */}
            <div className='bl-cell-exchange'><h4><u>lent</u> to <a href=''>User</a></h4></div> 
            <div className='bl-cell-for'><h4>Poker from last night </h4></div>
            <div className='bl-cell-date'><span>Nov 23,2024</span></div>
            <div className='bl-cell-deadline'><span>Nov 24, 2024</span></div>
        </div>
    )
}

export default BLTableRow