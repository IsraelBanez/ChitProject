import React from 'react'

import NavBar from '../../components/navbar/NavBar';
import BlogContainer from '../../components/blog_container/BlogContainer';
import Footer from '../../components/footer/Footer';

function Blog() {
    return (
        <div>
            <nav className='nav-section'>
                <NavBar/>
            </nav>
            
            <BlogContainer/>
            
            <Footer />
        </div>
    )
}

export default Blog