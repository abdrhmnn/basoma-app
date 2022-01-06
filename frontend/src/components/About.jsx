import React, { useState, useEffect } from "react";

// components
import Navbar from "./Navbar";

// img
import img1 from "./../images/img1.jpg";

// npm packages
import { NavLink, Link } from "react-router-dom"
import { AiFillInstagram, AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { CircularProgress, Card, CardActions, CardContent, CardMedia, Typography, Button } from "@mui/material";

const About = () => {

    const [isLoad, SetIsLoad] = useState(false);

    useEffect(() => {
        document.title = "Tentang Bantuan Sosial Masyarakat"
        setTimeout(() => {
            SetIsLoad(true)
        }, 2000)
    }, [])

    return(
        <div>
            <Navbar />
                {isLoad ? 
                <div className="about">
                    <h1>Bantuan Sosial Masyarakat</h1>
                    <p>Bantuan Sosial Masyarakat (Basoma) adalah sistem pendukung keputusan yang dapat membantu dalam menentukan masyarakat yang tepat untuk menerima bantuan sosial yang akan diberikan. Dalam proses menentukan calon penerima bantuan sosial, sistem Basoma menggunakan metode <i>Analytical Hierarchy Process</i> (AHP).</p>
                    <p>Kami adalah mahasiswa <a href="https://www.mercubuana.ac.id/id" target="_blank" rel="noreferrer">Universitas Mercu Buana</a> yang saat ini sedang mengerjakan tugas akhir dimana aplikasi Basoma adalah aplikasi yang kami rancang untuk tugas akhir kami.</p>
                    <div className="about_us">
                        <Card
                            className="card_about_us">
                                <CardMedia
                                    component="img"
                                    image={img1}
                                    alt="green iguana"
                                    className="img1"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                        </Card>
                        <Card
                            className="card_about_us">
                                <CardMedia
                                    component="img"
                                    image={img1}
                                    alt="green iguana"
                                    className="img1"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                        </Card>
                        <Card
                            className="card_about_us">
                                <CardMedia
                                    component="img"
                                    image={img1}
                                    alt="green iguana"
                                    className="img1"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                        </Card>
                    </div>
                    <p>Saran dan masukan sangat kami butuhkan untuk mengembangkan aplikasi basoma untuk kedepannya. Jika ada, dapat klik <Link to="/masukan">disini!</Link></p>
                </div> : 
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh"
                }}><CircularProgress /></div>}
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

export default About