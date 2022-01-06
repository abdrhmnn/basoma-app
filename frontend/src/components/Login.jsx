import React, { useState, useEffect } from "react";

// components or files
import { kuki } from "../kuki/index.js";

// img
import login_img from "./../images/Hello-rafiki.svg";

// npm packages
import { Formik, Field } from 'formik';
import { TextField, InputLabel, OutlinedInput, FormControl, Button, InputAdornment, IconButton, FormHelperText, Alert } from "@mui/material";
import { BiShowAlt, BiHide } from "react-icons/bi";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState([])
    const [valid, setIsValid] = useState(true)

    const schemaObj = Yup.object({
        username: Yup.string().required('Username masih kosong!'),
        password: Yup.string().required('Password masih kosong!'),
    });

    useEffect(() => {
        document.title = "Login"
        getAllUser()
    }, [])

    const getAllUser = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUser(response.data)
    }

    return(
        <div className="login">
            <div className="login_img">
                <h2>Basoma</h2>
                <img src={login_img} alt="login" />
            </div>
            <div className="login_auth">
                <h1>Selamat Datang</h1>
                <p>Silahkan masukan username dan password anda</p>
                { valid ? null : <Alert onClose={() => { setIsValid(true) }} variant="outlined" severity="warning" sx={{ mb: 2 }}>Username atau password tidak tepat!</Alert> }
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={schemaObj}
                    onSubmit={(values, actions) => {
                        user.forEach((element, i) => {
                            if(values.username === element.nm_depan && values.password === element.nm_belakang){
                                kuki.set("username", element.username)
                                kuki.set("user_id", element.user_id)
                                kuki.set("gambar", element.gambar)
                                window.location.href = "/bantuan"
                                return
                                // console.log(element)
                            }
                        })
                        setIsValid(false)
                    }}
                >
                    {(props) => (
                        <form onSubmit={props.handleSubmit}>
                            <Field
                                name="username"
                                variant="outlined"
                                label="Username"
                                as={TextField}
                                error={props.touched.username && props.errors.username ? true : false}
                                helperText={props.touched.username && props.errors.username}
                            />
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
                            <Button
                                variant="contained"
                                sx={{
                                    padding: 1
                                }}
                                type="submit"
                            >Masuk</Button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login