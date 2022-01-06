import React from "react"

// components


// img


// npm packages
import { NavLink, Link } from "react-router-dom"
import { AiFillInstagram, AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="footer foot_foot">
            <h1>Basoma</h1>
            <div className="footer_nav">
                <ul>
                    <li>
                        <NavLink
                            exact="true"
                            to="/"
                            className={({ isActive }) => (isActive ? 'active_foot' : 'unselected_foot')}
                        >Beranda</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            exact="true"
                            to="/bantuan"
                            className={({ isActive }) => (isActive ? 'active_foot' : 'unselected_foot')}
                        >Bantuan</NavLink>
                    </li>
                    <li>
                        <NavLink
                            exact="true"
                            to="/tentang"
                            className={({ isActive }) => (isActive ? 'active_foot' : 'unselected_foot')}
                        >Tentang</NavLink>
                    </li>
                </ul>
            </div>
            <hr />
            <div className="footer_sosmed">
                <div className="footer_created">
                    <h2>Created by. Team JAI</h2>
                </div>
                <div className="footer_social_media">
                    <Link to="">
                        <AiFillFacebook size={20}/>
                    </Link>
                    <Link to="">
                        <AiFillInstagram size={20}/>
                    </Link>
                    <Link to="">
                        <AiOutlineTwitter size={20}/>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer