import React from 'react'
import './ListItemsSection.css';

import InfoItem from './InfoItem';

function ListItemsSection({type}) {
    let listItem;

    switch (type) {
        case 'network':
            listItem = <InfoItem type={'network'}/>;
            break;
        case 'messages':
            listItem = <InfoItem type={'messages'}/>;
            break;        
        default:
            listItem = <InfoItem/>;
            break;
    };

    return (
        <section className='friends-list-section'>
            {listItem}
            {listItem}
            {listItem}
        </section>
    )
}

export default ListItemsSection