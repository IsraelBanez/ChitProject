import React from 'react'
import './CreditorsDebtorsSection.css';

import CDItemHeader from './CDItemHeader';
import CDItemList from './CDItemList';

function CreditorsDebtorsSection({version}) {
    let sectionTitle;

    switch (version) {
        case 'creditors':
            sectionTitle =  "Creditors";
            break;
        case 'debtors':
            sectionTitle = "Debtors";
            break;
        default:
            break;
    };
    return (
        <section className='creditors-debtors-section'>
            <CDItemHeader sectionTitle={sectionTitle}/>

            <CDItemList version={version} />
        </section>
    )
}

export default CreditorsDebtorsSection