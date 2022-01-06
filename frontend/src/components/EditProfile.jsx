import React, { useState } from "react";

// components
import Navbar from "./Navbar";

// img
import img1 from "./../images/img1.jpg";

// npm packages
import { NavLink, Link, useLocation } from "react-router-dom";
import { AiFillInstagram, AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { Button, TextField, InputAdornment, IconButton, FormHelperText, InputLabel, OutlinedInput, FormControl, Alert } from "@mui/material";
import { AES, enc } from "crypto-js";
import { Formik, Field } from 'formik';
import { BiShowAlt, BiHide } from "react-icons/bi";
import axios from "axios";
import * as Yup from "yup";

const EditProfile = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showImg, setShowImg] = useState()
    const [isValidType, setIsValidType] = useState(true)
    const [isSuccess, setIsSuccess] = useState(true)
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const ui = AES.decrypt(params.get("ui"), "abdu").toString(enc.Utf8)

    const schemaObj = Yup.object({
        nm_depan: Yup.string().required('Nama depan masih kosong!'),
        nm_belakang: Yup.string().required('Nama belakang masih kosong!'),
        username: Yup.string().required('Username masih kosong!'),
        password: Yup.string().required('Password masih kosong!'),
    });

    return(
        <div>
            <Navbar />
            {isSuccess ? 
                <div className="edit_profile">
                <Formik
                    initialValues={{ nm_depan: '', nm_belakang: '', username: '', password: '' }}
                    validationSchema={schemaObj}
                    onSubmit={(values, actions) => {
                        axios.patch(`http://localhost:5000/users/${ui}`, {
                            nm_depan: values.nm_depan,
                            nm_belakang: values.nm_belakang,
                            username: values.username,
                            password: values.password,
                            gambar: values.file.name
                        })
                        setIsSuccess(false)
                    }}
                >
                    {(props) => (
                        <form onSubmit={props.handleSubmit}>
                            <div className="edit_foto">
                                <img src={showImg ? showImg : img1} alt="Foto Profile" />
                                <div className="edit_foto_detail">
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Pilih Gambar
                                        <input 
                                            id="file"
                                            type="file"
                                            name="gambar"
                                            hidden
                                            onChange={(e) => {
                                                e.preventDefault()
                                                const file = e.target.files[0]
                                                setShowImg(URL.createObjectURL(file))
                                                const sizeFile = file.size
                                                const dataFile = file.name.split('.')
                                                const typeFile = dataFile[dataFile.length - 1]
                                                const validType = ['png', 'jpeg', 'jpg']
                                                if(validType.includes(typeFile) || sizeFile > 5000000){
                                                    setIsValidType(true)
                                                    props.setFieldValue("file", e.currentTarget.files[0])
                                                }else{
                                                    setIsValidType(false)
                                                }
                                            }}
                                        />
                                    </Button>
                                    <p style={{
                                        color: "red"
                                    }}>Ekstensi yang diperbolehkan: .png, .jpeg, .jpg</p>
                                    <p style={{
                                        color: "red"
                                    }}>Maks: 5MB</p>
                                    { isValidType ?
                                        null
                                            :
                                        <Alert variant="outlined" severity="warning">Format atau ukuran gambar tidak tepat!
                                        </Alert>
                                    }
                                </div>
                            </div>
                            <div className="edit_nama_depan">
                                <Field
                                    name="nm_depan"
                                    variant="outlined"
                                    label="Nama Depan"
                                    as={TextField}
                                    error={props.touched.nm_depan && props.errors.nm_depan ? true : false}
                                helperText={props.touched.nm_depan && props.errors.nm_depan}
                                />
                            </div>
                            <div className="edit_nama_belakang">
                                <Field
                                    name="nm_belakang"
                                    variant="outlined"
                                    label="Nama Belakang"
                                    as={TextField}
                                    error={props.touched.nm_belakang && props.errors.nm_belakang ? true : false}
                                helperText={props.touched.nm_belakang && props.errors.nm_belakang}
                                />
                            </div>
                            <div className="username">
                                <Field
                                    name="username"
                                    variant="outlined"
                                    label="Username"
                                    as={TextField}
                                    error={props.touched.username && props.errors.username ? true : false}
                                helperText={props.touched.username && props.errors.username}
                                />
                            </div>
                            <div className="password">
                                <FormControl
                                    className="custom_text_input"
                                    variant="outlined"
                                    error={
                                        props.touched.password && props.errors.password ? true : false
                                    }
                                >
                                    <InputLabel
                                        htmlFor="outlined-adornment-password"
                                    >
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        name="password"
                                        label="Password"
                                        id="outlined-adornment-password"
                                        type={showPassword ? "text" : "password"}
                                        labelWidth={70}
                                        value={props.values.password}
                                        onChange={props.handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() =>
                                                        setShowPassword(!showPassword)
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <BiShowAlt />
                                                    ) : (
                                                        <BiHide />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText id="outlined-adornment-password">
                                        {props.touched.password && props.errors.password}
                                    </FormHelperText>
                                </FormControl>
                            </div>
                            <Button
                                variant="contained"
                                sx={{
                                    padding: 1,
                                    width: "100%",
                                    fontWeight: "bold"
                                }}
                                type="submit"
                                disabled={isValidType ? false : true}
                            >simpan</Button>
                        </form>
                    )}
                    </Formik>
                </div>
                    :
                null
            }
            
            <footer className="footer edit_profile_foot">
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

export default EditProfile