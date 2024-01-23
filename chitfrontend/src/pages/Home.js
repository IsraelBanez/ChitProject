import '../styles/page-styles/Home.css';

import NavBar from '../components/NavBar';

import HomeSignedOut from '../content/HomeContentSignedOut';

export default function Home(){

    return (
            <div className='home-container'>
                <div className='nav-section'>
                    <NavBar/>
                </div>

                <div className='main-section'>
                    <HomeSignedOut/>

                </div>
                

            </div>
    );
}