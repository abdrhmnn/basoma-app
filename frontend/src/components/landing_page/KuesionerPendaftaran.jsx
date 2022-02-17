// styling component linked in kuesioner_pendaftaran.scss file
// and App.scss for tbl_class, tbl_class_head, tbl_class_body class name

import React, { useState, useEffect } from "react";

// components
import SudahMengisiKuesioner from "./SudahMengisiKuesioner";

// Cookiee storage
import kuki from "../../kuki";

// API storage
import API from "../../api";

// npm packages
import {
	Radio,
	RadioGroup,
	FormControlLabel,
	Button,
	Snackbar,
	Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const KuesionerPendaftaran = () => {
	const [kriteriaBantuan, setKriteriaBantuan] = useState(null);
	const [userByID, setUserByID] = useState(null);
	const [prioritas, setPrioritas] = useState(null);

	const navigate = useNavigate();

	// state for get jawaban user
	const [jawabanSatu, setJawabanSatu] = useState(null);
	const [jawabanDua, setJawabanDua] = useState(null);
	const [jawabanTiga, setJawabanTiga] = useState(null);
	const [jawabanEmpat, setJawabanEmpat] = useState(null);
	const [jawabanLima, setJawabanLima] = useState(null);

	// state for get data value from radio button
	const [valueRB1, setValueRB1] = useState("");
	const [valueRB2, setValueRB2] = useState("");
	const [valueRB3, setValueRB3] = useState("");
	const [valueRB4, setValueRB4] = useState("");
	const [valueRB5, setValueRB5] = useState("");

	const [isValidSubmit, setIsValidSubmit] = useState(false);
	const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

	useEffect(() => {
		document.title = "Kuesioner Pendaftaran Bantuan";
		getAllKriteria();
		getAllPrioritas();
		getUserByID();
	}, []);

	const getAllKriteria = async () => {
		const response = await API.getAllKriteria();
		setKriteriaBantuan(response.data);
	};

	const getAllPrioritas = async () => {
		const response = await API.getAllPrioritas();
		setPrioritas(response.data);
	};

	const getUserByID = async () => {
		const response = await API.getUserByID(kuki.get("user_id"));
		setUserByID(response.data);
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setIsOpenSnackbar(false);
	};

	return (
		// Component kuesioner pendaftaran content
		<div className="kuesioner">
			{kriteriaBantuan && userByID && (
				<div>
					{userByID.status_pengisian === "sudah" ? (
						<SudahMengisiKuesioner />
					) : (
						<div>
							{/* Logo dan validasi pengisian */}
							<div className="logo_app_kuesioner">
								<h2>Basoma</h2>
								{isValidSubmit ? (
									<Snackbar
										open={isOpenSnackbar}
										autoHideDuration={6000}
										onClose={handleCloseSnackbar}
									>
										<Alert
											onClose={handleCloseSnackbar}
											severity="warning"
											variant="filled"
										>
											Silahkan jawab semua pertanyaan terlebih
											dahulu!
										</Alert>
									</Snackbar>
								) : null}
							</div>
							{/* Akhir logo dan validasi pengisian */}

							{/* Kuesioner pendaftaran content */}
							<div className="kuesioner_pendaftaran">
								{/* Tabel kuesioner pendaftaran */}
								<table className="tbl_class">
									<thead className="tbl_class_head">
										<tr>
											<th style={{ width: 100 }}>No</th>
											<th style={{ width: 500 }}>Pertanyaan</th>
											<th colSpan={2}>Jawaban</th>
										</tr>
									</thead>

									{/* Tabel body */}
									<tbody className="tbl_class_body">
										{/* Baris satu */}
										<tr>
											<td>1</td>
											<td style={{ textAlign: "left" }}>
												{kriteriaBantuan[0].keterangan}
											</td>
											<td colSpan={2}>
												<RadioGroup
													row
													name="jwb_kuesioner_1"
													onChange={(e) =>
														setJawabanSatu(e.target.value)
													}
												>
													<FormControlLabel
														value={
															kriteriaBantuan[0].nilai_prioritas
														}
														control={
															<Radio
																onChange={() => {
																	setValueRB1(
																		kriteriaBantuan[0]
																			.pilihan_satu
																	);
																}}
																style={{ fontSize: ".9em" }}
															/>
														}
														label={
															kriteriaBantuan[0].pilihan_satu
														}
													/>
													<FormControlLabel
														value={0}
														control={
															<Radio
																onChange={() => {
																	setValueRB1(
																		kriteriaBantuan[0]
																			.pilihan_dua
																	);
																}}
															/>
														}
														label={kriteriaBantuan[0].pilihan_dua}
													/>
												</RadioGroup>
											</td>
										</tr>
										{/* Akhir baris satu */}

										{/* Baris dua */}
										<tr>
											<td>2</td>
											<td style={{ textAlign: "left" }}>
												{kriteriaBantuan[1].keterangan}
											</td>
											<td colSpan={2}>
												<RadioGroup
													row
													name="jwb_kuesioner_2"
													onChange={(e) =>
														setJawabanDua(e.target.value)
													}
												>
													<FormControlLabel
														value={0}
														control={
															<Radio
																onChange={() => {
																	setValueRB2(
																		kriteriaBantuan[1]
																			.pilihan_satu
																	);
																}}
															/>
														}
														label={
															kriteriaBantuan[1].pilihan_satu
														}
													/>
													<FormControlLabel
														value={
															kriteriaBantuan[1].nilai_prioritas
														}
														control={
															<Radio
																onChange={() => {
																	setValueRB2(
																		kriteriaBantuan[1]
																			.pilihan_dua
																	);
																}}
															/>
														}
														label={kriteriaBantuan[1].pilihan_dua}
													/>
												</RadioGroup>
											</td>
										</tr>
										{/* Akhir baris dua */}

										{/* Baris tiga */}
										<tr>
											<td>3</td>
											<td style={{ textAlign: "left" }}>
												{kriteriaBantuan[2].keterangan}
											</td>
											<td colSpan={2}>
												<RadioGroup
													row
													name="jwb_kuesioner_3"
													onChange={(e) =>
														setJawabanTiga(e.target.value)
													}
												>
													<FormControlLabel
														value={
															kriteriaBantuan[2].nilai_prioritas
														}
														control={
															<Radio
																onChange={() => {
																	setValueRB3(
																		kriteriaBantuan[2]
																			.pilihan_satu
																	);
																}}
															/>
														}
														label={
															kriteriaBantuan[2].pilihan_satu
														}
													/>
													<FormControlLabel
														value={0}
														control={
															<Radio
																onChange={() => {
																	setValueRB3(
																		kriteriaBantuan[2]
																			.pilihan_dua
																	);
																}}
															/>
														}
														label={kriteriaBantuan[2].pilihan_dua}
													/>
												</RadioGroup>
											</td>
										</tr>
										{/* Akhir baris tiga */}

										{/* Baris empat */}
										<tr>
											<td>4</td>
											<td style={{ textAlign: "left" }}>
												{kriteriaBantuan[3].keterangan}
											</td>
											<td colSpan={2}>
												<RadioGroup
													row
													name="jwb_kuesioner_4"
													onChange={(e) =>
														setJawabanEmpat(e.target.value)
													}
												>
													<FormControlLabel
														value={
															kriteriaBantuan[3].nilai_prioritas
														}
														control={
															<Radio
																onChange={() => {
																	setValueRB4(
																		kriteriaBantuan[3]
																			.pilihan_satu
																	);
																}}
															/>
														}
														label={
															kriteriaBantuan[3].pilihan_satu
														}
													/>
													<FormControlLabel
														value={0}
														control={
															<Radio
																onChange={() => {
																	setValueRB4(
																		kriteriaBantuan[3]
																			.pilihan_dua
																	);
																}}
															/>
														}
														label={kriteriaBantuan[3].pilihan_dua}
													/>
												</RadioGroup>
											</td>
										</tr>
										{/* Akhir baris empat */}

										{/* Baris lima */}
										<tr>
											<td>5</td>
											<td style={{ textAlign: "left" }}>
												{kriteriaBantuan[4].keterangan}
											</td>
											<td colSpan={2}>
												<RadioGroup
													row
													name="jwb_kuesioner_5"
													onChange={(e) =>
														setJawabanLima(e.target.value)
													}
												>
													<FormControlLabel
														value={0}
														control={
															<Radio
																onChange={() => {
																	setValueRB5(
																		kriteriaBantuan[4]
																			.pilihan_satu
																	);
																}}
															/>
														}
														label={
															kriteriaBantuan[4].pilihan_satu
														}
													/>
													<FormControlLabel
														value={
															kriteriaBantuan[4].nilai_prioritas
														}
														control={
															<Radio
																onChange={() => {
																	setValueRB5(
																		kriteriaBantuan[4]
																			.pilihan_dua
																	);
																}}
															/>
														}
														label={kriteriaBantuan[4].pilihan_dua}
													/>
												</RadioGroup>
											</td>
										</tr>
										{/* Akhir baris lima */}
									</tbody>
									{/* Akhir tabel body */}
								</table>
								{/* Akhir tabel kuesioner pendaftaran */}

								<Button
									variant="contained"
									className="btn_submit_kuesioner"
									onClick={() => {
										const arrJawaban = [];
										let prioritasLength = prioritas.length + 1;

										arrJawaban.push(
											valueRB1,
											valueRB2,
											valueRB3,
											valueRB4,
											valueRB5
										);

										if (
											jawabanSatu &&
											jawabanDua &&
											jawabanTiga &&
											jawabanEmpat &&
											jawabanLima
										) {
											const hasilNilaiPrioritas =
												parseFloat(jawabanSatu) +
												parseFloat(jawabanDua) +
												parseFloat(jawabanTiga) +
												parseFloat(jawabanEmpat) +
												parseFloat(jawabanLima);

											for (let i = 0; i < arrJawaban.length; i++) {
												API.savePrioritas(
													prioritasLength++,
													arrJawaban[i],
													kuki.get("user_id"),
													Math.floor(
														(hasilNilaiPrioritas / 10) * 1000
													),
													i
												).then((res) => {
													navigate("/hasil-kuesioner-pendaftaran");
												});
											}

											API.updateStatusPengisianUser(
												kuki.get("user_id")
											);
										} else {
											setIsValidSubmit(true);
											setIsOpenSnackbar(true);
										}
									}}
									type="submit"
								>
									kirim
								</Button>
							</div>
							{/* Akhir kuesioner pendaftaran content */}
						</div>
					)}
				</div>
			)}
		</div>
		// Akhir component kuesioner pendaftaran content
	);
};

export default KuesionerPendaftaran;
