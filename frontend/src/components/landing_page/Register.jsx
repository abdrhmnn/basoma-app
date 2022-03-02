// styling component linked in register.scss file

import React, { useState, useEffect } from "react";

// components
import SuccessRegister from "./SuccessRegister";

// API storage
import API from "../../api";

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
} from "@mui/material";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";

const Register = () => {
	const [users, setUsers] = useState([]);
	const [showPasswordRegister, setShowPasswordRegister] = useState(false);
	const [showPasswordKfRegister, setShowPasswordKfRegister] = useState(false);
	const [isRegister, setIsRegister] = useState(true);

	const schemaRegister = Yup.object({
		nm_depan: Yup.string().required("Nama depan masih kosong!"),
		nm_belakang: Yup.string().required("Nama belakang masih kosong!"),
		username: Yup.string().required("Username masih kosong!"),
		password: Yup.string().required("Password masih kosong!"),
		kf_password: Yup.string().oneOf(
			[Yup.ref("password"), null],
			"Password tidak sama!"
		),
	});

	useEffect(() => {
		document.title = "Register";
		getAllUser();
	}, []);

	const getAllUser = async () => {
		const response = await API.getAllUser();
		setUsers(response.data);
	};

	return (
		<div className="register">
			<Link to="/" style={{ color: "black" }}>
				<h2>Basoma</h2>
			</Link>
			{/* Register component content */}
			{isRegister ? (
				<div className="register_auth">
					<h2>Silahkan isi data dibawah ini</h2>
					<Formik
						initialValues={{
							nm_depan: "",
							nm_belakang: "",
							username: "",
							password: "",
							kf_password: "",
						}}
						validationSchema={schemaRegister}
						onSubmit={(values, actions) => {
							API.saveUser(values, users.length + 1).then((res) => {
								setIsRegister(false);
							});
						}}
					>
						{(props) => (
							<form onSubmit={props.handleSubmit}>
								<div className="flex_text_field">
									<div className="text-1">
										<Field
											name="nm_depan"
											variant="outlined"
											label="Nama Depan"
											autoComplete="off"
											fullWidth
											as={TextField}
											error={
												props.touched.nm_depan &&
												props.errors.nm_depan
													? true
													: false
											}
											helperText={
												props.touched.nm_depan &&
												props.errors.nm_depan
											}
										/>
									</div>
									<div className="text-2">
										<Field
											name="nm_belakang"
											variant="outlined"
											label="Nama Belakang"
											autoComplete="off"
											fullWidth
											as={TextField}
											error={
												props.touched.nm_belakang &&
												props.errors.nm_belakang
													? true
													: false
											}
											helperText={
												props.touched.nm_belakang &&
												props.errors.nm_belakang
											}
										/>
									</div>
								</div>
								<Field
									name="username"
									variant="outlined"
									label="Username"
									autoComplete="off"
									fullWidth
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

								{/* Password section */}
								<FormControl
									className="custom_text_input"
									variant="outlined"
									fullWidth
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
										type={showPasswordRegister ? "text" : "password"}
										value={props.values.password}
										onChange={props.handleChange}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													edge="end"
													onClick={() =>
														setShowPasswordRegister(
															!showPasswordRegister
														)
													}
												>
													{showPasswordRegister ? (
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
								{/* Akhir password section */}

								{/* Konfirmasi password section */}
								<FormControl
									className="custom_text_input"
									variant="outlined"
									fullWidth
								>
									<InputLabel htmlFor="outlined-adornment-kf-password">
										Konfirmasi Password
									</InputLabel>
									<OutlinedInput
										name="kf_password"
										label="Konfirmasi Password"
										id="outlined-adornment-kf-password"
										type={
											showPasswordKfRegister ? "text" : "password"
										}
										value={props.values.kf_password}
										onChange={props.handleChange}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													edge="end"
													onClick={() =>
														setShowPasswordKfRegister(
															!showPasswordKfRegister
														)
													}
												>
													{showPasswordKfRegister ? (
														<BiShowAlt />
													) : (
														<BiHide />
													)}
												</IconButton>
											</InputAdornment>
										}
									/>
									<FormHelperText
										id="outlined-adornment-kf-password"
										sx={{ color: "red" }}
									>
										{props.touched.kf_password &&
											props.errors.kf_password}
									</FormHelperText>
								</FormControl>
								{/* Akhir konfirmasi password section */}

								<Button
									variant="contained"
									sx={{
										padding: 1,
										mt: 1,
									}}
									type="submit"
								>
									Daftar
								</Button>
							</form>
						)}
					</Formik>
					<p
						style={{
							marginTop: 10,
						}}
					>
						Sudah punya akun? silahkan masuk{" "}
						<Link
							to="/login"
							style={{
								color: "rgb(75, 75, 253)",
								textDecoration: "underline",
							}}
						>
							disini!
						</Link>
					</p>
				</div>
			) : (
				<SuccessRegister />
			)}
			{/* Akhir register component content */}
		</div>
	);
};

export default Register;
