import '../styles/page-styles/Home.css';
import {useEffect} from 'react';

import NavBar from '../components/NavBar';

import HomeSignedOut from '../content/HomeContentSignedOut.js';
import HomeSignedIn from '../content/HomeContentSignedIn.js';

import {useAuth} from '../helpers/AuthContext.js';

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