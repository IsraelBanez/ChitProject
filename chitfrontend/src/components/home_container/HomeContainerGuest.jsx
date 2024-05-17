import './HomeContainerGuest.css';

import BookLog from '../../images/book-log-img.png';

import { Link } from "react-router-dom";

export default function HomeContainerGuest(){

    return (
            <main className='hcg-container'>
                <div className='hcg-header'>
                    <div className='intro-section'>
                        <h1>Your Personal <br/> Lending Network</h1>
                        <p>Join our vibrant peer-to-peer community <br/> and start borrowing or lending instantly.</p>
                        <div>
                            <button>
                                <Link to="/sign-up">Get Started</Link>
                            </button>
                        </div>
                    </div>
                    <div className='intro-img'> 
                        <img src={BookLog} alt='Book Log Display'/>
                    </div>
                </div>
            </main>
    );
}