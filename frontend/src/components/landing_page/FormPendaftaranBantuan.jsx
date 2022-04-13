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
	const [kesehatan, setKesehatan] = useState("");

	const [isValidImgTypeKK, setIsValidImgTypeKK] = useState(true);
	const [isValidImgTypeKTP, setIsValidImgTypeKTP] = useState(true);

	const [showImgKK, setShowImgKK] = useState();
	const [showImgKTP, setShowImgKTP] = useState();

	const [selectedFileImgKK, setSelectedFileImgKK] = useState(null);
	const [selectedFileImgKTP, setSelectedFileImgKTP] = useState(null);

	const [isCompleteSubmit, setIsCompleteSubmit] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Formulir Pendaftaran Bantuan";
		getUserByID();
		getAllAlternatif();
	}, []);

	const schemaFormPendaftaranBantuan = Yup.object({
		no_kk: Yup.number()
			.typeError("Nomor kartu keluarga tidak valid!")
			.required("Nomor kartu keluarga masih kosong!"),
		no_ktp: Yup.number()
			.typeError("Nomor kartu tanda penduduk tidak valid!")
			.required("Nomor kartu tanda penduduk masih kosong!"),
		nm_lengkap: Yup.string().required("Nama lengkap masih kosong!"),
		alamat: Yup.string().required("Alamat tempat tinggal masih kosong!"),
		konsumsi_makanan: Yup.string().required("Konsumsi makanan masih kosong!"),
		kondisi_pakaian: Yup.string().required("Kondisi pakaian masih kosong!"),
		asset: Yup.string().required("Asset barang masih kosong!"),
		luas_bangunan: Yup.string().required("Luas bangunan rumah masih kosong!"),
	});

	const getUserByID = async () => {
		const response = await API.getUserByID(kuki.get("user_id"));
		setUserByID(response.data);
	};

	const getAllAlternatif = async () => {
		const response = await API.getAllAlternatif();
		setAlternatif(response.data);
	};

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
						no_kk: "",
						no_ktp: "",
						nm_lengkap: "",
						alamat: "",
						konsumsi_makanan: "",
						kondisi_pakaian: "",
						asset: "",
						luas_bangunan: "",
					}}
					validationSchema={schemaFormPendaftaranBantuan}
					onSubmit={(values, actions) => {
						if (
							kesehatan &&
							pendidikan &&
							penghasilan &&
							selectedFileImgKK &&
							selectedFileImgKTP
						) {
							setIsCompleteSubmit(false);
							const dataImgKK = new FormData();
							const dataImgKTP = new FormData();
							dataImgKK.append("gambar_form_kk", selectedFileImgKK);
							dataImgKTP.append("gambar_form_ktp", selectedFileImgKTP);
							API.saveIMG_KK(dataImgKK);
							API.saveIMG_KTP(dataImgKTP);
							API.saveAlternatif({
								id_alternatif: `AI_${alternatif.length + 1}`,
								user_id: kuki.get("user_id"),
								nilai_ci: kuki.get("nilai_ci"),
								nilai_cr: kuki.get("nilai_cr"),
							});
							API.saveWarga(
								values,
								kuki.get("user_id"),
								kuki.get("bantuan_id"),
								kesehatan,
								penghasilan,
								pendidikan,
								selectedFileImgKK,
								selectedFileImgKTP,
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
											props.touched.no_kk && props.errors.no_kk
												? true
												: false
										}
										helperText={
											props.touched.no_kk && props.errors.no_kk
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
											props.touched.no_ktp && props.errors.no_ktp
												? true
												: false
										}
										helperText={
											props.touched.no_ktp && props.errors.no_ktp
										}
									/>
								</div>
							</div>
							{/* Akhir group textfield nkk dan no_ktp */}

							<div>
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
							</div>

							<div style={{ marginTop: "18px" }}>
								<Field
									name="alamat"
									variant="outlined"
									label="Alamat tempat tinggal"
									autoComplete="off"
									multiline
									fullWidth
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
							</div>

							{/* Group textfield makanan dan pakaian */}
							<div className="flex_makanan_pakaian">
								<div className="text_makanan">
									<Field
										name="konsumsi_makanan"
										variant="outlined"
										label="Konsumsi makanan sehari-hari"
										autoComplete="off"
										fullWidth
										as={TextField}
										error={
											props.touched.konsumsi_makanan &&
											props.errors.konsumsi_makanan
												? true
												: false
										}
										helperText={
											props.touched.konsumsi_makanan &&
											props.errors.konsumsi_makanan
										}
									/>
								</div>
								<div className="text_pakaian">
									<Field
										name="kondisi_pakaian"
										variant="outlined"
										label="Kondisi pakaian yang dikenakan"
										autoComplete="off"
										fullWidth
										as={TextField}
										error={
											props.touched.kondisi_pakaian &&
											props.errors.kondisi_pakaian
												? true
												: false
										}
										helperText={
											props.touched.kondisi_pakaian &&
											props.errors.kondisi_pakaian
										}
									/>
								</div>
							</div>
							{/* Akhir group textfield makanan dan pakaian */}

							<div className="flex_kesehatan_asset">
								<div className="text_kesehatan">
									<FormControl fullWidth>
										<InputLabel id="kesehatan">
											Membayar biaya pengobatan
										</InputLabel>
										<Select
											labelId="kesehatan"
											id="kesehatan"
											value={kesehatan}
											label="Membayar biaya pengobatan"
											onChange={(e) => {
												setKesehatan(e.target.value);
											}}
										>
											<MenuItem value="Mampu">Mampu</MenuItem>
											<MenuItem value="Tidak">Tidak</MenuItem>
										</Select>
									</FormControl>
								</div>
								<div className="text_asset">
									<Field
										name="asset"
										variant="outlined"
										label="Barang yang mudah dijual"
										autoComplete="off"
										fullWidth
										as={TextField}
										error={
											props.touched.asset && props.errors.asset
												? true
												: false
										}
										helperText={
											props.touched.asset && props.errors.asset
										}
									/>
								</div>
							</div>

							{/* Group textfield pendidikan dan penghasilan */}
							<div className="flex_pendidikan_penghasilan">
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
											<MenuItem value="Rp 600.000">
												Dibawah Rp 600.000 per bulan
											</MenuItem>
											<MenuItem value="Rp 600.000 - Rp 1.000.000">
												Rp 600.000 - Rp 1.000.000 per bulan
											</MenuItem>
											<MenuItem value="Rp 1.500.000 - Rp 2.000.000">
												Rp 1.500.000 - Rp 2.000.000 per bulan
											</MenuItem>
											<MenuItem value="Rp 2.000.000">
												Diatas Rp 2.000.000 per bulan
											</MenuItem>
										</Select>
									</FormControl>
								</div>
							</div>
							{/* Akhir group textfield pendidikan dan penghasilan */}

							<div style={{ marginTop: "18px" }}>
								<Field
									name="luas_bangunan"
									variant="outlined"
									label="Luas bangunan rumah"
									autoComplete="off"
									fullWidth
									as={TextField}
									error={
										props.touched.luas_bangunan &&
										props.errors.luas_bangunan
											? true
											: false
									}
									helperText={
										props.touched.luas_bangunan &&
										props.errors.luas_bangunan
									}
								/>
							</div>

							{/* Group button fkk dan fktp */}
							<div className="flex_fkk_fktp">
								{/* Button fkk section */}
								<div className="fkk">
									<p>Foto kartu keluarga</p>
									{showImgKK ? (
										<div style={{ paddingRight: 20 }}>
											<img
												src={showImgKK}
												width={350}
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
														Perhatikan jenis ekstensi dan ukuran
														file yang diperbolehkan
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
												style={{ color: "rgb(182, 182, 182)" }}
												size={60}
											/>
											<p>Pilih foto</p>
											<p>Ekstensi: .png, .jpeg, .jpg || 5MB</p>
											<input
												id="file"
												type="file"
												name="gambar_form_kk"
												hidden
												onChange={(e) => generateImgKK(e, props)}
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
											<img src={showImgKTP} width={350} alt="-" />
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
								sx={{
									padding: 1,
									width: "100%",
									fontWeight: "bold",
									mt: 1,
									mb: 5,
								}}
								type="submit"
							>
								submit
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
