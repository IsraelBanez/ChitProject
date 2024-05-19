import React from 'react'
import { Link, useNavigate} from "react-router-dom";
import './NavLink.css';

function NavLink({link, url}) {
    const navigate = useNavigate();

    const onClickButton = (url) =>{
        navigate(url);
    };

    return (
        <button className='nav-link-btn' onClick={() => onClickButton(url)}>{link}</button>
    )
}

export default NavLink