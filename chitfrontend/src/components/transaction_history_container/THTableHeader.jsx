import React from 'react'
import './THTableHeader.css';

function THTableHeader() {
    return (
        <div className='th-table-header'>
            <div className='th-cell-user'>User</div>
            <div className='th-cell-exchange'>Exchange</div>
            <div className='th-cell-for'>For</div>
            <div className='th-cell-date'>Date</div>
            <div className='th-cell-amount'>Amount</div>
            <div className='th-cell-action'>Action</div>
        </div>
    )
}

export default THTableHeader