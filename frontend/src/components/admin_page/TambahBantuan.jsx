// styling component linked in tambah_bantuan.scss file

import React, { useState, useEffect } from "react";

// components
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

// npm packages
import swal from "sweetalert";
import { BsFillImageFill } from "react-icons/bs";
import {
	TextField,
	Button,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
	FormLabel,
	Alert,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import API from "../../api";

const TambahBantuan = () => {
	const [bantuan, setBantuan] = useState([]);

	const [isValidImgTypeBantuan, setIsValidImgTypeBantuan] = useState(true);
	const [showImgBantuan, setShowImgBantuan] = useState();
	const [selectedFileImgBantuan, setSelectedFileImgBantuan] = useState(null);

	const [isCompleteSubmit, setIsCompleteSubmit] = useState(null);

	useEffect(() => {
		document.title = "Tambah Data Bantuan";
		getAllBantuan();
	}, []);

	const schemaTambahBantuan = Yup.object({
		nama: Yup.string().required("Nama bantuan tidak boleh kosong!"),
		deskripsi: Yup.string().required("Deskripsi bantuan tidak boleh kosong!"),
		alamat: Yup.string().required(
			"Alamat lokasi bantuan tidak boleh kosong!"
		),
	});

	const getAllBantuan = async () => {
		const response = await API.getAllBantuan();
		setBantuan(response.data);
	};

	const generateImgBantuan = (e, props) => {
		e.preventDefault();
		const file = e.target.files[0];
		setShowImgBantuan(URL.createObjectURL(file));
		const sizeFile = file.size;
		const dataFile = file.name.split(".");
		const typeFile = dataFile[dataFile.length - 1];
		const validType = ["png", "jpeg", "jpg"];

		if (validType.includes(typeFile) || sizeFile > 5000000) {
			setIsValidImgTypeBantuan(true);
			props.setFieldValue("file", e.currentTarget.files[0]);
			setSelectedFileImgBantuan(file);
		} else {
			setIsValidImgTypeBantuan(null);
		}
	};

	return (
		<div style={{ display: "flex" }}>
			<NavbarAdmin dataTambahBantuan={true} />
			<div className="flex_header_admin">
				<HeaderAdmin />
				<div className="content_dashboard_admin">
					<h2>Tambah Data Bantuan</h2>
					{isCompleteSubmit ? (
						<Alert
							variant="outlined"
							severity="warning"
							sx={{ mb: 3, mt: 2 }}
						>
							Silahkan lengkapi data terlebih dahulu!
						</Alert>
					) : null}
					<div className="wrap_form_tbh_bantuan">
						<Formik
							initialValues={{ nama: "", deskripsi: "", alamat: "" }}
							validationSchema={schemaTambahBantuan}
							onSubmit={(values, actions) => {
								if (values && selectedFileImgBantuan) {
									const dataImgBantuan = new FormData();
									dataImgBantuan.append(
										"gambar_tambah_bantuan",
										selectedFileImgBantuan
									);

									API.saveIMG_BANTUAN(dataImgBantuan);
									API.saveBantuan(
										bantuan.length + 1,
										values,
										selectedFileImgBantuan
									).then((res) => {
										swal("Data bantuan berhasil dibuat!", {
											icon: "success",
										}).then(() => {
											window.location.href = "/kelola-bantuan";
										});
									});
								} else {
									setIsCompleteSubmit(true);
								}
							}}
						>
							{(props) => (
								<form onSubmit={props.handleSubmit}>
									<Field
										name="nama"
										variant="outlined"
										label="Nama Bantuan"
										autoComplete="off"
										as={TextField}
										error={
											props.touched.nama && props.errors.nama
												? true
												: false
										}
										helperText={
											props.touched.nama && props.errors.nama
										}
									/>
									<FormControl
										component="fieldset"
										sx={{ mt: 2, mb: 2 }}
									>
										<FormLabel component="legend">
											Kapasitas
										</FormLabel>
										<RadioGroup
											row
											name="kapasitas"
											onChange={props.handleChange}
										>
											<FormControlLabel
												value="50"
												control={<Radio />}
												label="50"
											/>
											<FormControlLabel
												value="100"
												control={<Radio />}
												label="100"
											/>
										</RadioGroup>
									</FormControl>
									<Field
										name="deskripsi"
										variant="outlined"
										label="Deskripsi Bantuan"
										autoComplete="off"
										multiline
										rows={3}
										as={TextField}
										error={
											props.touched.deskripsi &&
											props.errors.deskripsi
												? true
												: false
										}
										helperText={
											props.touched.deskripsi &&
											props.errors.deskripsi
										}
									/>
									<Field
										name="alamat"
										variant="outlined"
										label="Alamat"
										autoComplete="off"
										sx={{ mt: 2 }}
										multiline
										rows={3}
										as={TextField}
										error={
											props.touched.alamat && props.errors.alamat
												? true
												: false
										}
										helperText={
											props.touched.alamat && props.errors.alamat
										}
									/>
									<div className="banner_bantuan">
										<p>Banner Bantuan</p>
										{showImgBantuan ? (
											<div style={{ paddingRight: 20 }}>
												<img
													src={showImgBantuan}
													alt="Banner Bantuan"
													width={350}
													style={{ margin: "auto" }}
												/>
												<br />
												{isValidImgTypeBantuan ? (
													<Button
														variant="contained"
														color="error"
														sx={{ mt: 2 }}
														onClick={() => {
															setShowImgBantuan(false);
															setSelectedFileImgBantuan(null);
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
															ukuran file yang diperbolehkan.
														</Alert>
														<Button
															variant="contained"
															color="success"
															sx={{ mt: 2 }}
															onClick={() => {
																setShowImgBantuan(false);
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
												className="btn_upload_banner_bantuan"
												component="label"
											>
												<BsFillImageFill
													style={{ color: "rgb(182, 182, 182)" }}
													size={60}
												/>
												<p>Pilih foto</p>
												<p>Ekstensi: .png, .jpeg, .jpg || 5MB</p>
												<input
													id="file"
													type="file"
													name="gambar_tambah_bantuan"
													hidden
													onChange={(e) =>
														generateImgBantuan(e, props)
													}
												/>
											</Button>
										)}
									</div>
									<Button
										variant="contained"
										sx={{
											p: 1,
											fontWeight: "bold",
											mt: 3,
										}}
										type="submit"
									>
										Tambah
									</Button>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TambahBantuan;
