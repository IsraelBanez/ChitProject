import '../styles/NavBar.css';
import { useNavigate } from "react-router-dom";
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
                <div className='n-mid-region'>
                    <div>
                        services
                    </div>
                    <div>
                        business
                    </div>
                    <div>
                        blog
                    </div>
                    <div>
                        help & support
                    </div>
                    <div>
                        about
                    </div>
                </div>
                <div className='n-right-region'>
                    <div className='n-sign-in-btn' onClick={() => signInPage()}>
                        Sign in
                    </div>
                </div>
            </div>
    );
}