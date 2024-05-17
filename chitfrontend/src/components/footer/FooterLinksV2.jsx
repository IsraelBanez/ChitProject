import React, { useState } from 'react';
import './FooterLinksV2.css';

import {ReactComponent as DownArrow} from '../../icons/down-arrow.svg';

function FooterLinksV2({links}) {
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <>
            {links.map((linkItem, index) => (
                <div className='footer-links-v2' key={index}>
                    <div className='fl-v2-titles' onClick={() => onTitleClick(index)}>
                        <h3>{linkItem.title}</h3>
                        <DownArrow className={activeIndex === index ? 'rotated' : ''} />
                    </div>

                    <ul className={activeIndex === index ? 'open' : ''}>
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

export default FooterLinksV2