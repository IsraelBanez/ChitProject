import './Home.css';
import {useEffect} from 'react';

import NavBar from '../../components/navbar/NavBar.jsx';

import HomeSignedOut from '../../components/home_container/HomeContainerGuest.jsx';
import HomeSignedIn from '../../components/home_container/HomeContainer.jsx';
import Footer from '../../components/footer/Footer.jsx';

import {useAuth} from '../../helpers/AuthContext.js';

export default function Home(){
    const { authenticated } = useAuth();

    return (
            <div className='home-container'>
                <nav className='nav-section'>
                    <NavBar/>
                </nav>

                <div className='main-section'>
                    { authenticated ? 
                        <HomeSignedIn/>
                    :
                        <HomeSignedOut/>
                    }
                </div>

                <footer className='footer-section'>
                    <Footer/>
                </footer>
            </div>
    );
}