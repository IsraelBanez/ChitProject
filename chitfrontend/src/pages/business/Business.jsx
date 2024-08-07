import React from 'react'

import NavBar from '../../components/navbar/NavBar';
import BusinessContainer from '../../components/business_container/BusinessContainer';
import Footer from '../../components/footer/Footer';

function Business() {
    return (
        <div>
            <NavBar/>
        
            <BusinessContainer/>
            
            <Footer />
        </div>
    )
}

export default Business