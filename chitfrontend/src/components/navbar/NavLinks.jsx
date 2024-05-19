import './NavLinks.css';

import {useAuth} from '../../helpers/AuthContext.js';

import NavLink from './NavLink.jsx';

export default function NavLinks(){
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
        <div className='n-mid-region'>
            {navLinks.links.map((link, index) => (
                <NavLink key={index} link={link} url={navLinks.urls[index]}/>
            ))}
        </div>
    );
}