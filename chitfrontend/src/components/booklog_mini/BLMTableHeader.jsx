import React from 'react'
import './BLMTableHeader.css'

function BLMTableHeader() {
  return (
        <div className='blm-table-header'>
            <div className='blm-th-cell-info'>Info</div>
            <div className='blm-th-cell-status'>Status</div>
            <div className='blm-th-cell-deadline'>Deadline</div>
        </div>
  )
}

export default BLMTableHeader