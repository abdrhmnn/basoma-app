import React, { useState, useEffect } from "react";

// components
import SuccessRegister from "./SuccessRegister";

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
import axios from "axios";

const Register = () => {
	const [showPasswordRegister, setShowPasswordRegister] = useState(false);
	const [showPasswordKfRegister, setShowPasswordKfRegister] = useState(false);
	const [isRegister, setIsRegister] = useState(true);
	const [users, setUsers] = useState([]);

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

	const TextFieldCustom = (props) => {
		return <TextField fullWidth {...props} />;
	};

	useEffect(() => {
		document.title = "Register";
		getAllUser();
	}, []);

	const getAllUser = async () => {
		const response = await axios.get("http://localhost:5000/users");
		setUsers(response.data);
	};

	return (
		<div className="register">
			<h2>Basoma</h2>
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
							axios
								.post("http://localhost:5000/users", {
									user_id: `USER_${users.length + 1}`,
									nm_depan: values.nm_depan,
									nm_belakang: values.nm_belakang,
									username: values.username,
									password: values.password,
									role: "warga",
									gambar: "default_img.svg",
									status_pengisian: "belum",
								})
								.then(() => {
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
											as={TextFieldCustom}
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
											as={TextFieldCustom}
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
									as={TextFieldCustom}
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
							}}
						>
							disini!
						</Link>
					</p>
				</div>
			) : (
				<SuccessRegister />
			)}
		</div>
	);
};

export default Register;
