import React, { useState, useEffect } from "react";

// files
import { kuki } from "../../kuki/index.js";

// npm packages
import axios from "axios";
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
	const [userById, setUserById] = useState(null);

	// state for loop data keterangan and pilihan pengisian pendaftaran
	const [keteranganKriteria, setKeteranganKriteria] = useState([]);
	const [hasilKuesionerArr, setHasilKuesionerArr] = useState([]);

	useEffect(() => {
		document.title = "Hasil Kuesioner Pendaftaran Bantuan";
		getAllHasilKuesioner();
		getAllKriteria();
		getUserById();
	}, []);

	const getAllHasilKuesioner = async () => {
		const response = await axios.get("http://localhost:5000/nilai-prioritas");
		setHasilKuesioner(response.data);
		setHasilKuesionerArr(response.data);
	};

	const getAllKriteria = async () => {
		const response = await axios.get("http://localhost:5000/kriteria");
		setKriteriaBantuan(response.data);
		setKeteranganKriteria(response.data);
	};

	const getUserById = async () => {
		const response = await axios.get(
			`http://localhost:5000/users/${kuki.get("user_id")}`
		);
		setUserById(response.data);
	};

	const generatePdf = () => {
		const today = new Date();
		let keterangan = [];
		keteranganKriteria.forEach((e, i) => {
			keterangan.push(e.keterangan);
		});

		var doc = new jsPDF({ orientation: "p", lineHeight: 1.5 });
		doc.text("Data Pengisian Pendaftaran Bantuan", 65, 20);
		doc.setFontSize(11);
		doc.text(`Nama : ${userById.nm_depan} ${userById.nm_belakang}`, 14, 30);
		doc.text(
			`Tanggal cetak : ${today.getDate()} - ${
				today.getMonth() + 1
			} - ${today.getFullYear()}`,
			14,
			37
		);
		doc.autoTable({
			head: [["No", "Pertanyaan", "Jawaban"]],
			body: hasilKuesionerArr.map((e, i) => {
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

	console.log(hasilKuesioner);

	return (
		<div className="hasil_kuesioner">
			<div className="logo_app_hasil_kuesioner">
				<h2>Basoma</h2>
			</div>
			{hasilKuesioner && kriteriaBantuan && (
				<div className="hasil_kuesioner_pendaftaran">
					<Button
						variant="contained"
						className="btn_export_hasil_kuesioner"
						onClick={generatePdf}
					>
						cetak data
					</Button>
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
									<RadioGroup row name="jwb_kuesioner_1">
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
							<tr>
								<td>2</td>
								<td style={{ textAlign: "left" }}>
									{kriteriaBantuan[1].keterangan}
								</td>
								<td colSpan={2}>
									<RadioGroup row name="jwb_kuesioner_2">
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
							<tr>
								<td>3</td>
								<td style={{ textAlign: "left" }}>
									{kriteriaBantuan[2].keterangan}
								</td>
								<td colSpan={2}>
									<RadioGroup row name="jwb_kuesioner_3">
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
							<tr>
								<td>4</td>
								<td style={{ textAlign: "left" }}>
									{kriteriaBantuan[3].keterangan}
								</td>
								<td colSpan={2}>
									<RadioGroup row name="jwb_kuesioner_4">
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
							<tr>
								<td>5</td>
								<td style={{ textAlign: "left" }}>
									{kriteriaBantuan[3].keterangan}
								</td>
								<td colSpan={2}>
									<RadioGroup row name="jwb_kuesioner_5">
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
						</tbody>
					</table>
					{hasilKuesioner[0].total_nilai > 50 ? (
						<Alert
							variant="outlined"
							severity="success"
							sx={{ mt: 2, fontSize: "1em" }}
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
							untuk proses lebih lanjut
						</Alert>
					) : (
						<Alert
							variant="outlined"
							severity="error"
							sx={{ mt: 2, fontSize: "1em" }}
						>
							Maaf!, anda berkemungkinan sebesar{" "}
							<span style={{ fontWeight: "bold" }}>
								{hasilKuesioner[0].total_nilai + "%"}
							</span>{" "}
							untuk bisa mendapatkan bantuan sosial
						</Alert>
					)}
				</div>
			)}
		</div>
	);
};

export default HasilKuesionerPendaftaran;
