import React from 'react'
import './QRCodeButton.css';

import {ReactComponent as QRCodeIcon} from '../../icons/qr-code.svg';

function QRCodeButton() {
    return (
        <button className='qr-code-btn'><QRCodeIcon/>QR code</button>
    )
}

export default QRCodeButton