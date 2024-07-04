import './Home.css';
import {useEffect} from 'react';

import NavBar from '../../components/navbar/NavBar.jsx';

import HomeContainerGuest from '../../components/home_container/HomeContainerGuest.jsx';
import HomeContainer from '../../components/home_container/HomeContainer.jsx';
import Footer from '../../components/footer/Footer.jsx';

import {useAuth} from '../../helpers/AuthContext.js';

export default function Home(){
    const { authenticated } = useAuth();

    return (
            <div className={authenticated ? 'signed-in-container' : 'guest-container'}>
                <NavBar/>
                

                <div className='main-section'>
                    { authenticated ? 
                        <HomeContainer/>
                    :
                        <HomeContainerGuest/>
                    }
                </div>

              
                <Footer/>
            
            </div>
    );
}