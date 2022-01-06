import React from "react";

// components
import BantuanBerlangsung from "./BantuanBerlangsung";
import Footer from "./Footer";
import Hero from "./Hero";
import Info from "./Info";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <div>
            <Navbar />
                <div className="container">
                    <Hero />
                    <BantuanBerlangsung />
                    <Info />
                </div>
                <Footer />
            </div>
    )
}

export default Home