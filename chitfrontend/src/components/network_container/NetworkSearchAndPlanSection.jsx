import React, { useEffect, useRef, useState } from 'react';
import './NetworkSearchAndPlanSection.css';

import SearchBarV1Input from '../inputs/SearchBarV1Input';

import CalendarCheckButton from '../buttons/CalendarCheckButton';
import QRCodeButton from '../buttons/QRCodeButton';

function NetworkSearchAndPlanSection() {
    const nsapSectionRef = useRef(null);
    const [isNarrow, setIsNarrow] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (nsapSectionRef.current) {
                setIsNarrow(nsapSectionRef.current.offsetWidth <= 540);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className={`n-search-and-plan-section ${isNarrow ? 'narrow' : ''}`} ref={nsapSectionRef}>
            <div>
                <SearchBarV1Input size={'small'} placeholder="Search" />
            </div>
        
            {/* eventually add a left and right arrow on the sides with blurs ::after to indicate scroll left/ right */}
            <div>
                <CalendarCheckButton />

                <QRCodeButton/>
            </div>

        </section>
    )
}

export default NetworkSearchAndPlanSection