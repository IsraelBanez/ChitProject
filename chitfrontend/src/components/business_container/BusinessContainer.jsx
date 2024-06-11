import React from 'react'
import './BusinessContainer.css';

import BusinessHeaderSection from './BusinessHeaderSection';
import BusinessPaymentSection from './BusinessPaymentSection';
import BusinessFinancialSection from './BusinessFinancialSection';
import BusinessCommunitySection from './BusinessCommunitySection';
import BusinessExampleSection from './BusinessExampleSection';
import BusinessContactSection from './BusinessContactSection';

function BusinessContainer() {
    return (
        <main className='business-container'>
            <BusinessHeaderSection/>
            <BusinessPaymentSection/>
            <BusinessFinancialSection/>
            <BusinessCommunitySection/>
            <BusinessExampleSection/>
            <BusinessContactSection/>
        </main>
    )
}

export default BusinessContainer