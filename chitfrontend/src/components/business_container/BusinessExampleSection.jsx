import React from 'react'
import './BusinessExampleSection.css';

import TestImage5 from '../../images/test-business-5.jpg';
import TestImage6 from '../../images/test-business-6.jpg';

function BusinessExampleSection() {
    return (
        <section className='business-example-section'>
            <div className='business-example-content-1'>
                <div >
                    <h2>
                        “Lorem ipsum dolor sitamet consectetur.”
                    </h2>
                    <div className='bus-ex-c1-img-container'>
                        <img src={TestImage5} alt='business-test'/>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur. 
                        Dignissim quis ut ac adipiscing. Tellus scelerisque convallis tortor pharetra morbi 
                        eleifend augue varius. Eget sit risus amet faucibus. 
                        Urna sed in pulvinar leo nulla tortor. 
                    </p>
                    <h4>- author</h4>
                </div>
                <div>
                    <img src={TestImage5} alt='business-test'/>
                </div>
            </div>
            <div className='business-example-content-2'>
                <div>
                    <img src={TestImage6} alt='business-test'/>
                </div>
                <div >
                    <h2>
                        “Lorem ipsum dolor sitametconsectetur.”
                    </h2>
                    <div className='bus-ex-c2-img-container'>
                        <img src={TestImage6} alt='business-test'/>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur. 
                        Dignissim quis ut ac adipiscing. Tellus scelerisque convallis tortor pharetra morbi 
                        eleifend augue varius. Eget sit risus amet faucibus. 
                        Urna sed in pulvinar leo nulla tortor. 
                    </p>
                    <h4>- author</h4>
                </div>
            </div>
        </section>
    )
}

export default BusinessExampleSection