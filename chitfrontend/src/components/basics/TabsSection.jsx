import React, { useState } from 'react';
import './TabsSection.css';

import TabButton from '../buttons/TabButton';

function TabsSection({type}) {
    const [activeTab, setActiveTab] = useState(0);
    let tabs;

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    switch (type) {
        case 'network':
            tabs = ['Friends', 'Groups', 'Requests', 'Liaisons'];
            break;
        case 'messages':
            tabs = ['All', 'Groups', 'Liaisons'];
            break;
        case 'notifications':
            tabs = ['All', 'Mentions'];
            break;
        default:
            tabs = ['dam', 'something', 'is', 'not', 'working'];
            break;
    };
    
    return (
        <div className='tabs-section'>
            {tabs.map((tab, index) => (
                <TabButton 
                    key={index} 
                    title={tab}
                    isActive={index === activeTab}
                    onClick={() => handleTabClick(index)}
                />
            ))}
        </div>
    )
}

export default TabsSection