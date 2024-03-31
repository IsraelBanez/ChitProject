import React from 'react'
import './UserProfileButton.css';

function UserProfileButton({size, image: Image}) {
    let imageSize;
    let borderSize;
    
    switch (size) {
        case 'small':
            imageSize = '40px';
            borderSize = '1px';
            break;
        case 'medium':
            imageSize = '60px';
            borderSize = '2px';
            break;
        case 'large':
            imageSize = '80px';
            borderSize = '2px';
            break;
    }

    return (
        <button className='user-profile-btn' style={{borderWidth: borderSize }}>
            <img  src={Image} alt="User Profile Picture" style={{ width: imageSize, height: imageSize}}/> 
        </button>
    )
}

export default UserProfileButton