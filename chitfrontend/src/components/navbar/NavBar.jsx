import './NavBar.css';
import { useNavigate } from "react-router-dom";

import NavLinks from './NavLinks.jsx';

import Profile from '../../icons/profile-icon.svg';
import {ReactComponent  as Menu} from '../../icons/hamburger-menu.svg';
import {ReactComponent as Logo} from '../../icons/logo.svg';

import {useAuth} from '../../helpers/AuthContext.js';

export default function NavBar(){
    const { authenticated } = useAuth();
    const navigate = useNavigate();

    const signInPage = () => {
        navigate("/sign-in");
    };

    const homePage = () => {
        navigate("/");
    };

    return (
            <div className='navbar-container' style={{padding: !authenticated ? '0px 10%' : '0px 1%'} }>

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
                    <button className='n-menu-btn'>
                        <Menu/>
                    </button>
                </div>
            </div>
    );
}