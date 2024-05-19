import React from 'react'
import './FooterTradeMark.css';

import {ReactComponent as LogoFooter} from '../../icons/logo.svg';

function FooterTradeMark() {
    return (
        <div className='footer-trademark-container'>
            <LogoFooter/>
            <h4>© 2023 Chit. All rights reserved.</h4>
        </div>
    )
}

export default FooterTradeMark