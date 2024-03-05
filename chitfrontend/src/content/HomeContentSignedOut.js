import '../styles/HomeContentSignedOut.css';

import BookLog from '../images/book-log-img.png';

import { Link } from "react-router-dom";

export default function HomeContentSignedOut(){

    return (
            <main className='hcso-container'>
                <div className='intro-section'>
                    <h1>Your Personal <br/> Lending Network</h1>
                    <p>Join our vibrant peer-to-peer community <br/> and start borrowing or lending instantly.</p>
                    <div><Link to="/sign-up">Get Started</Link></div>
                </div>
                <div className='intro-img'> 
                    <img src={BookLog} alt='Book Log Display'/>
                </div>
                
            </main>
    );
}