// styling component linked in form_pendaftaran.scss file

import React, { useState, useEffect } from "react";

// Cookie storage
import kuki from "../../kuki";

// API storage
import API from "../../api";

// npm packages
import { BsFillImageFill } from "react-icons/bs";
import {
	Button,
	TextField,
	InputLabel,
	FormControl,
	Alert,
	Select,
	MenuItem,
} from "@mui/material";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const FormPendaftaranBantuan = () => {
	const [userByID, setUserByID] = useState(null);
	const [alternatif, setAlternatif] = useState(null);
	const [penghasilan, setPenghasilan] = useState("");
	const [pendidikan, setPendidikan] = useState("");
	const [luasRumah, setLuasRumah] = useState("");

	const [isValidImgTypeKTP, setIsValidImgTypeKTP] = useState(true);
	const [isValidImgTypeBangunan, setIsValidImgTypeBangunan] = useState(true);

	const [showImgKTP, setShowImgKTP] = useState();
	const [showImgBangunan, setShowImgBangunan] = useState();

	const [selectedFileImgKTP, setSelectedFileImgKTP] = useState(null);
	const [selectedFileImgBangunan, setSelectedFileImgBangunan] = useState(null);

	const [isCompleteSubmit, setIsCompleteSubmit] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Formulir Pendaftaran Bantuan";
		getUserByID();
		getAllAlternatif();
	}, []);

	const schemaFormPendaftaranBantuan = Yup.object({
		nik: Yup.number()
			.typeError("NIK tidak valid!")
			.required("NIK masih kosong!"),
		nm_lengkap: Yup.string().required("Nama lengkap masih kosong!"),
		pekerjaan: Yup.string().required("Pekerjaan masih kosong!"),
		sumber_penerangan: Yup.string().required("Pekerjaan masih kosong!"),
	});

	const getUserByID = async () => {
		const response = await API.getUserByID(kuki.get("user_id"));
		setUserByID(response.data);
	};

	const getAllAlternatif = async () => {
		const response = await API.getAllAlternatif();
		setAlternatif(response.data);
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

	const generateImgBangunan = (e, props) => {
		e.preventDefault();
		const file = e.target.files[0];
		setShowImgBangunan(URL.createObjectURL(file));
		const sizeFile = file.size;
		const dataFile = file.name.split(".");
		const typeFile = dataFile[dataFile.length - 1];
		const validType = ["png", "jpeg", "jpg"];

		if (validType.includes(typeFile) || sizeFile > 5000000) {
			setIsValidImgTypeBangunan(true);
			props.setFieldValue("file", e.currentTarget.files[0]);
			setSelectedFileImgBangunan(file);
		} else {
			setIsValidImgTypeBangunan(null);
		}
	};

	return (
		<div className="form_pendaftaran">
			{/* Form title content */}
			{userByID && (
				<div className="form_title">
					<h2>
						Halo, {userByID.nm_depan} {userByID.nm_belakang}
					</h2>
					<p>
						Silahkan lengkapi data dibawah ini untuk digunakan sebagai
						data pendaftaran bantuan
					</p>
				</div>
			)}
			{/* Akhir form title content */}

			{/* Form content */}
			<div className="form_content">
				{isCompleteSubmit ? (
					<Alert variant="outlined" severity="warning" sx={{ mb: 3 }}>
						Silahkan lengkapi data terlebih dahulu!
					</Alert>
				) : null}
				<Formik
					initialValues={{
						nik: "",
						nm_lengkap: "",
						alamat: "",
						pekerjaan: "",
						sumber_penerangan: "",
					}}
					validationSchema={schemaFormPendaftaranBantuan}
					onSubmit={(values, actions) => {
						if (
							penghasilan &&
							pendidikan &&
							luasRumah &&
							selectedFileImgKTP &&
							selectedFileImgBangunan
						) {
							setIsCompleteSubmit(false);
							const dataImgKTP = new FormData();
							const dataImgBangunan = new FormData();
							dataImgKTP.append("gambar_form_ktp", selectedFileImgKTP);
							dataImgBangunan.append(
								"gambar_form_bangunan",
								selectedFileImgBangunan
							);
							API.saveIMG_KTP(dataImgKTP);
							API.saveIMG_BANGUNAN(dataImgBangunan);
							API.saveAlternatif(
								alternatif.length + 1,
								kuki.get("user_id"),
								kuki.get("nilai_ci"),
								kuki.get("nilai_cr")
							);
							API.saveWarga(
								values,
								kuki.get("user_id"),
								kuki.get("bantuan_id"),
								penghasilan,
								pendidikan,
								luasRumah,
								selectedFileImgKTP,
								selectedFileImgBangunan,
								kuki.get("nilai_rangking")
							).then(() => {
								navigate("/form-pendaftaran-success");
								kuki.remove("bantuan_id");
								kuki.remove("nilai_ci");
								kuki.remove("nilai_cr");
								kuki.remove("nilai_rangking");
							});
						} else {
							setIsCompleteSubmit(true);
						}
					}}
				>
					{(props) => (
						<form onSubmit={props.handleSubmit}>
							{/* Group textfield nik dan nama lengkap */}
							<div className="flex_nik_nm_lengkap">
								<div className="text_nik">
									<Field
										name="nik"
										variant="outlined"
										label="Nomor Induk Kependudukan"
										fullWidth
										as={TextField}
										error={
											props.touched.nik && props.errors.nik
												? true
												: false
										}
										helperText={props.touched.nik && props.errors.nik}
									/>
								</div>
								<div className="text_nm_lengkap">
									<Field
										name="nm_lengkap"
										variant="outlined"
										label="Nama Lengkap"
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
								</div>
							</div>
							{/* Akhir group textfield nik dan nama lengkap */}

							<div>
								<Field
									name="alamat"
									variant="outlined"
									label="Alamat Tempat Tinggal"
									multiline
									fullWidth
									rows={3}
									as={TextField}
								/>
							</div>

							{/* Group textfield pekerjaan dan penghasilan */}
							<div className="flex_pekerjaan_penghasilan">
								<div className="text_pekerjaan">
									<Field
										name="pekerjaan"
										variant="outlined"
										label="Pekerjaan"
										fullWidth
										as={TextField}
										error={
											props.touched.pekerjaan &&
											props.errors.pekerjaan
												? true
												: false
										}
										helperText={
											props.touched.pekerjaan &&
											props.errors.pekerjaan
										}
									/>
								</div>
								<div className="text_penghasilan">
									<FormControl fullWidth>
										<InputLabel id="penghasilan">
											Penghasilan
										</InputLabel>
										<Select
											labelId="penghasilan"
											id="penghasilan"
											value={penghasilan}
											label="Penghasilan"
											onChange={(e) => {
												setPenghasilan(e.target.value);
											}}
										>
											<MenuItem value="1 - 3">
												1 - 3 Jt Per-bulan
											</MenuItem>
											<MenuItem value="3 - 5">
												3 - 5 Jt Per-bulan
											</MenuItem>
											<MenuItem value="5 - 8">
												5 - 8 Jt Per-bulan
											</MenuItem>
											<MenuItem value="8 - 11">
												8 - 11 Jt Per-bulan
											</MenuItem>
										</Select>
									</FormControl>
								</div>
							</div>
							{/* Akhir group textfield pekerjaan dan penghasilan */}

							{/* Group textfield pendidikan dan luas bangunan rumah */}
							<div className="flex_pendidikan_luas_bangunan">
								<div className="text_pendidikan">
									<FormControl fullWidth>
										<InputLabel id="pendidikan">
											Pendidikan
										</InputLabel>
										<Select
											labelId="pendidikan"
											id="pendidikan"
											value={pendidikan}
											label="Pendidikan Terakhir"
											onChange={(e) => {
												setPendidikan(e.target.value);
											}}
										>
											<MenuItem value="SD atau Sedejarat">
												SD atau Sedejarat
											</MenuItem>
											<MenuItem value="SMP atau Sederajat">
												SMP atau Sederajat
											</MenuItem>
											<MenuItem value="SMA atau Sederajat">
												SMA atau Sederajat
											</MenuItem>
											<MenuItem value="Jenjang Universitas">
												Jenjang Universitas
											</MenuItem>
										</Select>
									</FormControl>
								</div>
								<div className="text_luas_rumah">
									<FormControl fullWidth>
										<InputLabel id="luas_rumah">
											Luas Bangunan Rumah
										</InputLabel>
										<Select
											labelId="luas_rumah"
											id="luas_rumah"
											value={luasRumah}
											label="Luas Bangunan Rumah"
											onChange={(e) => {
												setLuasRumah(e.target.value);
											}}
										>
											<MenuItem value="10 - 30">
												10 - 30 Meter
											</MenuItem>
											<MenuItem value="30 - 50">
												30 - 50 Meter
											</MenuItem>
											<MenuItem value="50 - 80">
												50 - 80 Meter
											</MenuItem>
											<MenuItem value="80 - 100">
												80 - 100 Meter
											</MenuItem>
										</Select>
									</FormControl>
								</div>
							</div>
							{/* Akhir group textfield pendidikan dan luas bangunan rumah */}

							<div>
								<Field
									name="sumber_penerangan"
									variant="outlined"
									label="Sumber Penerangan"
									fullWidth
									as={TextField}
									error={
										props.touched.sumber_penerangan &&
										props.errors.sumber_penerangan
											? true
											: false
									}
									helperText={
										props.touched.sumber_penerangan &&
										props.errors.sumber_penerangan
									}
								/>
							</div>

							{/* Group button ktp dan bangunan */}
							<div className="flex_fktp_fbangunan">
								{/* Button foto ktp section */}
								<div className="fktp">
									<p>Foto Kartu Tanda Penduduk</p>
									{showImgKTP ? (
										<div style={{ paddingRight: 20 }}>
											<img
												src={showImgKTP}
												alt="Foto KTP"
												width={350}
												style={{ margin: "auto" }}
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
														Perhatikan jenis ekstensi dan ukuran
														file yang diperbolehkan
													</Alert>
													<Button
														variant="contained"
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
												style={{ color: "rgb(182, 182, 182)" }}
												size={60}
											/>
											<p>Pilih foto</p>
											<p>Ekstensi: .png, .jpeg, .jpg || 5MB</p>
											<input
												id="file"
												type="file"
												name="gambar_form_ktp"
												hidden
												onChange={(e) => generateImgKTP(e, props)}
											/>
										</Button>
									)}
								</div>
								{/* Akhir button foto ktp section */}

								{/* Button foto bangunan section */}
								<div
									className={`fbangunan ${
										isValidImgTypeBangunan ? "" : "ml_bangunan"
									}`}
								>
									<p>Foto Bangunan Tempat Tinggal</p>
									{showImgBangunan ? (
										<div>
											<img
												src={showImgBangunan}
												alt="Foto Bangunan Tempat Tinggal"
												width={350}
											/>
											<br />
											{isValidImgTypeBangunan ? (
												<Button
													variant="contained"
													color="error"
													sx={{ mt: 2 }}
													onClick={() => {
														setShowImgBangunan(false);
														setSelectedFileImgBangunan(null);
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
														Perhatikan jenis ekstensi dan ukuran
														file yang diperbolehkan
													</Alert>
													<Button
														variant="contained"
														sx={{ mt: 2 }}
														onClick={() => {
															setShowImgBangunan(false);
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
											className="btn_upload_bangunan"
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
												name="gambar_form_bangunan"
												hidden
												onChange={(e) => {
													generateImgBangunan(e, props);
												}}
											/>
										</Button>
									)}
								</div>
								{/* Akhir button foto bangunan section */}
							</div>
							{/* Akhir group button ktp dan bangunan */}

							<Button
								variant="contained"
								sx={{
									padding: 1,
									width: "100%",
									fontWeight: "bold",
									mt: 1,
									mb: 5,
								}}
								type="submit"
							>
								kirim
							</Button>
						</form>
					)}
				</Formik>
			</div>
			{/* Akhir form content */}
		</div>
	);
};

export default FormPendaftaranBantuan;
