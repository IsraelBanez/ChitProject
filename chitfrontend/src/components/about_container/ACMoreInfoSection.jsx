import React from 'react'
import './ACMoreInfoSection.css';

import MoreInfoCard from './MoreInfoCard';

import TestImage4 from '../../images/test-about-4.jpg';
import TestImage5 from '../../images/test-about-5.jpg';
import TestImage6 from '../../images/test-about-6.jpg';

function ACMoreInfoSection() {
    return (
        <section className='ac-more-info-section'>
            <MoreInfoCard 
                image={TestImage4}
                title={'Our Principles'}
                description={'Lorem ipsum dolor sitamet consectetur. Enim blandit'}
            />
            <MoreInfoCard 
                image={TestImage5}
                title={'Our work flow'}
                description={'Lorem ipsum dolor sitamet consectetur. Enim blandit'}
            />
            <MoreInfoCard 
                image={TestImage6}
                title={'Our impact'}
                description={'Lorem ipsum dolor sitamet consectetur. Enim blandit'}
            />
        </section>
    )
}

export default ACMoreInfoSection