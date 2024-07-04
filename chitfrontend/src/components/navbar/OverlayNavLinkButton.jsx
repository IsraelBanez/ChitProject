import React from 'react'
import {useNavigate} from "react-router-dom";
import './OverlayNavLinkButton.css';

function OverlayNavLinkButton({link, url}) {
    const navigate = useNavigate();

    const onClickButton = (url) =>{
        navigate(url);
    };

    return (
        <button className='overlay-nav-link-btn' onClick={() => onClickButton(url)}>{link}</button>
    )
}

export default OverlayNavLinkButton