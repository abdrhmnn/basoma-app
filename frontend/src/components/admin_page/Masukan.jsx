import React, { useState, useEffect } from "react";

// components
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

// Cookie storage
import kuki from "../../kuki";

// API storage
import API from "../../api";

// npm packages
import {
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	CircularProgress,
	Snackbar,
	Alert,
	FormControl,
	Select,
	MenuItem,
} from "@mui/material";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const Masukan = () => {
	const [masukan, setMasukan] = useState(null);
	const [masukanByID, setMasukanByID] = useState(null);
	const [pesanBalas, setPesanBalas] = useState(null);
	const [valueCari, setValueCari] = useState("");

	const [openDialog, setOpenDialog] = useState(false);
	const [openTextfieldPesanBalas, setOpenTextfieldPesanBalas] = useState(true);
	const [isSubmitPesanBalas, setIsSubmitPesanBalas] = useState(false);
	const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

	const [dataMasukanLength, setDataMasukanLength] = useState(5);

	useEffect(() => {
		document.title = "Kelola Masukan";
		getAllMasukan();
		getAllPesanBalas();
	}, []);

	const schemaBalasPesan = Yup.object({
		pesan_balas: Yup.string().required("Pesan masih kosong!"),
	});

	const getAllMasukan = async () => {
		const response = await API.getAllMasukan();
		setMasukan(response.data);
	};

	const getAllPesanBalas = async () => {
		const response = await API.getAllPesanBalas();
		setPesanBalas(response.data);
	};

	const handleChange = (e) => {
		setValueCari(e.target.value);
	};

	return (
		<div style={{ display: "flex" }}>
			<NavbarAdmin />
			<div className="flex_header_admin">
				<HeaderAdmin />
				<div className="content_dashboard_admin">
					{isOpenSnackbar ? (
						<Snackbar
							open={isOpenSnackbar}
							autoHideDuration={6000}
							onClose={(e, reason) => {
								if (reason === "clickaway") {
									return;
								}

								setIsOpenSnackbar(false);
							}}
						>
							<Alert
								onClose={(e, reason) => {
									if (reason === "clickaway") {
										return;
									}

									setIsOpenSnackbar(false);
								}}
								severity="success"
								variant="filled"
							>
								Pesan balas berhasil dikirim!
							</Alert>
						</Snackbar>
					) : null}
					<h2>Data Masukan</h2>
					<div className="wrap_tbl_masukan">
						<div className="flex_element_masukan">
							<TextField
								label="Cari berdasarkan nama"
								name="nm_depan"
								variant="outlined"
								sx={{ width: "30%" }}
								autoComplete="off"
								onChange={handleChange}
							/>
						</div>
						<table className="tbl_class">
							<thead className="tbl_class_head">
								<tr>
									<th>No</th>
									<th>Nama Lengkap</th>
									<th>Pesan</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody className="tbl_class_body">
								{masukan &&
									masukan.slice(0, dataMasukanLength).map((e, i) => {
										const stringData = e.nm_depan + e.nm_belakang;

										if (
											stringData.toLowerCase().includes(valueCari)
										) {
											return (
												<tr key={i}>
													<td>{i + 1}</td>
													<td style={{ textAlign: "left" }}>
														{e.nm_depan} {e.nm_belakang}
													</td>
													<td
														style={{
															textAlign: "left",
															overflow: "hidden",
															textOverflow: "ellipsis",
															whiteSpace: "nowrap",
															maxWidth: 100,
														}}
													>
														{e.pesan}
													</td>
													<td>
														<Button
															variant="contained"
															className="btn_detail_masukan"
															onClick={() => {
																setOpenDialog(true);
																API.getMasukanByID(
																	e.kd_masukan
																).then((res) => {
																	setMasukanByID(res.data);
																});
																setMasukanByID(null);
															}}
														>
															detail
														</Button>
													</td>
												</tr>
											);
										}
										return null;
									})}
							</tbody>
						</table>
						<div className="show_length_data_masukan">
							<p>Liat baris: </p>
							<FormControl>
								<Select
									id="masukan_data_length"
									value={dataMasukanLength}
									onChange={(e) => {
										setDataMasukanLength(e.target.value);
									}}
								>
									<MenuItem value={5}>5</MenuItem>
									<MenuItem value={10}>10</MenuItem>
									<MenuItem value={20}>20</MenuItem>
									<MenuItem value={50}>50</MenuItem>
								</Select>
							</FormControl>
						</div>
						{masukanByID && (
							<Dialog
								open={openDialog}
								onClose={() => {
									setOpenDialog(false);
									setOpenTextfieldPesanBalas(true);
									setIsSubmitPesanBalas(false);
								}}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle
									id="alert-dialog-title"
									sx={{ fontSize: "1.1em" }}
								>
									Detail Masukan
								</DialogTitle>
								<DialogContent>
									<Formik
										initialValues={{ pesan_balas: "" }}
										validationSchema={schemaBalasPesan}
										onSubmit={(values, actions) => {
											setIsSubmitPesanBalas(true);
											setTimeout(() => {
												setIsSubmitPesanBalas(false);
												API.savePesanBalas(
													values,
													pesanBalas.length + 1,
													kuki.get("user_id"),
													masukanByID.kd_masukan
												);
												setOpenDialog(false);
												setOpenTextfieldPesanBalas(true);
												setIsOpenSnackbar(true);
											}, 3000);
										}}
									>
										{(props) => (
											<form onSubmit={props.handleSubmit}>
												<Field
													name="nama_pengirim"
													variant="outlined"
													label="Nama Pengirim"
													as={TextField}
													defaultValue={`${masukanByID.nm_depan} ${masukanByID.nm_belakang}`}
													className="text_nama_pengirim"
													disabled={true}
												/>
												<Field
													name="pesan_masukan"
													variant="outlined"
													label="Pesan"
													multiline
													rows={4}
													as={TextField}
													defaultValue={`${masukanByID.pesan}`}
													disabled={true}
												/>
												{openTextfieldPesanBalas ? (
													<p
														onClick={() => {
															setOpenTextfieldPesanBalas(false);
														}}
													>
														Balas Pesan
													</p>
												) : (
													<div className="pesan_balas_masukan">
														<Field
															name="pesan_balas"
															variant="outlined"
															label="Pesan Balas"
															multiline
															rows={3}
															as={TextField}
															style={{ marginBottom: 15 }}
															error={
																props.touched.pesan_balas &&
																props.errors.pesan_balas
																	? true
																	: false
															}
															helperText={
																props.touched.pesan_balas &&
																props.errors.pesan_balas
															}
														/>
														<Button
															variant="contained"
															type="submit"
															className={
																isSubmitPesanBalas
																	? "submit_pesan_balas"
																	: ""
															}
														>
															{isSubmitPesanBalas ? (
																<CircularProgress
																	size={27}
																	sx={{
																		color: "white",
																		opacity: ".6",
																	}}
																/>
															) : (
																"kirim"
															)}
														</Button>
													</div>
												)}
											</form>
										)}
									</Formik>
								</DialogContent>
							</Dialog>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Masukan;
