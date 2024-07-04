import React from 'react'

import NavBar from '../../components/navbar/NavBar';
import HelpSupportContainer from '../../components/help_support_container/HelpSupportContainer';
import Footer from '../../components/footer/Footer';

function HelpSupport() {
    return (
        <div>
            <NavBar/>
            
            <HelpSupportContainer/>

            <Footer />
        </div>
    )
}

export default HelpSupport