import React from 'react'
import './ListInfoItemsComponent.css';

import InfoItemComponent from './InfoItemComponent';

function ListInfoItemsComponent({type}) {
    let listItem;

    switch (type) {
        case 'network':
            listItem = <InfoItemComponent type={'network'}/>;
            break;
        case 'messages':
            listItem = <InfoItemComponent type={'messages'}/>;
            break;        
        default:
            listItem = <InfoItemComponent/>;
            break;
    };

    return (
        <div className='list-info-items-component'>
            {listItem}
            {listItem}
            {listItem}
        </div>
    )
}

export default ListInfoItemsComponent