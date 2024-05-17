import React, { useState, useEffect } from 'react';
import './FooterLinks.css';

function FooterLinks({links}) {

    return (
        <>
            {links.map((linkItem, index) => (
                <div className='footer-links' key={index}>
                    <h3>{linkItem.title}</h3>
                    <ul>
                        {linkItem.urls.map((url, i) => (
                            <li key={i}>
                                <a href={url}>{linkItem.linkTitles[i]}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    )
}

export default FooterLinks