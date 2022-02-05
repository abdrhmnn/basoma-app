import React, { useState, useEffect } from "react";

// components or files
import { kuki } from "../../kuki/index.js";

// img
import login_img from "./../../images/greetings.svg";

// npm packages
import {
	TextField,
	InputLabel,
	OutlinedInput,
	FormControl,
	Button,
	InputAdornment,
	IconButton,
	FormHelperText,
	Alert,
} from "@mui/material";
import { Formik, Field } from "formik";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState([]);
	const [isValid, setIsValid] = useState(true);

	const schemaLogin = Yup.object({
		username: Yup.string().required("Username masih kosong!"),
		password: Yup.string().required("Password masih kosong!"),
	});

	useEffect(() => {
		document.title = "Login";
		getAllUser();
	}, []);

	const getAllUser = async () => {
		const response = await axios.get("http://localhost:5000/users");
		setUser(response.data);
	};

	return (
		<div className="login">
			<div className="login_img">
				<h2>Basoma</h2>
				<img src={login_img} alt="login" />
			</div>
			<div className="login_auth">
				<h1>Selamat Datang</h1>
				<p>Silahkan masukan username dan password anda</p>
				{isValid ? null : (
					<Alert
						onClose={() => {
							setIsValid(true);
						}}
						variant="outlined"
						severity="warning"
						className="alert_warn"
						sx={{ mb: 2 }}
					>
						Username atau password tidak tepat!
					</Alert>
				)}
				<Formik
					initialValues={{ username: "", password: "" }}
					validationSchema={schemaLogin}
					onSubmit={(values, actions) => {
						user.forEach((element, i) => {
							if (
								values.username === element.username &&
								values.password === element.password
							) {
								kuki.set("user_id", element.user_id);
								if (element.role === "admin") {
									window.location.href = "/dashboard";
									return;
								} else {
									window.location.href = "/";
									return;
								}
							}
						});
						setIsValid(false);
					}}
				>
					{(props) => (
						<form onSubmit={props.handleSubmit}>
							<Field
								name="username"
								variant="outlined"
								label="Username"
								as={TextField}
								error={
									props.touched.username && props.errors.username
										? true
										: false
								}
								helperText={
									props.touched.username && props.errors.username
								}
							/>
							<FormControl
								className="custom_text_input"
								variant="outlined"
								error={
									props.touched.password && props.errors.password
										? true
										: false
								}
							>
								<InputLabel htmlFor="outlined-adornment-password">
									Password
								</InputLabel>
								<OutlinedInput
									name="password"
									label="Password"
									id="outlined-adornment-password"
									type={showPassword ? "text" : "password"}
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
												{showPassword ? <BiShowAlt /> : <BiHide />}
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
									padding: 1,
								}}
								type="submit"
							>
								Masuk
							</Button>
						</form>
					)}
				</Formik>
				<p
					style={{
						marginTop: 10,
					}}
				>
					Belum punya akun? silahkan daftar{" "}
					<Link
						to="/register"
						style={{
							color: "rgb(75, 75, 253)",
						}}
					>
						disini!
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
