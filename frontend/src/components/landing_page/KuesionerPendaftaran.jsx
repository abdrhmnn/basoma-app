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
import { useNavigate, useLocation } from "react-router-dom";

const KuesionerPendaftaran = () => {
	const [kriteriaBantuan, setKriteriaBantuan] = useState(null);
	const [userByID, setUserByID] = useState(null);
	const [prioritas, setPrioritas] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();

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

	// state for check correct users answer
	const [correctAnswer1, setCorrectAnswer1] = useState(false);
	const [correctAnswer2, setCorrectAnswer2] = useState(false);
	const [correctAnswer3, setCorrectAnswer3] = useState(false);
	const [correctAnswer4, setCorrectAnswer4] = useState(false);
	const [correctAnswer5, setCorrectAnswer5] = useState(false);

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

	const hitungNilaiDecimalAlternatif = () => {
		const nilaiBobot = [];
		const kalkulasiNilaiDecimal = [];
		const nilaiEigen = [];
		const nilaiLamda = [];
		const jmlhKriteria = 5;
		const nilaiRI = 1.12;

		// variable untuk menyimpan nilai decimal per jawaban yang sesuai dgn kriteria
		const nilaiDecimalPendidikan = [];
		const nilaiDecimalPekerjaan = [];
		const nilaiDecimalPenghasilan = [];
		const nilaiDecimalLuasRumah = [];
		const nilaiDecimalSumberPenerangan = [];

		// variabel untuk menyimpan nilai normalisasi alternatif
		const normalisasiPendidikan = [];
		const normalisasiPekerjaan = [];
		const normalisasiPenghasilan = [];
		const normalisasiLuasRumah = [];
		const normalisasiSumberPenerangan = [];

		// variabel untuk menangkap nilai normalisasi lamda alternatif
		const normalisasiLamda = [];

		for (let i = 0; i < kriteriaBantuan.length; i++) {
			nilaiBobot.push(kriteriaBantuan[i].nilai_bobot);
		}

		// loop per jawaban untuk mendapatkan nilai decimal per kriteria
		if (correctAnswer1) {
			for (let i = 0; i < kriteriaBantuan.length; i++) {
				nilaiDecimalPendidikan.push(nilaiBobot[0] / nilaiBobot[i]);
			}
		} else {
			nilaiDecimalPendidikan.push(1, 0, 0, 0, 0);
		}

		if (correctAnswer2) {
			for (let i = 0; i < kriteriaBantuan.length; i++) {
				nilaiDecimalPekerjaan.push(nilaiBobot[1] / nilaiBobot[i]);
			}
		} else {
			nilaiDecimalPekerjaan.push(0, 1, 0, 0, 0);
		}

		if (correctAnswer3) {
			for (let i = 0; i < kriteriaBantuan.length; i++) {
				nilaiDecimalPenghasilan.push(nilaiBobot[2] / nilaiBobot[i]);
			}
		} else {
			nilaiDecimalPenghasilan.push(0, 0, 1, 0, 0);
		}

		if (correctAnswer4) {
			for (let i = 0; i < kriteriaBantuan.length; i++) {
				nilaiDecimalLuasRumah.push(nilaiBobot[3] / nilaiBobot[i]);
			}
		} else {
			nilaiDecimalLuasRumah.push(0, 0, 0, 1, 0);
		}

		if (correctAnswer5) {
			for (let i = 0; i < kriteriaBantuan.length; i++) {
				nilaiDecimalSumberPenerangan.push(nilaiBobot[4] / nilaiBobot[i]);
			}
		} else {
			nilaiDecimalSumberPenerangan.push(0, 0, 0, 0, 1);
		}

		// membulatkan nilai decimal yang didapat
		const roundNilaiDecimalPendidikan = nilaiDecimalPendidikan.map(
			(e, i) => Math.floor(e * 1000) / 1000
		);
		const roundNilaiDecimalPekerjaan = nilaiDecimalPekerjaan.map(
			(e, i) => Math.floor(e * 1000) / 1000
		);
		const roundNilaiDecimalPenghasilan = nilaiDecimalPenghasilan.map(
			(e, i) => Math.floor(e * 1000) / 1000
		);
		const roundNilaiDecimalLuasRumah = nilaiDecimalLuasRumah.map(
			(e, i) => Math.floor(e * 1000) / 1000
		);
		const roundNilaiDecimalSumberPenerangan =
			nilaiDecimalSumberPenerangan.map(
				(e, i) => Math.floor(e * 1000) / 1000
			);

		// kalkulasi nilai desimal dan push ke new array
		for (let y = 0; y < kriteriaBantuan.length; y++) {
			kalkulasiNilaiDecimal.push(
				roundNilaiDecimalPendidikan[y] +
					roundNilaiDecimalPekerjaan[y] +
					roundNilaiDecimalPenghasilan[y] +
					roundNilaiDecimalLuasRumah[y] +
					roundNilaiDecimalSumberPenerangan[y]
			);
		}

		// round kalkulasi nilai perbandingan alternatif
		const roundKalkulasiPerbandinganAlternatif = kalkulasiNilaiDecimal.map(
			(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
		);

		// push nilai normalisasi per alternatif
		for (let x = 0; x < kriteriaBantuan.length; x++) {
			normalisasiPendidikan.push(
				roundNilaiDecimalPendidikan[x] / kalkulasiNilaiDecimal[x]
			);
			normalisasiPekerjaan.push(
				roundNilaiDecimalPekerjaan[x] / kalkulasiNilaiDecimal[x]
			);
			normalisasiPenghasilan.push(
				roundNilaiDecimalPenghasilan[x] / kalkulasiNilaiDecimal[x]
			);
			normalisasiLuasRumah.push(
				roundNilaiDecimalLuasRumah[x] / kalkulasiNilaiDecimal[x]
			);
			normalisasiSumberPenerangan.push(
				roundNilaiDecimalSumberPenerangan[x] / kalkulasiNilaiDecimal[x]
			);
		}

		// membulatkan hasil normalisasi
		const roundNormalisasiPendidikan = normalisasiPendidikan.map(
			(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
		);
		const roundNormalisasiPekerjaan = normalisasiPekerjaan.map(
			(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
		);
		const roundNormalisasiPenghasilan = normalisasiPenghasilan.map(
			(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
		);
		const roundNormalisasiLuasRumah = normalisasiLuasRumah.map(
			(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
		);
		const roundNormalisasiSumberPenerangan = normalisasiSumberPenerangan.map(
			(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
		);

		// kalkulasi data normalisasi
		const jmlhNormalisasiPendidikan = roundNormalisasiPendidikan.reduce(
			(accu, curr) => accu + curr,
			0
		);
		const jmlhNormalisasiPekerjaan = roundNormalisasiPekerjaan.reduce(
			(accu, curr) => accu + curr,
			0
		);
		const jmlhNormalisasiPenghasilan = roundNormalisasiPenghasilan.reduce(
			(accu, curr) => accu + curr,
			0
		);
		const jmlhNormalisasiLuasRumah = roundNormalisasiLuasRumah.reduce(
			(accu, curr) => accu + curr,
			0
		);
		const jmlhNormalisasiSumberPenerangan =
			roundNormalisasiSumberPenerangan.reduce(
				(accu, curr) => accu + curr,
				0
			);

		// menghitung nilai eigen
		nilaiEigen.push(
			Math.round(
				(Math.round(jmlhNormalisasiPendidikan.toFixed(3) * 1e3) /
					1e3 /
					jmlhKriteria) *
					100
			) / 100,
			Math.round(
				(Math.round(jmlhNormalisasiPekerjaan.toFixed(3) * 1e3) /
					1e3 /
					jmlhKriteria) *
					100
			) / 100,
			Math.round(
				(Math.round(jmlhNormalisasiPenghasilan.toFixed(3) * 1e3) /
					1e3 /
					jmlhKriteria) *
					100
			) / 100,
			Math.round(
				(Math.round(jmlhNormalisasiLuasRumah.toFixed(3) * 1e3) /
					1e3 /
					jmlhKriteria) *
					100
			) / 100,
			Math.round(
				(Math.round(jmlhNormalisasiSumberPenerangan.toFixed(3) * 1e3) /
					1e3 /
					jmlhKriteria) *
					100
			) / 100
		);

		// mencari nilai lamda, lamda maks, CI, dan CR
		for (let i = 0; i < kriteriaBantuan.length; i++) {
			nilaiLamda.push(
				nilaiEigen[i] * roundKalkulasiPerbandinganAlternatif[i]
			);
		}

		const nilaiLamdaMaks = nilaiLamda.reduce((accu, curr) => accu + curr, 0);
		const nilaiCI = (nilaiLamdaMaks - jmlhKriteria) / (jmlhKriteria - 1);
		const nilaiCR = nilaiCI / nilaiRI;

		// mendapatkan nilai normalisasi lamda per alternatif
		for (let i = 0; i < kriteriaBantuan.length; i++) {
			normalisasiLamda.push(nilaiLamda[i] * kriteriaBantuan[i].nilai_lamda);
		}

		// nilai hasil akhir rangking
		const nilaiRangkingAlternatif = (
			normalisasiLamda.reduce((accu, curr) => accu + curr) * 10
		).toFixed(2);

		kuki.set("nilai_ci", nilaiCI);
		kuki.set("nilai_cr", nilaiCR);
		kuki.set("nilai_rangking", nilaiRangkingAlternatif);
		kuki.set("bantuan_id", location.state);
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
																	setCorrectAnswer1(true);
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
																	setCorrectAnswer1(false);
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
																	setCorrectAnswer2(false);
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
																	setCorrectAnswer2(true);
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
																	setCorrectAnswer3(true);
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
																	setCorrectAnswer3(false);
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
																	setCorrectAnswer4(true);
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
																	setCorrectAnswer4(false);
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
																	setCorrectAnswer5(false);
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
																	setCorrectAnswer5(true);
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
										const arrValueJawaban = [];
										let prioritasLength = prioritas.length + 1;

										arrValueJawaban.push(
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

											hitungNilaiDecimalAlternatif();

											for (
												let i = 0;
												i < arrValueJawaban.length;
												i++
											) {
												API.savePrioritas({
													prioritas_id: `PRIO_${prioritasLength++}`,
													user_id: kuki.get("user_id"),
													pilihan: arrValueJawaban[i],
													total_nilai: Math.floor(
														(hasilNilaiPrioritas / 10) * 1000
													),
													identitas_pilihan: i,
												}).then((res) => {
													navigate("/hasil-kuesioner-pendaftaran");
												});
											}

											API.updateUser(kuki.get("user_id"), {
												status_pengisian: "sudah",
											});
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
