import React, { useState, useEffect } from "react";

// components
import Navbar from "./Navbar";

// img
import img1 from "./../images/img1.jpg";

// npm packages
import { CircularProgress, TextField, Button, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, FormGroup, Checkbox, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import { AiFillInstagram, AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";

const Bantuan = () => {

    const [isLoad, SetIsLoad] = useState(false)

    useEffect(() => {
        document.title ="Cari Bantuan"
        setTimeout(() => {
            SetIsLoad(true)
        }, 2000)
    }, [])

    return(
        <div>
            <Navbar />
            {isLoad ? 
            <div className="bantuan">
                <h1>Bantuan Sosial Masyarakat</h1>
                <div className="search_bantuan">
                    <TextField label="Cari Bantuan" variant="outlined" />
                    <Button
                        variant="contained"
                        className="btn_cari"
                    >Cari</Button>
                </div>
                <div className="bantuan_content">
                    <div className="filtering_bantuan">
                        <h2>Cari Berdasarkan</h2>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Kapasitas</FormLabel>
                            <RadioGroup row name="row-radio-buttons-group">
                                <FormControlLabel value="female" control={<Radio />} label="> 50" />
                                <FormControlLabel value="male" control={<Radio />} label="> 100" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="fieldset" sx={{ mt: 3 }}>
                            <FormLabel component="legend">Kategori</FormLabel>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Bantuan 1" />
                                <FormControlLabel control={<Checkbox />} label="Bantuan 2" />
                                <FormControlLabel control={<Checkbox />} label="Bantuan 3" />
                            </FormGroup>
                        </FormControl>
                        <Button
                            variant="contained"
                            sx={{ mt: 3 }}
                        >Submit</Button>
                    </div>
                    <div className="result_bantuan">
                        <Card
                            sx={{
                                maxWidth: 280,
                                boxShadow: "none"
                            }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={img1}
                                    alt="green iguana"
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
                            sx={{
                                maxWidth: 280,
                                boxShadow: "none"
                            }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={img1}
                                    alt="green iguana"
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
                            sx={{
                                maxWidth: 280,
                                boxShadow: "none"
                            }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={img1}
                                    alt="green iguana"
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
                            sx={{
                                maxWidth: 280,
                                boxShadow: "none"
                            }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={img1}
                                    alt="green iguana"
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
                </div>
            </div> : 
            <div 
            style={{
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

export default Bantuan