// styling component linked in login.scss file

import React, { useState, useEffect } from "react";

// Cookie storage
import kuki from "../../kuki";

// API storage
import API from "../../api";

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

const Login = () => {
	const [user, setUser] = useState([]);
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [isValidLogin, setIsValidLogin] = useState(true);

	const schemaLogin = Yup.object({
		username: Yup.string().required("Username masih kosong!"),
		password: Yup.string().required("Password masih kosong!"),
	});

	useEffect(() => {
		document.title = "Login";
		getAllUser();
	}, []);

	const getAllUser = async () => {
		const response = await API.getAllUser();
		setUser(response.data);
	};

	return (
		<div className="login">
			<div className="login_img">
				<h2>Basoma</h2>
				<img src={login_img} alt="login" />
			</div>
			{/* Login component content */}
			<div className="login_auth">
				<h1>Selamat Datang</h1>
				<p>Silahkan masukan username dan password anda</p>

				{isValidLogin ? null : (
					<Alert
						onClose={() => {
							setIsValidLogin(true);
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
							} else {
								setIsValidLogin(false);
							}
						});
					}}
				>
					{(props) => (
						<form onSubmit={props.handleSubmit}>
							<Field
								name="username"
								variant="outlined"
								label="Username"
								autoComplete="off"
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

							{/* Textfield password */}
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
									type={isShowPassword ? "text" : "password"}
									value={props.values.password}
									onChange={props.handleChange}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												edge="end"
												onClick={() =>
													setIsShowPassword(!isShowPassword)
												}
											>
												{isShowPassword ? (
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
							{/* Akhir textfield password */}

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

				{/* Registrasi link */}
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
				{/* Akhir registrasi link */}
			</div>
			{/* Akhir login component content */}
		</div>
	);
};

export default Login;
