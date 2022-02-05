import React, { useState, useEffect } from "react";

// files
import { kuki } from "../../kuki";

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
import axios from "axios";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const FormPendaftaranBantuan = () => {
	const [userById, setUserById] = useState(null);
	const [penghasilan, setPenghasilan] = useState("");
	const [pendidikan, setPendidikan] = useState("");
	const [luasRumah, setLuasRumah] = useState("");
	const [isValidTypeKTP, setIsValidTypeKTP] = useState(true);
	const [isValidTypeBangunan, setIsValidTypeBangunan] = useState(true);
	const [showImgKTP, setShowImgKTP] = useState();
	const [showImgBangunan, setShowImgBangunan] = useState();
	const [selectedFileImgKTP, setSelectedFileImgKTP] = useState(null);
	const [selectedFileImgBangunan, setSelectedFileImgBangunan] = useState(null);

	const [isCompleteSubmit, setIsCompleteSubmit] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Formulir Pendaftaran Bantuan";
		getUserById();
	}, []);

	const schemaEditProfile = Yup.object({
		nik: Yup.number()
			.typeError("NIK tidak valid!")
			.required("NIK masih kosong!"),
		nm_lengkap: Yup.string().required("Nama lengkap masih kosong!"),
		pekerjaan: Yup.string().required("Pekerjaan masih kosong!"),
		sumber_penerangan: Yup.string().required("Pekerjaan masih kosong!"),
	});

	const getUserById = async () => {
		const response = await axios.get(
			`http://localhost:5000/users/${kuki.get("user_id")}`
		);
		setUserById(response.data);
	};

	const TextFieldCustom = (props) => {
		return <TextField fullWidth {...props} />;
	};

	// console.log(acceptedFiles);

	return (
		<div className="form_pendaftaran">
			{userById && (
				<div className="form_title">
					<h2>
						Halo, {userById.nm_depan} {userById.nm_belakang}
					</h2>
					<p>
						Silahkan lengkapi data dibawah ini untuk digunakan sebagai
						data pendaftaran bantuan
					</p>
				</div>
			)}
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
					validationSchema={schemaEditProfile}
					onSubmit={(values, actions) => {
						// console.log(values, penghasilan, pendidikan, luasRumah);
						// console.log(selectedFileImgKTP);
						// console.log(selectedFileImgBangunan);
						if (
							penghasilan &&
							pendidikan &&
							luasRumah &&
							selectedFileImgKTP &&
							selectedFileImgBangunan
						) {
							setIsCompleteSubmit(false);
							const dataKTP = new FormData();
							const dataBangunan = new FormData();
							dataKTP.append("gambar_form_ktp", selectedFileImgKTP);
							dataBangunan.append(
								"gambar_form_bangunan",
								selectedFileImgBangunan
							);
							axios.post("http://localhost:5000/uploads/ktp", dataKTP);
							axios.post(
								"http://localhost:5000/uploads/bangunan",
								dataBangunan
							);
							axios
								.post("http://localhost:5000/warga", {
									no_ktp: values.nik,
									user_id: kuki.get("user_id"),
									nama_lengkap: values.nm_lengkap,
									alamat: values.alamat,
									pekerjaan: values.pekerjaan,
									penghasilan: penghasilan,
									pendidikan: pendidikan,
									luas_bangunan: luasRumah,
									sumber_penerangan_rumah: values.sumber_penerangan,
									foto_ktp: selectedFileImgKTP.name,
									foto_bangunan_rumah: selectedFileImgBangunan.name,
								})
								.then((res) => {
									navigate("/form-pendaftaran-success");
								});
							console.log("ok");
						} else {
							setIsCompleteSubmit(true);
						}

						// console.log("ok");
					}}
				>
					{(props) => (
						<form onSubmit={props.handleSubmit}>
							<div className="flex_nik_nm_lengkap">
								<div style={{ width: 380 }}>
									<Field
										name="nik"
										variant="outlined"
										label="Nomor Induk Kependudukan"
										as={TextFieldCustom}
										error={
											props.touched.nik && props.errors.nik
												? true
												: false
										}
										helperText={props.touched.nik && props.errors.nik}
									/>
								</div>
								<div style={{ width: 400 }}>
									<Field
										name="nm_lengkap"
										variant="outlined"
										label="Nama Lengkap"
										as={TextFieldCustom}
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
							<div>
								<Field
									name="alamat"
									variant="outlined"
									label="Alamat Tempat Tinggal"
									multiline
									rows={3}
									as={TextFieldCustom}
								/>
							</div>
							<div className="flex_pekerjaan_penghasilan">
								<div style={{ width: 380 }}>
									<Field
										name="pekerjaan"
										variant="outlined"
										label="Pekerjaan"
										as={TextFieldCustom}
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
								<div style={{ width: 400 }}>
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
							<div className="flex_pendidikan_luas_bangunan">
								<div style={{ width: 380 }}>
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
								<div style={{ width: 400 }}>
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
							<div>
								<Field
									name="sumber_penerangan"
									variant="outlined"
									label="Sumber Penerangan"
									as={TextFieldCustom}
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
							<div className="flex_fktp_fbanguan">
								<div className="fktp">
									<p>Foto Kartu Tanda Penduduk</p>
									{showImgKTP ? (
										<div style={{ paddingRight: 20 }}>
											<img
												src={showImgKTP}
												alt="Foto KTP"
												width={350}
											/>
											<br />
											{isValidTypeKTP ? (
												<Button
													variant="contained"
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
												onChange={(e) => {
													e.preventDefault();
													const file = e.target.files[0];
													setShowImgKTP(URL.createObjectURL(file));
													const sizeFile = file.size;
													const dataFile = file.name.split(".");
													const typeFile =
														dataFile[dataFile.length - 1];
													const validType = ["png", "jpeg", "jpg"];

													if (
														validType.includes(typeFile) ||
														sizeFile > 5000000
													) {
														setIsValidTypeKTP(true);
														props.setFieldValue(
															"file",
															e.currentTarget.files[0]
														);
														setSelectedFileImgKTP(file);
													} else {
														setIsValidTypeKTP(false);
													}
												}}
											/>
										</Button>
									)}
								</div>
								<div
									className={`fbangunan ${
										isValidTypeBangunan ? "" : "ml_bangunan"
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
											{isValidTypeBangunan ? (
												<Button
													variant="contained"
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
													e.preventDefault();
													const file = e.target.files[0];
													setShowImgBangunan(
														URL.createObjectURL(file)
													);
													const sizeFile = file.size;
													const dataFile = file.name.split(".");
													const typeFile =
														dataFile[dataFile.length - 1];
													const validType = ["png", "jpeg", "jpg"];

													if (
														validType.includes(typeFile) ||
														sizeFile > 5000000
													) {
														setIsValidTypeBangunan(true);
														props.setFieldValue(
															"file",
															e.currentTarget.files[0]
														);
														setSelectedFileImgBangunan(file);
													} else {
														setIsValidTypeBangunan(false);
													}
												}}
											/>
										</Button>
									)}
								</div>
							</div>
							<Button
								variant="contained"
								sx={{
									padding: 1,
									width: "100%",
									fontWeight: "bold",
									mt: 3,
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
		</div>
	);
};

export default FormPendaftaranBantuan;
