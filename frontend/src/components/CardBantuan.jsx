import React, { useState } from "react";

// components
import Navbar from "./Navbar";

// img
import img1 from "./../images/test.png"

// npm packages
import { NavLink, Link, useParams } from "react-router-dom"
import { AiFillInstagram, AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { Tabs, Tab, Collapse, Button } from "@mui/material";

const CardBantuan = () => {

    const {selected} = useParams();
    console.log(selected)

    const [tabActive, setTabActive] = useState({
        tabActive: 0
    })

    const handleChange = (e, newValue) => {
        setTabActive({
            tabActive: newValue
        })
    }

    return(
        <div>
            <Navbar />
            <div className="card_bantuan">
                <div className="card_detail">
                <h1>Kartu Jakarta Pintar</h1>
                <p>Bantuan ini diberikan oleh <span>test</span></p>
                    <img src={img1} alt="Card" />
                    <Tabs
                        className="box-tabs"
                        value={tabActive}
                        onChange={handleChange}
                        >
                        <Tab
                            className={tabActive.tabActive === 0 ? "active" : "unselected"}
                            label="Detail"
                        />
                        <Tab
                            className={tabActive.tabActive === 1 ? "active" : "unselected"}
                            label="Komentar"
                        />
                    </Tabs>
                    <Collapse in={tabActive.tabActive === 0}>
                        <div className="tab-content">
                            <h2>test</h2>
                        </div>
                    </Collapse>
                    <Collapse in={tabActive.tabActive === 1}>
                        <div className="tab-content">
                            <h2>tes1</h2>
                        </div>
                    </Collapse>
                </div>
                <div className="card_info">
                    <div className="card_detail_info">
                        <div className="kapasitas">
                            <h2>Kapasitas</h2>
                            <p>50 Orang</p>
                        </div>
                        <div className="kategori">
                            <h2>Kategori</h2>
                            <p>Kartu Jakarta Pintar</p>
                        </div>
                    </div>
                <Button
                    variant="contained"
                    className="btn_daftar"
                >Daftar</Button>
                </div>
            </div>
            <footer className="footer about_foot">
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
        </div>
    )
}

export default CardBantuan