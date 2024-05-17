import React from 'react'
import './Footer.css';

import FooterLinksContainer from './FooterLinksContainer.jsx';
import FooterTradeMark from './FooterTradeMark.jsx';

function Footer() {
    return (
        <div className='footer-container'>
            <FooterLinksContainer/>

            <div className='footer-divider'></div>

            <FooterTradeMark/>
        </div>
    )
}

export default Footer