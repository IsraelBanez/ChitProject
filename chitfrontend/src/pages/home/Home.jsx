import './Home.css';
import {useEffect} from 'react';

import NavBar from '../../components/navbar/NavBar.jsx';

import HomeSignedOut from '../../components/home_container/HomeontainerGuest.jsx';
import HomeSignedIn from '../../components/home_container/HomeContainer.jsx';

import {useAuth} from '../../helpers/AuthContext.js';

export default function Home(){
    const { authenticated } = useAuth();

    return (
            <div className='home-container'>
                <nav className='nav-section'>
                    <NavBar/>
                </nav>

                <div className='main-section'>
                    { !authenticated ? 
                        <HomeSignedIn/>
                    :
                        <HomeSignedOut/>
                    }
                </div>
            </div>
    );
}