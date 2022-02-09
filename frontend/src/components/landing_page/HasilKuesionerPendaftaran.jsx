// styling component linked in hasil_kuesioner_pendaftaran.scss file
// and App.scss for tbl_class, tbl_class_head, tbl_class_body class name

import React, { useState, useEffect } from "react";

// Cookie storage
import kuki from "../../kuki";

// API storage
import API from "../../api";

// npm packages
import {
	Radio,
	RadioGroup,
	FormControlLabel,
	Button,
	Alert,
	AlertTitle,
} from "@mui/material";
import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";

const HasilKuesionerPendaftaran = () => {
	const [hasilKuesioner, setHasilKuesioner] = useState(null);
	const [kriteriaBantuan, setKriteriaBantuan] = useState(null);
	const [userByID, setUserByID] = useState(null);

	useEffect(() => {
		document.title = "Hasil Kuesioner Pendaftaran Bantuan";
		getAllHasilKuesionerByUserIDandIdentitasPilihan();
		getAllKriteria();
		getUserByID();
	}, []);

	const getAllHasilKuesionerByUserIDandIdentitasPilihan = async () => {
		const response = await API.getPrioritasByUserIDandIdentitasPilihan(
			kuki.get("user_id")
		);
		setHasilKuesioner(response.data);
	};

	const getAllKriteria = async () => {
		const response = await API.getAllKriteria();
		setKriteriaBantuan(response.data);
	};

	const getUserByID = async () => {
		const response = await API.getUserByID(kuki.get("user_id"));
		setUserByID(response.data);
	};

	const generatePdf = () => {
		const today = new Date();
		let keterangan = [];
		kriteriaBantuan.forEach((e, i) => {
			keterangan.push(e.keterangan);
		});

		var doc = new jsPDF({ orientation: "p", lineHeight: 1.5 });
		doc.text("Data Pengisian Pendaftaran Bantuan", 65, 20);
		doc.setFontSize(11);
		doc.text(`Nama : ${userByID.nm_depan} ${userByID.nm_belakang}`, 14, 30);
		doc.text(
			`Tanggal cetak : ${today.getDate()} - ${
				today.getMonth() + 1
			} - ${today.getFullYear()}`,
			14,
			37
		);
		doc.autoTable({
			head: [["No", "Pertanyaan", "Jawaban"]],
			body: hasilKuesioner.map((e, i) => {
				return [i + 1, keterangan[i], e.pilihan];
			}),
			startY: 42,
		});
		doc.text(
			`Hasil akhir yang diperoleh sebesar ${hasilKuesioner[0].total_nilai}%`,
			14,
			97
		);
		doc.save("data_pengisian.pdf");
	};

	return (
		// Hasil kuesioner pendaftaran content
		<div className="hasil_kuesioner">
			<div className="logo_app_hasil_kuesioner">
				<h2>Basoma</h2>
			</div>
			{/* Button dan tabel hasil kuesioner pendaftaran */}
			{hasilKuesioner && kriteriaBantuan && (
				<div className="hasil_kuesioner_pendaftaran">
					<Button
						variant="contained"
						className="btn_export_hasil_kuesioner"
						onClick={generatePdf}
					>
						cetak data
					</Button>

					{/* Tabel kuesioner */}
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
									<RadioGroup row>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[0].pilihan !==
														kriteriaBantuan[0].pilihan_satu
															? true
															: false
													}
													checked={
														hasilKuesioner[0].pilihan !==
														kriteriaBantuan[0].pilihan_satu
															? false
															: true
													}
												/>
											}
											label={kriteriaBantuan[0].pilihan_satu}
										/>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[0].pilihan !==
														kriteriaBantuan[0].pilihan_dua
															? true
															: false
													}
													checked={
														hasilKuesioner[0].pilihan !==
														kriteriaBantuan[0].pilihan_dua
															? false
															: true
													}
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
									<RadioGroup row>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[1].pilihan !==
														kriteriaBantuan[1].pilihan_satu
															? true
															: false
													}
													checked={
														hasilKuesioner[1].pilihan !==
														kriteriaBantuan[1].pilihan_satu
															? false
															: true
													}
												/>
											}
											label={kriteriaBantuan[1].pilihan_satu}
										/>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[1].pilihan !==
														kriteriaBantuan[1].pilihan_dua
															? true
															: false
													}
													checked={
														hasilKuesioner[1].pilihan !==
														kriteriaBantuan[1].pilihan_dua
															? false
															: true
													}
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
									<RadioGroup row>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[2].pilihan !==
														kriteriaBantuan[2].pilihan_satu
															? true
															: false
													}
													checked={
														hasilKuesioner[2].pilihan !==
														kriteriaBantuan[2].pilihan_satu
															? false
															: true
													}
												/>
											}
											label={kriteriaBantuan[2].pilihan_satu}
										/>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[2].pilihan !==
														kriteriaBantuan[2].pilihan_dua
															? true
															: false
													}
													checked={
														hasilKuesioner[2].pilihan !==
														kriteriaBantuan[2].pilihan_dua
															? false
															: true
													}
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
									<RadioGroup row>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[3].pilihan !==
														kriteriaBantuan[3].pilihan_satu
															? true
															: false
													}
													checked={
														hasilKuesioner[3].pilihan !==
														kriteriaBantuan[3].pilihan_satu
															? false
															: true
													}
												/>
											}
											label={kriteriaBantuan[3].pilihan_satu}
										/>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[3].pilihan !==
														kriteriaBantuan[3].pilihan_dua
															? true
															: false
													}
													checked={
														hasilKuesioner[3].pilihan !==
														kriteriaBantuan[3].pilihan_dua
															? false
															: true
													}
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
									{kriteriaBantuan[3].keterangan}
								</td>
								<td colSpan={2}>
									<RadioGroup row>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[4].pilihan !==
														kriteriaBantuan[4].pilihan_satu
															? true
															: false
													}
													checked={
														hasilKuesioner[4].pilihan !==
														kriteriaBantuan[4].pilihan_satu
															? false
															: true
													}
												/>
											}
											label={kriteriaBantuan[4].pilihan_satu}
										/>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[4].pilihan !==
														kriteriaBantuan[4].pilihan_dua
															? true
															: false
													}
													checked={
														hasilKuesioner[4].pilihan !==
														kriteriaBantuan[4].pilihan_dua
															? false
															: true
													}
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
					{/* Akhir tabel kuesioner */}

					{/* Alert hasil akhir section */}
					{hasilKuesioner[0].total_nilai > 50 ? (
						<Alert
							variant="outlined"
							severity="success"
							sx={{ mt: 2, fontSize: ".9em" }}
						>
							<AlertTitle>Selamat!</AlertTitle>
							Anda berkemungkinan sebesar{" "}
							<span style={{ fontWeight: "bold" }}>
								{hasilKuesioner[0].total_nilai + "%"}
							</span>{" "}
							untuk bisa mendapatkan bantuan sosial, silahkan klik{" "}
							<Link
								to="/form-pendaftaran"
								style={{ color: "#334620", fontWeight: "bold" }}
							>
								disini!
							</Link>{" "}
							untuk proses lebih lanjut.
						</Alert>
					) : (
						<Alert
							variant="outlined"
							severity="error"
							sx={{ mt: 2, fontSize: ".9em" }}
						>
							Maaf!, anda berkemungkinan sebesar{" "}
							<span style={{ fontWeight: "bold" }}>
								{hasilKuesioner[0].total_nilai + "%"}
							</span>{" "}
							untuk bisa mendapatkan bantuan sosial
						</Alert>
					)}
					{/* Akhir alert hasil akhir section */}
				</div>
			)}
			{/* Akhir button dan tabel hasil kuesioner pendaftaran */}
		</div>
		// Akhir hasil kuesioner pendaftaran
	);
};

export default HasilKuesionerPendaftaran;
