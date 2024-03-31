import React from 'react'
import './BLMTableRow.css';

function BLMTableRow() {
  return (
      <div className='bl-table-row'>
        <div className='bl-tb-cell-info'>
            <span className='bl-amount'>$0.00</span>
            <span className='bl-type'>lent to User</span>
            <span className='bl-time'>Yesterday</span>
            <span className='bl-reason'>Poker</span>
        </div>
        <div className='bl-tb-cell-status'><span>Pending</span></div>
        <div className='bl-tb-cell-deadline'><span>Nov 10, 2024</span></div>
      </div>
  )
}

export default BLMTableRow