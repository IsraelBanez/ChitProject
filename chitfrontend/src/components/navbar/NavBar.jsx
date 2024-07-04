import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { useNavigate } from "react-router-dom";

import NavLinks from './NavLinks.jsx';
import OverlayNavBarMenu from './OverlayNavBarMenu.jsx';

import Profile from '../../icons/profile-icon.svg';
import {ReactComponent  as Menu} from '../../icons/hamburger-menu.svg';
import {ReactComponent as Logo} from '../../icons/logo.svg';

import {useAuth} from '../../helpers/AuthContext.js';

export default function NavBar(){
    const { authenticated } = useAuth();
    const navigate = useNavigate();
    const [overlayOpen, setOverlayOpen] = useState(false);

    const signInPage = () => {
        navigate("/sign-in");
    };

    const homePage = () => {
        navigate("/");
    };

    const toggleOverlayMenu = () => {
        if (window.innerWidth <= 842) {
            setOverlayOpen(!overlayOpen);

            if (!overlayOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    };
    // If menu grows past 842px, untrigger the menu overlay whilst its active
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 842 && overlayOpen) {
                setOverlayOpen(false);
                document.body.style.overflow = 'auto';
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [overlayOpen]);

    return (
            <nav className='navbar-container' style={{padding: !authenticated ? '0px 10%' : '0px 1%'} }>

                <div className='n-left-region' onClick={ homePage}><Logo /></div>

                <NavLinks />

                <div className='n-right-region'>
                    {authenticated ?
                    <button className='n-logged-in-btn'>
                        <img src={Profile} alt="Picture of user or profile icon"/>
                    </button>   
                    : 
                    <div className='n-sign-in-btn' onClick={() => signInPage()}>
                        Sign in
                    </div>
                    }
                    <button className='n-menu-btn' onClick={toggleOverlayMenu}>
                        <Menu/>
                    </button>
                </div>

                <OverlayNavBarMenu overlayOpen={overlayOpen} onClick={toggleOverlayMenu}/>
            </nav>
    );
}