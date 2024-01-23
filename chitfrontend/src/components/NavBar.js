import '../styles/component-styles/NavBar.css';
import { useNavigate } from "react-router-dom";

import NavLinks from './NavLinks.js'

import Logo from '../icons/logo.png';


export default function NavBar(){
    const navigate = useNavigate();

    const signInPage = () => {
        navigate("/sign-in");
    };

    return (
            <div className='navbar-container'>
                <div className='n-left-region'>
                    <img src={Logo} alt='chit logo'/>
                </div>
                <NavLinks />
                <div className='n-right-region'>
                    <div className='n-sign-in-btn' onClick={() => signInPage()}>
                        Sign in
                    </div>
                </div>
            </div>
    );
}