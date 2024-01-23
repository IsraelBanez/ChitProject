import '../styles/component-styles/NavBar.css';

import {useAuth} from '../helpers/AuthContext.js';

export default function NavLinks(){
    const { authenticated } = useAuth();

    return (
        <>
        {
            authenticated ? 
            <div className='n-mid-region'>
                <div>
                    dashboard
                </div>
                <div>
                    transaction
                </div>
                <div>
                    network
                </div>
                <div>
                    deadline / reminder
                </div>
                <div>
                    help & support
                </div>
                <div>
                    about
                </div>
            </div>
            :
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
        }           
        </>
    );
}