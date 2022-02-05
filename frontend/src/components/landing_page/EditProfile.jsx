import React, { useState, useEffect } from "react";

// components or files
import Navbar from "./Navbar";
import Footer from "./Footer";

// npm packages
import {
	Button,
	TextField,
	InputAdornment,
	IconButton,
	FormHelperText,
	InputLabel,
	OutlinedInput,
	FormControl,
	Alert,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { AES, enc } from "crypto-js";
import { Formik, Field } from "formik";
import { BiShowAlt, BiHide } from "react-icons/bi";
import axios from "axios";
import * as Yup from "yup";

const EditProfile = () => {
	const [userById, setUserById] = useState([]);
	const [showPassword, setShowPassword] = useState(false);
	const [showImg, setShowImg] = useState();
	const [isValidType, setIsValidType] = useState(true);
	const [isSuccess, setIsSuccess] = useState(true);
	const [selectedFileImg, setSelectedFileImg] = useState({
		selectedFile: null,
	});
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const ui = AES.decrypt(params.get("ui"), "abdu").toString(enc.Utf8);

	const schemaEditProfile = Yup.object({
		nm_depan: Yup.string().required("Nama depan masih kosong!"),
		nm_belakang: Yup.string().required("Nama belakang masih kosong!"),
		username: Yup.string().required("Username masih kosong!"),
		password: Yup.string().required("Password masih kosong!"),
	});

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const ui = AES.decrypt(params.get("ui"), "abdu").toString(enc.Utf8);
		axios.get(`http://localhost:5000/users/${ui}`).then((res) => {
			setUserById(res.data);
		});
	}, [location]);

	return (
		<div>
			<Navbar />
			{isSuccess ? (
				<div className="edit_profile">
					<Formik
						initialValues={{
							nm_depan: "",
							nm_belakang: "",
							username: "",
							password: "",
						}}
						validationSchema={schemaEditProfile}
						onSubmit={(values, actions) => {
							const data = new FormData();
							data.append("gambar", selectedFileImg.selectedFile);
							axios.post("http://localhost:5000/uploads", data);
							axios.patch(`http://localhost:5000/users/${ui}`, {
								nm_depan: values.nm_depan,
								nm_belakang: values.nm_belakang,
								username: values.username,
								password: values.password,
								gambar: selectedFileImg.selectedFile.name,
							});
							setIsSuccess(false);
						}}
					>
						{(props) => (
							<form onSubmit={props.handleSubmit}>
								<div className="edit_foto">
									<img
										style={{ width: 200 }}
										src={
											showImg
												? showImg
												: `http://localhost:5000/public/${
														userById.gambar || "blank_img.png"
												  }`
										}
										alt="Foto Profile"
									/>
									<div className="edit_foto_detail">
										<Button variant="contained" component="label">
											Pilih Gambar
											<input
												id="file"
												type="file"
												name="gambar"
												hidden
												onChange={(e) => {
													e.preventDefault();
													const file = e.target.files[0];
													setShowImg(URL.createObjectURL(file));
													const sizeFile = file.size;
													const dataFile = file.name.split(".");
													const typeFile =
														dataFile[dataFile.length - 1];
													const validType = ["png", "jpeg", "jpg"];
													if (
														validType.includes(typeFile) ||
														sizeFile > 5000000
													) {
														setIsValidType(true);
														props.setFieldValue(
															"file",
															e.currentTarget.files[0]
														);
														setSelectedFileImg({
															selectedFile: file,
														});
													} else {
														setIsValidType(false);
													}
												}}
											/>
										</Button>
										<p
											style={{
												color: "red",
											}}
										>
											Ekstensi yang diperbolehkan: .png, .jpeg, .jpg
										</p>
										<p
											style={{
												color: "red",
											}}
										>
											Maks: 5MB
										</p>
										{isValidType ? null : (
											<Alert variant="outlined" severity="warning">
												Format atau ukuran gambar tidak tepat!
											</Alert>
										)}
									</div>
								</div>
								<div className="edit_nama_depan">
									<Field
										name="nm_depan"
										variant="outlined"
										label="Nama Depan"
										as={TextField}
										error={
											props.touched.nm_depan && props.errors.nm_depan
												? true
												: false
										}
										helperText={
											props.touched.nm_depan && props.errors.nm_depan
										}
									/>
								</div>
								<div className="edit_nama_belakang">
									<Field
										name="nm_belakang"
										variant="outlined"
										label="Nama Belakang"
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
								<div className="username">
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
								</div>
								<div className="password">
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
											{props.touched.password &&
												props.errors.password}
										</FormHelperText>
									</FormControl>
								</div>
								<Button
									variant="contained"
									sx={{
										padding: 1,
										width: "100%",
										fontWeight: "bold",
									}}
									type="submit"
									disabled={isValidType ? false : true}
								>
									simpan
								</Button>
							</form>
						)}
					</Formik>
				</div>
			) : null}
			<Footer class_edit_profile="edit_profile_foot" />
		</div>
	);
};

export default EditProfile;
