import React from 'react'
import './BLMTableHeader.css'

function BLMTableHeader() {
  return (
        <div className='blm-table-header'>
            <div className='blm-cell-info'>Info</div>
            <div className='blm-cell-status'>Status</div>
            <div className='blm-cell-deadline'>Deadline</div>
        </div>
  )
}

export default BLMTableHeader