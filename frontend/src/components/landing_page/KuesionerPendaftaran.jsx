import React, { useState, useEffect } from "react";

// components or files
import SudahMengisiKuesioner from "./SudahMengisiKuesioner.jsx";
import { kuki } from "../../kuki/index.js";

// npm packages
import axios from "axios";
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
	const [userById, setUserById] = useState(null);
	const navigate = useNavigate();

	const [jawaban1, setJawaban1] = useState(null);
	const [jawaban2, setJawaban2] = useState(null);
	const [jawaban3, setJawaban3] = useState(null);
	const [jawaban4, setJawaban4] = useState(null);
	const [jawaban5, setJawaban5] = useState(null);

	const [value1, setValue1] = useState("");
	const [value2, setValue2] = useState("");
	const [value3, setValue3] = useState("");
	const [value4, setValue4] = useState("");
	const [value5, setValue5] = useState("");

	const [isValid, setIsValid] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		document.title = "Kuesioner Pendaftaran Bantuan";
		getAllKriteria();
		getUserById();
	}, []);

	const getAllKriteria = async () => {
		const response = await axios.get("http://localhost:5000/kriteria");
		setKriteriaBantuan(response.data);
	};

	const getUserById = async () => {
		const response = await axios.get(
			`http://localhost:5000/users/${kuki.get("user_id")}`
		);
		setUserById(response.data);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<div className="kuesioner">
			{kriteriaBantuan && userById && (
				<div>
					{userById.status_pengisian === "sudah" ? (
						<SudahMengisiKuesioner />
					) : (
						<div>
							<div className="logo_app_kuesioner">
								<h2>Basoma</h2>
								{isValid ? (
									<Snackbar
										open={open}
										autoHideDuration={6000}
										onClose={handleClose}
									>
										<Alert
											onClose={handleClose}
											severity="warning"
											variant="outlined"
										>
											Silahkan jawab semua pertanyaan terlebih
											dahulu!
										</Alert>
									</Snackbar>
								) : null}
							</div>
							<div className="kuesioner_pendaftaran">
								<table className="tbl_class">
									<thead className="tbl_class_head">
										<tr>
											<th style={{ width: 100 }}>No</th>
											<th style={{ width: 500 }}>Pertanyaan</th>
											<th colSpan={2}>Jawaban</th>
										</tr>
									</thead>
									<tbody className="tbl_class_body">
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
														setJawaban1(e.target.value)
													}
												>
													<FormControlLabel
														value={
															kriteriaBantuan[0].nilai_prioritas
														}
														control={
															<Radio
																onChange={() => {
																	setValue1(
																		kriteriaBantuan[0]
																			.pilihan_satu
																	);
																}}
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
																	setValue1(
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
														setJawaban2(e.target.value)
													}
												>
													<FormControlLabel
														value={0}
														control={
															<Radio
																onChange={() => {
																	setValue2(
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
																	setValue2(
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
														setJawaban3(e.target.value)
													}
												>
													<FormControlLabel
														value={
															kriteriaBantuan[2].nilai_prioritas
														}
														control={
															<Radio
																onChange={() => {
																	setValue3(
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
																	setValue3(
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
														setJawaban4(e.target.value)
													}
												>
													<FormControlLabel
														value={
															kriteriaBantuan[3].nilai_prioritas
														}
														control={
															<Radio
																onChange={() => {
																	setValue4(
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
																	setValue4(
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
														setJawaban5(e.target.value)
													}
												>
													<FormControlLabel
														value={0}
														control={
															<Radio
																onChange={() => {
																	setValue5(
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
																	setValue5(
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
									</tbody>
								</table>
								<Button
									variant="contained"
									className="btn_submit_kuesioner"
									onClick={(e) => {
										// e.preventDefault()
										const arrJawaban = [];
										arrJawaban.push(
											value1,
											value2,
											value3,
											value4,
											value5
										);

										// console.log(arrJawaban)
										// console.log(jawaban1, jawaban2, jawaban3, jawaban4, jawaban5)

										if (
											jawaban1 &&
											jawaban2 &&
											jawaban3 &&
											jawaban4 &&
											jawaban5
										) {
											const hasilNilaiPrioritas =
												parseFloat(jawaban1) +
												parseFloat(jawaban2) +
												parseFloat(jawaban3) +
												parseFloat(jawaban4) +
												parseFloat(jawaban5);

											// console.log(typeof parseInt(finalResult))
											for (let i = 0; i < arrJawaban.length; i++) {
												axios
													.post(
														"http://localhost:5000/nilai-prioritas",
														{
															prioritas_id: `PRIO_${i + 1}`,
															user_id: kuki.get("user_id"),
															id_kriteria:
																kriteriaBantuan[i].id_kriteria,
															pilihan: arrJawaban[i],
															total_nilai: Math.floor(
																(hasilNilaiPrioritas / 10) *
																	1000
															),
														}
													)
													.then((res) => {
														navigate(
															"/hasil-kuesioner-pendaftaran"
														);
													});
											}

											axios.patch(
												`http://localhost:5000/users/${kuki.get(
													"user_id"
												)}`,
												{
													status_pengisian: "sudah",
												}
											);
											// arrJawaban.map((e, i) => {
											//     axios.post('http://localhost:5000/nilai-prioritas', {
											//         prioritas_id: '',
											//         user_id: kuki.get("user_id"),
											//         id_kriteria: kriteriaBantuan[i].id_kriteria,
											//         pilihan: e,
											//         total_nilai: finalResult
											//     })
											//     .then(res => {
											//         alert('ok')
											//     })
											// })
											// setIsShow(true)
											// console.log(nilaiPrioritas)
											// nilaiPrioritas.forEach((e, i) => {
											//     if(e.user_id === kuki.get("user_id")){
											//         kuki.set("pengisian_kuesioner", true)
											//     }
											// })
											// kuki.set('is_registered', )
										} else {
											setIsValid(true);
											setOpen(true);
										}
									}}
									type="submit"
								>
									kirim
								</Button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default KuesionerPendaftaran;
