// styling component linked in form_data_diri.scss file

import React, { useState, useEffect } from "react";

// components
import SudahMengisiKuesioner from "./SudahMengisiKuesioner";

// Cookie storage
import kuki from "../../kuki";

// API storage
import API from "../../api";

// npm packages
import { TextField, Button, Alert } from "@mui/material";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import { BsFillImageFill } from "react-icons/bs";

const FormDataDiri = () => {
	const [userByID, setUserByID] = useState(null);

	const [isValidImgTypeKK, setIsValidImgTypeKK] = useState(true);
	const [isValidImgTypeKTP, setIsValidImgTypeKTP] = useState(true);

	const [showImgKK, setShowImgKK] = useState();
	const [showImgKTP, setShowImgKTP] = useState();

	const [selectedFileImgKK, setSelectedFileImgKK] = useState(null);
	const [selectedFileImgKTP, setSelectedFileImgKTP] = useState(null);

	const [isCompleteSubmit, setIsCompleteSubmit] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		document.title = "Formulir Data Diri";
		getUserByID();
	}, []);

	const getUserByID = async () => {
		const response = await API.getUserByID(kuki.get("user_id"));
		setUserByID(response.data);
	};

	const schemaFormDataDiri = Yup.object({
		no_kk: Yup.number()
			.typeError("Nomor kartu keluarga tidak valid!")
			.required("Nomor kartu keluarga masih kosong!"),
		no_ktp: Yup.number()
			.typeError("Nomor kartu tanda penduduk tidak valid!")
			.required("Nomor kartu tanda penduduk masih kosong!"),
		nm_lengkap: Yup.string().required("Nama lengkap masih kosong!"),
		alamat: Yup.string().required("Alamat tempat tinggal masih kosong!"),
		no_telepon: Yup.number()
			.typeError("Nomor telepon tidak valid!")
			.required("Nomor telepon masih kosong!"),
	});

	const generateImgKK = (e, props) => {
		e.preventDefault();
		const file = e.target.files[0];
		setShowImgKK(URL.createObjectURL(file));
		const sizeFile = file.size;
		const dataFile = file.name.split(".");
		const typeFile = dataFile[dataFile.length - 1];
		const validType = ["png", "jpeg", "jpg"];

		if (validType.includes(typeFile) || sizeFile > 5000000) {
			setIsValidImgTypeKK(true);
			props.setFieldValue("file", e.currentTarget.files[0]);
			setSelectedFileImgKK(file);
		} else {
			setIsValidImgTypeKK(null);
		}
	};

	const generateImgKTP = (e, props) => {
		e.preventDefault();
		const file = e.target.files[0];
		setShowImgKTP(URL.createObjectURL(file));
		const sizeFile = file.size;
		const dataFile = file.name.split(".");
		const typeFile = dataFile[dataFile.length - 1];
		const validType = ["png", "jpeg", "jpg"];

		if (validType.includes(typeFile) || sizeFile > 5000000) {
			setIsValidImgTypeKTP(true);
			props.setFieldValue("file", e.currentTarget.files[0]);
			setSelectedFileImgKTP(file);
		} else {
			setIsValidImgTypeKTP(null);
		}
	};

	return (
		<div className="form_data_diri_warga">
			{userByID && userByID.status_pengisian === "sudah" ? (
				<SudahMengisiKuesioner />
			) : (
				<div>
					<div className="logo_app">
						<h2>Basoma</h2>
					</div>
					<div className="form_data_diri">
						{userByID && (
							<div className="form_title_data_diri">
								<h2>
									Halo, {userByID.nm_depan} {userByID.nm_belakang}
								</h2>
								<p>
									Silahkan lengkapi formulir data diri dibawah ini
									untuk digunakan sebagai data survey pendaftaran
									bantuan.
								</p>
							</div>
						)}
						{isCompleteSubmit ? (
							<Alert
								variant="outlined"
								severity="warning"
								sx={{ mb: 3 }}
							>
								Silahkan lengkapi data terlebih dahulu!
							</Alert>
						) : null}
						<div className="form_pengisian_data_diri">
							<Formik
								initialValues={{
									no_kk: "",
									no_ktp: "",
									nm_lengkap: "",
									alamat: "",
									no_telepon: "",
								}}
								validationSchema={schemaFormDataDiri}
								onSubmit={(values, actions) => {
									if (selectedFileImgKK && selectedFileImgKTP) {
										setIsCompleteSubmit(false);
										const dataImgKK = new FormData();
										const dataImgKTP = new FormData();
										dataImgKK.append(
											"gambar_form_kk",
											selectedFileImgKK
										);
										dataImgKTP.append(
											"gambar_form_ktp",
											selectedFileImgKTP
										);
										API.saveIMG_KK(dataImgKK);
										API.saveIMG_KTP(dataImgKTP);
										API.saveWarga(
											values,
											kuki.get("user_id"),
											location.state,
											selectedFileImgKK,
											selectedFileImgKTP
										).then(() => {
											navigate("/kuesioner-pendaftaran", {
												state: location.state,
											});
										});
									} else {
										setIsCompleteSubmit(true);
									}
								}}
							>
								{(props) => (
									<form onSubmit={props.handleSubmit}>
										{/* Group textfield no_kk dan no_ktp */}
										<div className="flex_no_kk_no_ktp">
											<div className="text_no_kk">
												<Field
													name="no_kk"
													variant="outlined"
													label="Nomor kartu keluarga"
													autoComplete="off"
													fullWidth
													as={TextField}
													error={
														props.touched.no_kk &&
														props.errors.no_kk
															? true
															: false
													}
													helperText={
														props.touched.no_kk &&
														props.errors.no_kk
													}
												/>
											</div>
											<div className="text_no_ktp">
												<Field
													name="no_ktp"
													variant="outlined"
													label="Nomor kartu tanda penduduk"
													autoComplete="off"
													fullWidth
													as={TextField}
													error={
														props.touched.no_ktp &&
														props.errors.no_ktp
															? true
															: false
													}
													helperText={
														props.touched.no_ktp &&
														props.errors.no_ktp
													}
												/>
											</div>
										</div>
										{/* Akhir group textfield nkk dan no_ktp */}

										<Field
											name="nm_lengkap"
											variant="outlined"
											label="Nama lengkap"
											autoComplete="off"
											fullWidth
											as={TextField}
											error={
												props.touched.nm_lengkap &&
												props.errors.nm_lengkap
													? true
													: false
											}
											helperText={
												props.touched.nm_lengkap &&
												props.errors.nm_lengkap
											}
										/>

										<Field
											name="alamat"
											variant="outlined"
											label="Alamat tempat tinggal"
											autoComplete="off"
											multiline={true}
											rows={4}
											fullWidth
											as={TextField}
											style={{
												marginTop: "18px",
											}}
											error={
												props.touched.alamat && props.errors.alamat
													? true
													: false
											}
											helperText={
												props.touched.alamat && props.errors.alamat
											}
										/>

										<Field
											name="no_telepon"
											variant="outlined"
											label="Nomor telepon aktif"
											autoComplete="off"
											fullWidth
											as={TextField}
											style={{
												marginTop: "18px",
												marginBottom: "18px",
											}}
											error={
												props.touched.no_telepon &&
												props.errors.no_telepon
													? true
													: false
											}
											helperText={
												props.touched.no_telepon &&
												props.errors.no_telepon
											}
										/>

										{/* Group button fkk dan fktp */}
										<div className="flex_fkk_fktp">
											{/* Button fkk section */}
											<div className="fkk">
												<p>Foto kartu keluarga</p>
												{showImgKK ? (
													<div style={{ paddingRight: 20 }}>
														<img
															src={showImgKK}
															width={380}
															style={{ margin: "auto" }}
															alt="-"
														/>
														<br />
														{isValidImgTypeKK ? (
															<Button
																variant="contained"
																color="error"
																sx={{ mt: 2 }}
																onClick={() => {
																	setShowImgKK(false);
																	setSelectedFileImgKK(null);
																}}
															>
																remove foto
															</Button>
														) : (
															<div>
																<Alert
																	variant="outlined"
																	severity="warning"
																	sx={{ mt: 2 }}
																>
																	Perhatikan jenis ekstensi dan
																	ukuran file yang
																	diperbolehkan
																</Alert>
																<Button
																	variant="contained"
																	color="success"
																	sx={{ mt: 2 }}
																	onClick={() => {
																		setShowImgKK(false);
																	}}
																>
																	pilih kembali
																</Button>
															</div>
														)}
													</div>
												) : (
													<Button
														variant="contained"
														className="btn_upload_kk"
														component="label"
													>
														<BsFillImageFill
															style={{
																color: "rgb(182, 182, 182)",
															}}
															size={60}
														/>
														<p>Pilih foto</p>
														<p>
															Ekstensi: .png, .jpeg, .jpg || 5MB
														</p>
														<input
															id="file"
															type="file"
															name="gambar_form_kk"
															hidden
															onChange={(e) =>
																generateImgKK(e, props)
															}
														/>
													</Button>
												)}
											</div>
											{/* Akhir button fkk section */}

											{/* Button fktp section */}
											<div
												className={`fktp ${
													isValidImgTypeKTP ? "" : "ml_ktp"
												}`}
											>
												<p>Foto kartu tanda penduduk</p>
												{showImgKTP ? (
													<div>
														<img
															src={showImgKTP}
															width={390}
															alt="-"
														/>
														<br />
														{isValidImgTypeKTP ? (
															<Button
																variant="contained"
																color="error"
																sx={{ mt: 2 }}
																onClick={() => {
																	setShowImgKTP(false);
																	setSelectedFileImgKTP(null);
																}}
															>
																remove foto
															</Button>
														) : (
															<div>
																<Alert
																	variant="outlined"
																	severity="warning"
																	sx={{ mt: 2 }}
																>
																	Perhatikan jenis ekstensi dan
																	ukuran file yang
																	diperbolehkan
																</Alert>
																<Button
																	variant="contained"
																	color="success"
																	sx={{ mt: 2 }}
																	onClick={() => {
																		setShowImgKTP(false);
																	}}
																>
																	pilih kembali
																</Button>
															</div>
														)}
													</div>
												) : (
													<Button
														variant="contained"
														className="btn_upload_ktp"
														component="label"
													>
														<BsFillImageFill
															style={{
																color: "rgb(182, 182, 182)",
															}}
															size={60}
														/>
														<p>Pilih foto</p>
														<p>
															Ekstensi: .png, .jpeg, .jpg || 5MB
														</p>
														<input
															id="file"
															type="file"
															name="gambar_form_ktp"
															hidden
															onChange={(e) => {
																generateImgKTP(e, props);
															}}
														/>
													</Button>
												)}
											</div>
											{/* Akhir button fktp section */}
										</div>
										{/* Akhir group button fkk dan fktp */}

										<Button
											variant="contained"
											type="submit"
											fullWidth
											sx={{ fontWeight: "bold" }}
										>
											submit
										</Button>
									</form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FormDataDiri;
