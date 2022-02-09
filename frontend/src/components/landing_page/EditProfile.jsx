// styling component linked in edit_profile.scss file

import React, { useState, useEffect } from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";
import SuccessEditProfile from "./SuccessEditProfile";

// API storage
import API from "../../api";

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
import * as Yup from "yup";

const EditProfile = () => {
	const [userByID, setUserByID] = useState([]);
	const [showImg, setShowImg] = useState();
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [isSuccessUpdate, setIsSuccessUpdate] = useState(false);
	const [isValidImgType, setIsValidImgType] = useState(true);
	const [selectedFileImg, setSelectedFileImg] = useState(null);

	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const ui = AES.decrypt(params.get("ui"), "userID").toString(enc.Utf8);

	const schemaEditProfile = Yup.object({
		nm_depan: Yup.string().required("Nama depan masih kosong!"),
		nm_belakang: Yup.string().required("Nama belakang masih kosong!"),
		username: Yup.string().required("Username masih kosong!"),
		password: Yup.string().required("Password masih kosong!"),
	});

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const ui = AES.decrypt(params.get("ui"), "userID").toString(enc.Utf8);

		API.getUserByID(ui).then((res) => {
			setUserByID(res.data);
		});
	}, [location]);

	return (
		<div>
			<Navbar />

			{/* Component edit profile */}
			{isSuccessUpdate ? (
				<SuccessEditProfile />
			) : (
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
							if (selectedFileImg === null) {
								// API.updateUserByID(values, selectedFileImg, ui);
								API.updateUserTanpaGambar(values, ui);
							} else {
								const data = new FormData();
								data.append("gambar", selectedFileImg);
								API.saveIMG(data);
								API.updateUserByID(values, selectedFileImg, ui);
							}
							setIsSuccessUpdate(true);
						}}
					>
						{(props) => (
							// Form edit profile
							<form onSubmit={props.handleSubmit}>
								{/* Edit foto profile section */}
								<div className="edit_foto">
									<img
										style={{ width: 200 }}
										src={
											showImg
												? showImg
												: API.showIMG(
														userByID.gambar || "blank_img.png"
												  )
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
														setIsValidImgType(true);
														props.setFieldValue(
															"file",
															e.currentTarget.files[0]
														);
														setSelectedFileImg(file);
													} else {
														setIsValidImgType(false);
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
										{isValidImgType ? null : (
											<Alert variant="outlined" severity="warning">
												Format atau ukuran gambar tidak tepat!
											</Alert>
										)}
									</div>
								</div>
								{/* Akhir edit foto profile section */}

								{/* Textfield form edit profile */}
								<div>
									<Field
										name="nm_depan"
										variant="outlined"
										label="Nama Depan"
										autoComplete="off"
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
								<div>
									<Field
										name="nm_belakang"
										variant="outlined"
										label="Nama Belakang"
										autoComplete="off"
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
								<div>
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
								</div>
								<div>
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
											{props.touched.password &&
												props.errors.password}
										</FormHelperText>
									</FormControl>
								</div>
								{/* Akhir textfield form edit profile */}

								<Button
									variant="contained"
									sx={{
										padding: 1,
										width: "100%",
										fontWeight: "bold",
									}}
									type="submit"
									disabled={isValidImgType ? false : true}
								>
									simpan
								</Button>
							</form>
							// Akhir form edit profile
						)}
					</Formik>
				</div>
			)}
			{/* Akhir component edit profile */}

			<Footer class_edit_profile="edit_profile_foot" />
		</div>
	);
};

export default EditProfile;
