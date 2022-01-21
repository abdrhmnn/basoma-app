import React, { useEffect } from "react";

// components
import Footer from "./Footer";
import Hero from "./Hero";
import Info from "./Info";
import Navbar from "./Navbar";

const Home = () => {

    useEffect(() => {
        document.title = "Bantuan Sosial Masyarakat"
    }, [])

    return (
        <div>
            <Navbar />
                <div className="container">
                    <Hero />
                    <Info />
                </div>
            <Footer />
        </div>
    )
}

export default Home