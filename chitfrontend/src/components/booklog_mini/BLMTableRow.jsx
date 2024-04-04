import React from 'react'
import './BLMTableRow.css';

function BLMTableRow() {
  return (
      <div className='blm-table-row'>
        <div className='blm-tb-cell-info'>
            <span className='blm-amount'>$0.00</span>
            <span className='blm-type'>lent to User</span>
            <span className='blm-time'>Yesterday</span>
            <span className='blm-reason'>Poker</span>
        </div>
        <div className='blm-tb-cell-status'><span>Pending</span></div>
        <div className='blm-tb-cell-deadline'><span>Nov 10, 2024</span></div>
      </div>
  )
}

export default BLMTableRow