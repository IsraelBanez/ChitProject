import React from 'react'
import './BLMTableHeader.css'

function BLMTableHeader() {
  return (
        <div className='bl-table-header'>
            <div className='bl-th-cell-info'>Info</div>
            <div className='bl-th-cell-status'>Status</div>
            <div className='bl-th-cell-deadline'>Deadline</div>
        </div>
  )
}

export default BLMTableHeader