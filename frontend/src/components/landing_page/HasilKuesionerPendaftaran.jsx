// styling component linked in hasil_kuesioner_pendaftaran.scss file
// and App.scss for tbl_class, tbl_class_head, tbl_class_body class names

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
} from "@mui/material";
import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";

const HasilKuesionerPendaftaran = () => {
	const [hasilKuesioner, setHasilKuesioner] = useState(null);
	const [kriteriaBantuan, setKriteriaBantuan] = useState(null);
	const [wargaByUserID, setWargaByUserID] = useState(null);

	useEffect(() => {
		document.title = "Hasil Kuesioner Pendaftaran Bantuan";
		getAllHasilKuesionerByUserIDandIdentitasPilihan();
		getAllKriteria();
		getWargaByUserID();
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

	const getWargaByUserID = async () => {
		const response = await API.getWargaByUserID(kuki.get("user_id"));
		setWargaByUserID(response.data);
	};

	const generatePdf = () => {
		const today = new Date();
		const img = new Image();
		img.src = "/logo_basoma.png";
		let pertanyaan = [];
		kriteriaBantuan.forEach((e, i) => {
			pertanyaan.push(e.pertanyaan);
		});

		var doc = new jsPDF({ orientation: "p", lineHeight: 1.5 });
		doc.setFontSize(13);
		doc.text("Laporan Pengisian Pendaftaran Bantuan", 70, 21);
		doc.setFontSize(11);
		doc.addImage(img, "PNG", 13, 10, 17, 17);
		doc.line(13, 31, 197, 31);
		doc.text(`Nama pendaftar : ${wargaByUserID.nama_lengkap}`, 14, 40);
		doc.text(
			`Tanggal cetak : ${today.getDate()} - 0${
				today.getMonth() + 1
			} - ${today.getFullYear()}`,
			142,
			40
		);
		doc.text(`Alamat lengkap : ${wargaByUserID.alamat}`, 14, 47, {
			maxWidth: "120",
		});
		doc.text(`No. telepon : ${wargaByUserID.no_telepon}`, 142, 47);
		doc.autoTable({
			head: [["No", "Pertanyaan", "Jawaban"]],
			body: hasilKuesioner.map((e, i) => {
				return [`${i + 1}.`, pertanyaan[i], e.pilihan];
			}),
			startY: 52,
			theme: "grid",
			columnStyles: {
				0: { halign: "center" },
				1: { halign: "left" },
				2: { halign: "center" },
			},
			headStyles: {
				fillColor: "rgb(75, 75, 253)",
			},
			alternateRowStyles: { fillColor: "rgb(218, 218, 218)" },
		});
		window.open(doc.output("bloburl"), "_blank");
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
									{kriteriaBantuan[0].pertanyaan}
								</td>
								<td colSpan={2}>
									<RadioGroup
										row
										style={{
											width: "200px",
											margin: "auto",
										}}
									>
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
											style={{
												marginRight: "40px",
											}}
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
									{kriteriaBantuan[1].pertanyaan}
								</td>
								<td colSpan={2}>
									<RadioGroup
										row
										style={{
											width: "200px",
											margin: "auto",
										}}
									>
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
											style={{
												marginRight: "40px",
											}}
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
									{kriteriaBantuan[2].pertanyaan}
								</td>
								<td colSpan={2}>
									<RadioGroup
										row
										style={{
											width: "200px",
											margin: "auto",
										}}
									>
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
											style={{
												marginRight: "40px",
											}}
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
									{kriteriaBantuan[3].pertanyaan}
								</td>
								<td colSpan={2}>
									<RadioGroup
										row
										style={{
											width: "200px",
											margin: "auto",
										}}
									>
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
											style={{
												marginRight: "40px",
											}}
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
									{kriteriaBantuan[4].pertanyaan}
								</td>
								<td colSpan={2}>
									<RadioGroup
										row
										style={{
											width: "200px",
											margin: "auto",
										}}
									>
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
											style={{
												marginRight: "40px",
											}}
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

							{/* Baris enam */}
							<tr>
								<td>6</td>
								<td style={{ textAlign: "left" }}>
									{kriteriaBantuan[5].pertanyaan}
								</td>
								<td colSpan={2}>
									<RadioGroup
										row
										style={{
											width: "200px",
											margin: "auto",
										}}
									>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[5].pilihan !==
														kriteriaBantuan[5].pilihan_satu
															? true
															: false
													}
													checked={
														hasilKuesioner[5].pilihan !==
														kriteriaBantuan[5].pilihan_satu
															? false
															: true
													}
												/>
											}
											label={kriteriaBantuan[5].pilihan_satu}
											style={{
												marginRight: "40px",
											}}
										/>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[5].pilihan !==
														kriteriaBantuan[5].pilihan_dua
															? true
															: false
													}
													checked={
														hasilKuesioner[5].pilihan !==
														kriteriaBantuan[5].pilihan_dua
															? false
															: true
													}
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
										style={{
											width: "200px",
											margin: "auto",
										}}
									>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[6].pilihan !==
														kriteriaBantuan[6].pilihan_satu
															? true
															: false
													}
													checked={
														hasilKuesioner[6].pilihan !==
														kriteriaBantuan[6].pilihan_satu
															? false
															: true
													}
												/>
											}
											label={kriteriaBantuan[6].pilihan_satu}
											style={{
												marginRight: "40px",
											}}
										/>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[6].pilihan !==
														kriteriaBantuan[6].pilihan_dua
															? true
															: false
													}
													checked={
														hasilKuesioner[6].pilihan !==
														kriteriaBantuan[6].pilihan_dua
															? false
															: true
													}
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
										style={{
											width: "200px",
											margin: "auto",
										}}
									>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[7].pilihan !==
														kriteriaBantuan[7].pilihan_satu
															? true
															: false
													}
													checked={
														hasilKuesioner[7].pilihan !==
														kriteriaBantuan[7].pilihan_satu
															? false
															: true
													}
												/>
											}
											label={kriteriaBantuan[7].pilihan_satu}
											style={{
												marginRight: "40px",
											}}
										/>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[7].pilihan !==
														kriteriaBantuan[7].pilihan_dua
															? true
															: false
													}
													checked={
														hasilKuesioner[7].pilihan !==
														kriteriaBantuan[7].pilihan_dua
															? false
															: true
													}
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
										style={{
											width: "200px",
											margin: "auto",
										}}
									>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[8].pilihan !==
														kriteriaBantuan[8].pilihan_satu
															? true
															: false
													}
													checked={
														hasilKuesioner[8].pilihan !==
														kriteriaBantuan[8].pilihan_satu
															? false
															: true
													}
												/>
											}
											label={kriteriaBantuan[8].pilihan_satu}
											style={{
												marginRight: "40px",
											}}
										/>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[8].pilihan !==
														kriteriaBantuan[8].pilihan_dua
															? true
															: false
													}
													checked={
														hasilKuesioner[8].pilihan !==
														kriteriaBantuan[8].pilihan_dua
															? false
															: true
													}
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
										style={{
											width: "200px",
											margin: "auto",
										}}
									>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[9].pilihan !==
														kriteriaBantuan[9].pilihan_satu
															? true
															: false
													}
													checked={
														hasilKuesioner[9].pilihan !==
														kriteriaBantuan[9].pilihan_satu
															? false
															: true
													}
												/>
											}
											label={kriteriaBantuan[9].pilihan_satu}
											style={{
												marginRight: "40px",
											}}
										/>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[9].pilihan !==
														kriteriaBantuan[9].pilihan_dua
															? true
															: false
													}
													checked={
														hasilKuesioner[9].pilihan !==
														kriteriaBantuan[9].pilihan_dua
															? false
															: true
													}
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
										style={{
											width: "200px",
											margin: "auto",
										}}
									>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[10].pilihan !==
														kriteriaBantuan[10].pilihan_satu
															? true
															: false
													}
													checked={
														hasilKuesioner[10].pilihan !==
														kriteriaBantuan[10].pilihan_satu
															? false
															: true
													}
												/>
											}
											label={kriteriaBantuan[10].pilihan_satu}
											style={{
												marginRight: "40px",
											}}
										/>
										<FormControlLabel
											control={
												<Radio
													disabled={
														hasilKuesioner[10].pilihan !==
														kriteriaBantuan[10].pilihan_dua
															? true
															: false
													}
													checked={
														hasilKuesioner[10].pilihan !==
														kriteriaBantuan[10].pilihan_dua
															? false
															: true
													}
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
					{/* Akhir tabel kuesioner */}

					{/* Alert hasil akhir section */}
					<Alert
						variant="outlined"
						severity="info"
						sx={{ mt: 2, fontSize: ".9em" }}
					>
						Terima kasih sudah melakukan pendaftaran bantuan, petugas
						bantuan akan meng-survey lokasi tempat tinggal anda dan
						mengecek kondisi anda apakah sesuai dengan jawaban yang anda
						pilih sebelumnya atau tidak. Untuk informasi hasil keputusan
						bantuan dapat dilihat{" "}
						<Link
							to="/pemberitahuan"
							style={{ color: "#334620", fontWeight: "bold" }}
						>
							disini!
						</Link>
					</Alert>
					{/* Akhir alert hasil akhir section */}
				</div>
			)}
			{/* Akhir button dan tabel hasil kuesioner pendaftaran */}
		</div>
		// Akhir hasil kuesioner pendaftaran
	);
};

export default HasilKuesionerPendaftaran;
