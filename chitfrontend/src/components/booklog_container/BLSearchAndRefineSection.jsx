import React, { useEffect, useRef, useState } from 'react';
import './BLSearchAndRefineSection.css';

import SearchBarV1Input from '../inputs/SearchBarV1Input';

import AddFilterButton from '../buttons/AddFilterButton';
import SortByButton from '../buttons/SortByButton';
import MoreButton from '../buttons/MoreButtonV2';

function BLSearchAndRefineSection() {
    const blsarSectionRef = useRef(null);
    const [isNarrow, setIsNarrow] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (blsarSectionRef.current) {
                setIsNarrow(blsarSectionRef.current.offsetWidth <= 540);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className={`bl-search-and-refine-section ${isNarrow ? 'narrow' : ''}`} ref={blsarSectionRef}>
            <div>
                <SearchBarV1Input size={'small'} placeholder="Search" />
            </div>
           
           {/* eventually add a left and right arrow on the sides with blurs ::after to indicate scroll left/ right */}
            <div>
                <AddFilterButton />
    
                <SortByButton/>

                <MoreButton />
            </div>
    
        </section>
    )
}

export default BLSearchAndRefineSection