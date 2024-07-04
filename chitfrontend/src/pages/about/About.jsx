import React from 'react'

import NavBar from '../../components/navbar/NavBar';
import AboutContainer from '../../components/about_container/AboutContainer';
import Footer from '../../components/footer/Footer';

function About() {
    return (
        <div>
            <NavBar/>
            
            <AboutContainer/>
            
            <Footer />
        </div>
    )
}

export default About