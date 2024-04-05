import React from 'react'
import './BLMTableRow.css';

function BLMTableRow() {
  return (
    <div class='blm-table-row'>
      <div class='blm-cell-info '>
        <h4 className='blm-amount'>$0.00</h4>
        <h4 className='blm-exchange'><u>lent</u> to <a href=''>User</a></h4>
        <h4 className='blm-time'>Yesterday</h4>
        <h4 className='blm-for'>Poker for last night's game</h4>
      </div>
      <div className='blm-cell-status'><span>Pending</span></div>
      <div className='blm-cell-deadline'><span>Nov 10, 2024</span></div>
    </div>
  )
}

export default BLMTableRow