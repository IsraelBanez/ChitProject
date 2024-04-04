import React from 'react'
import './BLTableHeader.css';

function BLTableHeader() {
    return (
        <div className='bl-table-header'>
            <div className='bl-cell-amount'>Amount</div>
            <div className='bl-cell-status'>Status</div>
            <div className='bl-cell-exchange'>Exchange</div>
            <div className='bl-cell-for'>For</div>
            <div className='bl-cell-date'>Date</div>
            <div className='bl-cell-deadline'>Deadline</div>
        </div>
    )
}

export default BLTableHeader