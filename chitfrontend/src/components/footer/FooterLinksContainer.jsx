import React from 'react'
import './FooterLinksContainer.css';

import FooterLinks from './FooterLinks.jsx';
import FooterLinksV2 from './FooterLinksV2.jsx';

function FooterLinksContainer() {
    const links = [
        { 
            title: 'Server', 
            urls: ['/how-it-works', '/billing', '/payment', '/banking', '/wallet', '/cryptocurrency', '/app'], 
            linkTitles: ['How it works', 'Billing', 'Payment', 'Banking', 'Wallet', 'Cryptocurrency', 'App'] 
        },
        { 
            title: 'Business', 
            urls: ['/enterprise', '/advertise', '/marketplace', '/partners'], 
            linkTitles: ['Enterprise', 'Advertise', 'Marketplace', 'Partners'] 
        },
        { 
            title: 'Company', 
            urls: ['/about-us', '/contact-us', '/blog'], 
            linkTitles: ['About us', 'Contact us', 'Blog'] 
        },
        { 
            title: 'Resources', 
            urls: ['/accessibility', '/help-support', '/fees', '/security'], 
            linkTitles: ['Accessibility', 'Help & Support', 'Fees', 'Security'] 
        },
        { 
            title: 'Legals', 
            urls: ['/privacy', '/terms', '/license', '/cookies'], 
            linkTitles: ['Privacy', 'Terms', 'License', 'Cookies'] 
        }
        ,
        { 
            title: 'Socials', 
            urls: ['/facebook', '/linkedIn', '/twitter'], 
            linkTitles: ['Facebook', 'LinkedIn', 'Twitter'] 
        },
    ];

    return (
        <div className='footer-links-container'>
            <FooterLinks links={links} /> 
            <FooterLinksV2 links={links} />
        </div>
    )
}

export default FooterLinksContainer