// styling component linked in kuesioner_pendaftaran.scss file
// and App.scss for tbl_class, tbl_class_head, tbl_class_body class name

import React, { useState, useEffect } from "react";

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
	const [jawabanEnam, setJawabanEnam] = useState(null);
	const [jawabanTujuh, setJawabanTujuh] = useState(null);
	const [jawabanDelapan, setJawabanDelapan] = useState(null);
	const [jawabanSembilan, setJawabanSembilan] = useState(null);
	const [jawabanSepuluh, setJawabanSepuluh] = useState(null);
	const [jawabanSebelas, setJawabanSebelas] = useState(null);

	// state for get data value from radio button
	const [valueRB1, setValueRB1] = useState("");
	const [valueRB2, setValueRB2] = useState("");
	const [valueRB3, setValueRB3] = useState("");
	const [valueRB4, setValueRB4] = useState("");
	const [valueRB5, setValueRB5] = useState("");
	const [valueRB6, setValueRB6] = useState("");
	const [valueRB7, setValueRB7] = useState("");
	const [valueRB8, setValueRB8] = useState("");
	const [valueRB9, setValueRB9] = useState("");
	const [valueRB10, setValueRB10] = useState("");
	const [valueRB11, setValueRB11] = useState("");

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
										Silahkan jawab semua pertanyaan terlebih dahulu!
									</Alert>
								</Snackbar>
							) : null}
						</div>
						{/* Akhir logo dan validasi pengisian */}

						{/* Kuesioner pendaftaran content */}
						<div className="kuesioner_pendaftaran">
							<div className="kuesioner_title">
								<h3>
									Silahkan lengkapi beberapa pertanyaan dibawah ini
									sesuai dengan kondisi anda.
								</h3>
							</div>

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
											{kriteriaBantuan[0].pertanyaan}
										</td>
										<td colSpan={2}>
											<RadioGroup
												row
												name="jwb_kuesioner_1"
												onChange={(e) =>
													setJawabanSatu(e.target.value)
												}
												style={{
													width: "200px",
													margin: "auto",
												}}
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
													label={kriteriaBantuan[0].pilihan_satu}
													style={{
														marginRight: "40px",
													}}
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
											{kriteriaBantuan[1].pertanyaan}
										</td>
										<td colSpan={2}>
											<RadioGroup
												row
												name="jwb_kuesioner_2"
												onChange={(e) =>
													setJawabanDua(e.target.value)
												}
												style={{
													width: "200px",
													margin: "auto",
												}}
											>
												<FormControlLabel
													value={
														kriteriaBantuan[1].nilai_prioritas
													}
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
													label={kriteriaBantuan[1].pilihan_satu}
													style={{
														marginRight: "40px",
													}}
												/>
												<FormControlLabel
													value={0}
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
											{kriteriaBantuan[2].pertanyaan}
										</td>
										<td colSpan={2}>
											<RadioGroup
												row
												name="jwb_kuesioner_3"
												onChange={(e) =>
													setJawabanTiga(e.target.value)
												}
												style={{
													width: "200px",
													margin: "auto",
												}}
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
													label={kriteriaBantuan[2].pilihan_satu}
													style={{
														marginRight: "40px",
													}}
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
											{kriteriaBantuan[3].pertanyaan}
										</td>
										<td colSpan={2}>
											<RadioGroup
												row
												name="jwb_kuesioner_4"
												onChange={(e) =>
													setJawabanEmpat(e.target.value)
												}
												style={{
													width: "200px",
													margin: "auto",
												}}
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
													label={kriteriaBantuan[3].pilihan_satu}
													style={{
														marginRight: "40px",
													}}
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
											{kriteriaBantuan[4].pertanyaan}
										</td>
										<td colSpan={2}>
											<RadioGroup
												row
												name="jwb_kuesioner_5"
												onChange={(e) =>
													setJawabanLima(e.target.value)
												}
												style={{
													width: "200px",
													margin: "auto",
												}}
											>
												<FormControlLabel
													value={
														kriteriaBantuan[4].nilai_prioritas
													}
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
													label={kriteriaBantuan[4].pilihan_satu}
													style={{
														marginRight: "40px",
													}}
												/>
												<FormControlLabel
													value={0}
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

									{/* Baris enam */}
									<tr>
										<td>6</td>
										<td style={{ textAlign: "left" }}>
											{kriteriaBantuan[5].pertanyaan}
										</td>
										<td colSpan={2}>
											<RadioGroup
												row
												name="jwb_kuesioner_6"
												onChange={(e) =>
													setJawabanEnam(e.target.value)
												}
												style={{
													width: "200px",
													margin: "auto",
												}}
											>
												<FormControlLabel
													value={
														kriteriaBantuan[5].nilai_prioritas
													}
													control={
														<Radio
															onChange={() => {
																setValueRB6(
																	kriteriaBantuan[5]
																		.pilihan_satu
																);
															}}
														/>
													}
													label={kriteriaBantuan[5].pilihan_satu}
													style={{
														marginRight: "40px",
													}}
												/>
												<FormControlLabel
													value={0}
													control={
														<Radio
															onChange={() => {
																setValueRB6(
																	kriteriaBantuan[5]
																		.pilihan_dua
																);
															}}
														/>
													}
													label={kriteriaBantuan[5].pilihan_dua}
												/>
											</RadioGroup>
										</td>
									</tr>
									{/* Akhir baris enam */}

									{/* Baris tujuh */}
									<tr>
										<td>7</td>
										<td style={{ textAlign: "left" }}>
											{kriteriaBantuan[6].pertanyaan}
										</td>
										<td colSpan={2}>
											<RadioGroup
												row
												name="jwb_kuesioner_7"
												onChange={(e) =>
													setJawabanTujuh(e.target.value)
												}
												style={{
													width: "200px",
													margin: "auto",
												}}
											>
												<FormControlLabel
													value={
														kriteriaBantuan[6].nilai_prioritas
													}
													control={
														<Radio
															onChange={() => {
																setValueRB7(
																	kriteriaBantuan[6]
																		.pilihan_satu
																);
															}}
														/>
													}
													label={kriteriaBantuan[6].pilihan_satu}
													style={{
														marginRight: "40px",
													}}
												/>
												<FormControlLabel
													value={0}
													control={
														<Radio
															onChange={() => {
																setValueRB7(
																	kriteriaBantuan[6]
																		.pilihan_dua
																);
															}}
														/>
													}
													label={kriteriaBantuan[6].pilihan_dua}
												/>
											</RadioGroup>
										</td>
									</tr>
									{/* Akhir baris tujuh */}

									{/* Baris delapan */}
									<tr>
										<td>8</td>
										<td style={{ textAlign: "left" }}>
											{kriteriaBantuan[7].pertanyaan}
										</td>
										<td colSpan={2}>
											<RadioGroup
												row
												name="jwb_kuesioner_8"
												onChange={(e) =>
													setJawabanDelapan(e.target.value)
												}
												style={{
													width: "200px",
													margin: "auto",
												}}
											>
												<FormControlLabel
													value={
														kriteriaBantuan[7].nilai_prioritas
													}
													control={
														<Radio
															onChange={() => {
																setValueRB8(
																	kriteriaBantuan[7]
																		.pilihan_satu
																);
															}}
															style={{ fontSize: ".9em" }}
														/>
													}
													label={kriteriaBantuan[7].pilihan_satu}
													style={{
														marginRight: "40px",
													}}
												/>
												<FormControlLabel
													value={0}
													control={
														<Radio
															onChange={() => {
																setValueRB8(
																	kriteriaBantuan[7]
																		.pilihan_dua
																);
															}}
														/>
													}
													label={kriteriaBantuan[7].pilihan_dua}
												/>
											</RadioGroup>
										</td>
									</tr>
									{/* Akhir baris delapan */}

									{/* Baris sembilan */}
									<tr>
										<td>9</td>
										<td style={{ textAlign: "left" }}>
											{kriteriaBantuan[8].pertanyaan}
										</td>
										<td colSpan={2}>
											<RadioGroup
												row
												name="jwb_kuesioner_9"
												onChange={(e) =>
													setJawabanSembilan(e.target.value)
												}
												style={{
													width: "200px",
													margin: "auto",
												}}
											>
												<FormControlLabel
													value={
														kriteriaBantuan[8].nilai_prioritas
													}
													control={
														<Radio
															onChange={() => {
																setValueRB9(
																	kriteriaBantuan[8]
																		.pilihan_satu
																);
															}}
															style={{ fontSize: ".9em" }}
														/>
													}
													label={kriteriaBantuan[8].pilihan_satu}
													style={{
														marginRight: "40px",
													}}
												/>
												<FormControlLabel
													value={0}
													control={
														<Radio
															onChange={() => {
																setValueRB9(
																	kriteriaBantuan[8]
																		.pilihan_dua
																);
															}}
														/>
													}
													label={kriteriaBantuan[8].pilihan_dua}
												/>
											</RadioGroup>
										</td>
									</tr>
									{/* Akhir baris sembilan */}

									{/* Baris sepuluh */}
									<tr>
										<td>10</td>
										<td style={{ textAlign: "left" }}>
											{kriteriaBantuan[9].pertanyaan}
										</td>
										<td colSpan={2}>
											<RadioGroup
												row
												name="jwb_kuesioner_10"
												onChange={(e) =>
													setJawabanSepuluh(e.target.value)
												}
												style={{
													width: "200px",
													margin: "auto",
												}}
											>
												<FormControlLabel
													value={
														kriteriaBantuan[9].nilai_prioritas
													}
													control={
														<Radio
															onChange={() => {
																setValueRB10(
																	kriteriaBantuan[9]
																		.pilihan_satu
																);
															}}
															style={{ fontSize: ".9em" }}
														/>
													}
													label={kriteriaBantuan[9].pilihan_satu}
													style={{
														marginRight: "40px",
													}}
												/>
												<FormControlLabel
													value={0}
													control={
														<Radio
															onChange={() => {
																setValueRB10(
																	kriteriaBantuan[9]
																		.pilihan_dua
																);
															}}
														/>
													}
													label={kriteriaBantuan[9].pilihan_dua}
												/>
											</RadioGroup>
										</td>
									</tr>
									{/* Akhir baris sepuluh */}

									{/* Baris sebelas */}
									<tr>
										<td>11</td>
										<td style={{ textAlign: "left" }}>
											{kriteriaBantuan[10].pertanyaan}
										</td>
										<td colSpan={2}>
											<RadioGroup
												row
												name="jwb_kuesioner_11"
												onChange={(e) =>
													setJawabanSebelas(e.target.value)
												}
												style={{
													width: "200px",
													margin: "auto",
												}}
											>
												<FormControlLabel
													value={
														kriteriaBantuan[10].nilai_prioritas
													}
													control={
														<Radio
															onChange={() => {
																setValueRB11(
																	kriteriaBantuan[10]
																		.pilihan_satu
																);
															}}
															style={{ fontSize: ".9em" }}
														/>
													}
													label={kriteriaBantuan[10].pilihan_satu}
													style={{
														marginRight: "40px",
													}}
												/>
												<FormControlLabel
													value={0}
													control={
														<Radio
															onChange={() => {
																setValueRB11(
																	kriteriaBantuan[10]
																		.pilihan_dua
																);
															}}
														/>
													}
													label={kriteriaBantuan[10].pilihan_dua}
												/>
											</RadioGroup>
										</td>
									</tr>
									{/* Akhir baris sebelas */}
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
										valueRB5,
										valueRB6,
										valueRB7,
										valueRB8,
										valueRB9,
										valueRB10,
										valueRB11
									);

									if (
										jawabanSatu &&
										jawabanDua &&
										jawabanTiga &&
										jawabanEmpat &&
										jawabanLima &&
										jawabanEnam &&
										jawabanTujuh &&
										jawabanDelapan &&
										jawabanSembilan &&
										jawabanSepuluh &&
										jawabanSebelas
									) {
										for (let i = 0; i < arrValueJawaban.length; i++) {
											API.savePrioritas({
												id_prioritas: `PRIO_${prioritasLength++}`,
												user_id: kuki.get("user_id"),
												pilihan: arrValueJawaban[i],
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
								submit
							</Button>
						</div>
						{/* Akhir kuesioner pendaftaran content */}
					</div>
				</div>
			)}
		</div>
		// Akhir component kuesioner pendaftaran content
	);
};

export default KuesionerPendaftaran;
