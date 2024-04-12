import React from 'react'
import './CDItemList.css';

import CDItem from './CDItem';

function CDItemList({version}) {
    return (
        <div className='cd-item-list'>
            <CDItem version={version}/>
            <CDItem version={version}/>
            <CDItem version={version}/>
            <CDItem version={version}/>
            <CDItem version={version}/>
        </div>
    )
}

export default CDItemList