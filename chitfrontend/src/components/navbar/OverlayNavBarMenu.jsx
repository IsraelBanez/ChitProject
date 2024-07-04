import React from 'react'
import './OverlayNavBarMenu.css';

import {useAuth} from '../../helpers/AuthContext.js';

import OverlayNavLinkButton from './OverlayNavLinkButton.jsx';

import {ReactComponent as XIcon} from '../../icons/x-dark.svg';

function OverlayNavBarMenu({overlayOpen, onClick}) {
    const { authenticated } = useAuth();
    
    const navLinks = authenticated
        ? { 
            links: ['dashboard', 'charts', 'calendar', 'help & support', 'about'],
            urls: ['/dashboard', '/charts', '/calendar', '/help-support', '/about']
        }
        : { 
            links: ['services', 'business', 'blog', 'help & support', 'about'], 
            urls: ['/services', '/business', '/blog', '/help-support', '/about']
        };

    return (
        <div className={overlayOpen ? 'overlay-navbar-menu show' : 'overlay-navbar-menu'} >
            <div className='menu-exit'>
                <button onClick={onClick}><XIcon/></button>
            </div>
            
            <div className='menu-content'>
                {navLinks.links.map((link, index) => (
                    <OverlayNavLinkButton key={index} link={link} url={navLinks.urls[index]}/>
                ))}
            </div>
        </div>
    )
}

export default OverlayNavBarMenu