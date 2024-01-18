import '../styles/page-styles/Home.css';

import NavBarGuest from '../components/NavBarGuest';

import HomeSignedOut from '../content/HomeContentSignedOut';

export default function Home(){

    return (
            <div className='home-container'>
                <div className='nav-section'>
                    <NavBarGuest/>
                </div>

                <div className='main-section'>
                    <HomeSignedOut/>

                </div>
                

            </div>
    );
}