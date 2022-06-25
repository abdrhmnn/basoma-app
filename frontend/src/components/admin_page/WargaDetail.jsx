import React, { useState, useEffect } from "react";

// API storage
import API from "../../api";

// npm packages
import { useLocation, useNavigate } from "react-router-dom";
import {
	TextField,
	FormControl,
	Radio,
	RadioGroup,
	FormControlLabel,
	Alert,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import kuki from "../../kuki";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const WargaDetail = () => {
	const [wargaByNoKK, setWargaByNoKK] = useState(null);
	const [survey, setSurvey] = useState(null);
	const [kriteria, setKriteria] = useState(null);
	const [jawaban, setJawaban] = useState(null);
	const [history, setHistory] = useState(null);

	const [detailDataJoinSurvey, setDetailDataJoinSurvey] = useState(null);

	const [kebijakanBantuan, setKebijakanBantuan] = useState(null);
	const [keteranganKebijakan, setKeteranganKebijakan] = useState("");

	const [isValidKebijakan, setIsValidKebijakan] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		API.getWargaByNoKK(location.state.ui).then((res) =>
			setWargaByNoKK(res.data)
		);
		API.getSurveyByNoKK(location.state.ui).then((res) => {
			setSurvey(res.data);
		});
		API.getAllKriteria().then((res) => {
			setKriteria(res.data);
		});
		API.getPrioritasByUserIDandIdentitasPilihan(location.state.uid).then(
			(res) => {
				setJawaban(res.data);
			}
		);
		API.getAllHistoryKebijakan().then((res) => {
			setHistory(res.data);
		});
		API.getDetailDataJoinSurvey(location.state.ui).then((res) => {
			setDetailDataJoinSurvey(res.data);
		});
	}, [location]);

	const generatePdf = () => {
		const today = new Date();
		const img = new Image();
		img.src = "/logo_kelurahan.png";

		var doc = new jsPDF({ orientation: "p", lineHeight: 1.5 });
		doc.setFontSize(16);
		doc.setFont("helvetica", "bold");
		doc.text("PEMERINTAH KOTA TANGERANG", 62, 14);
		doc.setFontSize(14);
		doc.text("KECAMATAN BATUCEPER", 77, 21);
		doc.setFontSize(21);
		doc.text("KELURAHAN PORIS GAGA", 62, 29);
		doc.setFontSize(12);
		doc.text("Jl. KH. Maulana Hasanuddin Perumahan Poris Indah", 58, 35);
		doc.setFontSize(12);
		doc.text("TANGERANG - BANTEN", 85, 41);
		doc.setFontSize(11);
		doc.addImage(img, "PNG", 13, 15, 23, 23);
		doc.setLineWidth(0.5);
		doc.line(13, 45, 198, 45);
		doc.setFontSize(12);
		doc.setFont("helvetica", "normal");
		doc.text("Hasil Verifikasi Kondisi Warga", 83, 53);
		doc.setFontSize(12);
		doc.text(`Nomor KK Warga : ${wargaByNoKK.no_kk}`, 13, 64);
		doc.text(`Nomor KTP Warga : ${wargaByNoKK.no_ktp}`, 13, 72);
		doc.text(`Nama lengkap : ${wargaByNoKK.nama_lengkap}`, 13, 80);
		doc.text(`Alamat lengkap : ${wargaByNoKK.alamat}`, 13, 88, {
			maxWidth: "120",
		});
		doc.setFontSize(11);
		doc.text(
			`Tanggal cetak : ${today.getDate()} - 0${
				today.getMonth() + 1
			} - ${today.getFullYear()}`,
			146,
			93
		);

		doc.autoTable({
			head: [["No", "Pertanyaan", "Jawaban", "Verifikasi", "Keterangan"]],
			body: detailDataJoinSurvey.map((e, i) => {
				return [
					`${i + 1}.`,
					e.kriteria.pertanyaan,
					e.prioritas.pilihan,
					e.verifikasi_kondisi,
					e.keterangan,
				];
			}),
			startY: 98,
			margin: {
				left: 12,
				right: 12,
			},
			theme: "grid",
			columnStyles: {
				0: { halign: "center", valign: "middle" },
				1: { halign: "left", minCellHeight: 13, valign: "middle" },
				2: { halign: "center", valign: "middle" },
				3: { halign: "left", valign: "middle" },
				4: { halign: "left", valign: "middle" },
			},
			headStyles: {
				fillColor: "rgb(75, 75, 253)",
				halign: "center",
			},
			alternateRowStyles: { fillColor: "rgb(218, 218, 218)" },
		});
		window.open(doc.output("bloburl"), "_blank");
	};

	return (
		<div className="warga_detail">
			<div className="logo_app">
				<h2>Basoma</h2>
			</div>
			{wargaByNoKK && history && (
				<div className="content">
					<div className="data_diri">
						<h2>Data diri</h2>
						<div className="no_kk_no_ktp">
							<div className="no_kk">
								<p>Nomor kartu keluarga</p>
								<TextField
									name="no_kk"
									variant="outlined"
									fullWidth
									defaultValue={`${wargaByNoKK.no_kk}`}
									disabled={true}
								/>
							</div>
							<div className="no_ktp">
								<p>Nomor kartu tanda penduduk</p>
								<TextField
									name="no_ktp"
									variant="outlined"
									fullWidth
									defaultValue={`${wargaByNoKK.no_ktp}`}
									disabled={true}
								/>
							</div>
						</div>
						<div className="nm_lengkap_no_tlp">
							<div className="nm_lengkap">
								<p>Nama lengkap</p>
								<TextField
									name="nm_lengkap"
									variant="outlined"
									fullWidth
									defaultValue={`${wargaByNoKK.nama_lengkap}`}
									disabled={true}
								/>
							</div>
							<div className="no_tlp">
								<p>Nomor telepon</p>
								<TextField
									name="no_tlp"
									variant="outlined"
									fullWidth
									defaultValue={`${wargaByNoKK.no_telepon}`}
									disabled={true}
								/>
							</div>
						</div>
						<div className="alamat">
							<p>Alamat tempat tinggal</p>
							<TextField
								name="alamat"
								variant="outlined"
								fullWidth
								defaultValue={`${wargaByNoKK.alamat}`}
								disabled={true}
								multiline
								rows={3}
							/>
						</div>
						<div className="foto_rumah">
							<div className="f_rumah">
								<p>Foto lokasi tempat tinggal</p>
								<img
									src={API.showImgRumah(wargaByNoKK.foto_rumah)}
									alt="Foto lokasi tempat tinggal"
									width={400}
									style={{
										margin: "auto",
										display: "block",
									}}
								/>
							</div>
						</div>
					</div>

					<div className="hasil_verifikasi">
						<Accordion>
							<AccordionSummary
								expandIcon={
									<MdExpandMore size={23} color="rgb(75, 75, 253)" />
								}
								aria-controls="panelia-content"
								id="panel1a-header"
							>
								<div className="title">
									<p>Hasil Verifikasi</p>
									<div className="line"></div>
								</div>
							</AccordionSummary>
							<AccordionDetails>
								<div className="hasil_verifikasi_content">
									<Button
										variant="contained"
										fullWidth
										style={{
											fontWeight: "bold",
											padding: 0,
											height: "40px",
											marginTop: "15px",
											marginBottom: "20px",
										}}
										onClick={() => {
											generatePdf();
										}}
									>
										cetak hasil verifikasi
									</Button>
									{kriteria && jawaban && survey && (
										<div className="wrap_hasil_verifikasi">
											<div className="pertanyaan_jawaban_1">
												<div className="pertanyaan_1">
													<p>Pertanyaan</p>
													<TextField
														name="pertanyaan_1"
														variant="outlined"
														fullWidth
														defaultValue={`${kriteria[0].pertanyaan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
												<div className="jawaban_1">
													<p>Jawaban</p>
													<TextField
														name="jawaban_1"
														variant="outlined"
														fullWidth
														defaultValue={`${jawaban[0].pilihan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
											</div>
											<div className="verifikasi_pertanyaan_1">
												<p>Verifikasi</p>
												<FormControl>
													<RadioGroup
														row
														name="verifikasi_kondisi_1"
														className="verif_1"
													>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[0]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[0]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Sesuai"
															style={{
																marginRight: "30px",
															}}
														/>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[0]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[0]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Tidak sesuai"
														/>
													</RadioGroup>
												</FormControl>
												{survey[0].verifikasi_kondisi ===
												"Tidak sesuai" ? (
													<div className="status_tidak_sesuai">
														<p>Keterangan</p>
														<TextField
															name="status_tidak_sesuai"
															variant="outlined"
															fullWidth
															autoComplete="off"
															multiline
															rows={3}
															disabled
															defaultValue={survey[0].keterangan}
														/>
													</div>
												) : (
													false
												)}
											</div>

											<div className="line_pertanyaan_2"></div>

											<div className="pertanyaan_jawaban_2">
												<div className="pertanyaan_2">
													<p>Pertanyaan</p>
													<TextField
														name="pertanyaan_2"
														variant="outlined"
														fullWidth
														defaultValue={`${kriteria[1].pertanyaan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
												<div className="jawaban_2">
													<p>Jawaban</p>
													<TextField
														name="jawaban_2"
														variant="outlined"
														fullWidth
														defaultValue={`${jawaban[1].pilihan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
											</div>
											<div className="verifikasi_pertanyaan_2">
												<p>Verifikasi</p>
												<FormControl>
													<RadioGroup
														row
														name="verifikasi_kondisi_2"
														className="verif_2"
													>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[1]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[1]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Sesuai"
															style={{
																marginRight: "30px",
															}}
														/>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[1]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[1]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Tidak sesuai"
														/>
													</RadioGroup>
												</FormControl>
												{survey[1].verifikasi_kondisi ===
												"Tidak sesuai" ? (
													<div className="status_tidak_sesuai">
														<p>Keterangan</p>
														<TextField
															name="status_tidak_sesuai"
															variant="outlined"
															fullWidth
															autoComplete="off"
															multiline
															rows={3}
															disabled
															defaultValue={survey[1].keterangan}
														/>
													</div>
												) : (
													false
												)}
											</div>

											<div className="line_pertanyaan_3"></div>

											<div className="pertanyaan_jawaban_3">
												<div className="pertanyaan_3">
													<p>Pertanyaan</p>
													<TextField
														name="pertanyaan_3"
														variant="outlined"
														fullWidth
														defaultValue={`${kriteria[2].pertanyaan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
												<div className="jawaban_3">
													<p>Jawaban</p>
													<TextField
														name="jawaban_3"
														variant="outlined"
														fullWidth
														defaultValue={`${jawaban[2].pilihan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
											</div>
											<div className="verifikasi_pertanyaan_3">
												<p>Verifikasi</p>
												<FormControl>
													<RadioGroup
														row
														name="verifikasi_kondisi_3"
														className="verif_3"
													>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[2]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[2]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Sesuai"
															style={{
																marginRight: "30px",
															}}
														/>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[2]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[2]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Tidak sesuai"
														/>
													</RadioGroup>
												</FormControl>
												{survey[2].verifikasi_kondisi ===
												"Tidak sesuai" ? (
													<div className="status_tidak_sesuai">
														<p>Keterangan</p>
														<TextField
															name="status_tidak_sesuai"
															variant="outlined"
															fullWidth
															autoComplete="off"
															multiline
															rows={3}
															disabled
															defaultValue={survey[2].keterangan}
														/>
													</div>
												) : (
													false
												)}
											</div>

											<div className="line_pertanyaan_4"></div>

											<div className="pertanyaan_jawaban_4">
												<div className="pertanyaan_4">
													<p>Pertanyaan</p>
													<TextField
														name="pertanyaan_4"
														variant="outlined"
														fullWidth
														defaultValue={`${kriteria[3].pertanyaan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
												<div className="jawaban_4">
													<p>Jawaban</p>
													<TextField
														name="jawaban_4"
														variant="outlined"
														fullWidth
														defaultValue={`${jawaban[3].pilihan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
											</div>
											<div className="verifikasi_pertanyaan_4">
												<p>Verifikasi</p>
												<FormControl>
													<RadioGroup
														row
														name="verifikasi_kondisi_4"
														className="verif_4"
													>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[3]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[3]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Sesuai"
															style={{
																marginRight: "30px",
															}}
														/>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[3]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[3]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Tidak sesuai"
														/>
													</RadioGroup>
												</FormControl>
												{survey[3].verifikasi_kondisi ===
												"Tidak sesuai" ? (
													<div className="status_tidak_sesuai">
														<p>Keterangan</p>
														<TextField
															name="status_tidak_sesuai"
															variant="outlined"
															fullWidth
															autoComplete="off"
															multiline
															rows={3}
															disabled
															defaultValue={survey[3].keterangan}
														/>
													</div>
												) : (
													false
												)}
											</div>

											<div className="line_pertanyaan_5"></div>

											<div className="pertanyaan_jawaban_5">
												<div className="pertanyaan_5">
													<p>Pertanyaan</p>
													<TextField
														name="pertanyaan_5"
														variant="outlined"
														fullWidth
														defaultValue={`${kriteria[4].pertanyaan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
												<div className="jawaban_5">
													<p>Jawaban</p>
													<TextField
														name="jawaban_5"
														variant="outlined"
														fullWidth
														defaultValue={`${jawaban[4].pilihan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
											</div>
											<div className="verifikasi_pertanyaan_5">
												<p>Verifikasi</p>
												<FormControl>
													<RadioGroup
														row
														name="verifikasi_kondisi_5"
														className="verif_5"
													>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[4]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[4]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Sesuai"
															style={{
																marginRight: "30px",
															}}
														/>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[4]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[4]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Tidak sesuai"
														/>
													</RadioGroup>
												</FormControl>
												{survey[4].verifikasi_kondisi ===
												"Tidak sesuai" ? (
													<div className="status_tidak_sesuai">
														<p>Keterangan</p>
														<TextField
															name="status_tidak_sesuai"
															variant="outlined"
															fullWidth
															autoComplete="off"
															multiline
															rows={3}
															disabled
															defaultValue={survey[4].keterangan}
														/>
													</div>
												) : (
													false
												)}
											</div>

											<div className="line_pertanyaan_6"></div>

											<div className="pertanyaan_jawaban_6">
												<div className="pertanyaan_6">
													<p>Pertanyaan</p>
													<TextField
														name="pertanyaan_6"
														variant="outlined"
														fullWidth
														defaultValue={`${kriteria[5].pertanyaan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
												<div className="jawaban_6">
													<p>Jawaban</p>
													<TextField
														name="jawaban_6"
														variant="outlined"
														fullWidth
														defaultValue={`${jawaban[5].pilihan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
											</div>
											<div className="verifikasi_pertanyaan_6">
												<p>Verifikasi</p>
												<FormControl>
													<RadioGroup
														row
														name="verifikasi_kondisi_6"
														className="verif_6"
													>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[5]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[5]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Sesuai"
															style={{
																marginRight: "30px",
															}}
														/>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[5]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[5]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Tidak sesuai"
														/>
													</RadioGroup>
												</FormControl>
												{survey[5].verifikasi_kondisi ===
												"Tidak sesuai" ? (
													<div className="status_tidak_sesuai">
														<p>Keterangan</p>
														<TextField
															name="status_tidak_sesuai"
															variant="outlined"
															fullWidth
															autoComplete="off"
															multiline
															rows={3}
															disabled
															defaultValue={survey[5].keterangan}
														/>
													</div>
												) : (
													false
												)}
											</div>

											<div className="line_pertanyaan_7"></div>

											<div className="pertanyaan_jawaban_7">
												<div className="pertanyaan_7">
													<p>Pertanyaan</p>
													<TextField
														name="pertanyaan_7"
														variant="outlined"
														fullWidth
														defaultValue={`${kriteria[6].pertanyaan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
												<div className="jawaban_7">
													<p>Jawaban</p>
													<TextField
														name="jawaban_7"
														variant="outlined"
														fullWidth
														defaultValue={`${jawaban[6].pilihan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
											</div>
											<div className="verifikasi_pertanyaan_7">
												<p>Verifikasi</p>
												<FormControl>
													<RadioGroup
														row
														name="verifikasi_kondisi_7"
														className="verif_7"
													>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[6]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[6]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Sesuai"
															style={{
																marginRight: "30px",
															}}
														/>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[6]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[6]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Tidak sesuai"
														/>
													</RadioGroup>
												</FormControl>
												{survey[6].verifikasi_kondisi ===
												"Tidak sesuai" ? (
													<div className="status_tidak_sesuai">
														<p>Keterangan</p>
														<TextField
															name="status_tidak_sesuai"
															variant="outlined"
															fullWidth
															autoComplete="off"
															multiline
															rows={3}
															disabled
															defaultValue={survey[6].keterangan}
														/>
													</div>
												) : (
													false
												)}
											</div>

											<div className="line_pertanyaan_8"></div>

											<div className="pertanyaan_jawaban_8">
												<div className="pertanyaan_8">
													<p>Pertanyaan</p>
													<TextField
														name="pertanyaan_8"
														variant="outlined"
														fullWidth
														defaultValue={`${kriteria[7].pertanyaan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
												<div className="jawaban_8">
													<p>Jawaban</p>
													<TextField
														name="jawaban_8"
														variant="outlined"
														fullWidth
														defaultValue={`${jawaban[7].pilihan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
											</div>
											<div className="verifikasi_pertanyaan_8">
												<p>Verifikasi</p>
												<FormControl>
													<RadioGroup
														row
														name="verifikasi_kondisi_8"
														className="verif_8"
													>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[7]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[7]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Sesuai"
															style={{
																marginRight: "30px",
															}}
														/>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[7]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[7]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Tidak sesuai"
														/>
													</RadioGroup>
												</FormControl>
												{survey[7].verifikasi_kondisi ===
												"Tidak sesuai" ? (
													<div className="status_tidak_sesuai">
														<p>Keterangan</p>
														<TextField
															name="status_tidak_sesuai"
															variant="outlined"
															fullWidth
															autoComplete="off"
															multiline
															rows={3}
															disabled
															defaultValue={survey[7].keterangan}
														/>
													</div>
												) : (
													false
												)}
											</div>

											<div className="line_pertanyaan_9"></div>

											<div className="pertanyaan_jawaban_9">
												<div className="pertanyaan_9">
													<p>Pertanyaan</p>
													<TextField
														name="pertanyaan_9"
														variant="outlined"
														fullWidth
														defaultValue={`${kriteria[8].pertanyaan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
												<div className="jawaban_9">
													<p>Jawaban</p>
													<TextField
														name="jawaban_9"
														variant="outlined"
														fullWidth
														defaultValue={`${jawaban[8].pilihan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
											</div>
											<div className="verifikasi_pertanyaan_9">
												<p>Verifikasi</p>
												<FormControl>
													<RadioGroup
														row
														name="verifikasi_kondisi_9"
														className="verif_9"
													>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[8]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[8]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Sesuai"
															style={{
																marginRight: "30px",
															}}
														/>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[8]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[8]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Tidak sesuai"
														/>
													</RadioGroup>
												</FormControl>
												{survey[8].verifikasi_kondisi ===
												"Tidak sesuai" ? (
													<div className="status_tidak_sesuai">
														<p>Keterangan</p>
														<TextField
															name="status_tidak_sesuai"
															variant="outlined"
															fullWidth
															autoComplete="off"
															multiline
															rows={3}
															disabled
															defaultValue={survey[8].keterangan}
														/>
													</div>
												) : (
													false
												)}
											</div>

											<div className="line_pertanyaan_10"></div>

											<div className="pertanyaan_jawaban_10">
												<div className="pertanyaan_10">
													<p>Pertanyaan</p>
													<TextField
														name="pertanyaan_10"
														variant="outlined"
														fullWidth
														defaultValue={`${kriteria[9].pertanyaan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
												<div className="jawaban_10">
													<p>Jawaban</p>
													<TextField
														name="jawaban_10"
														variant="outlined"
														fullWidth
														defaultValue={`${jawaban[9].pilihan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
											</div>
											<div className="verifikasi_pertanyaan_10">
												<p>Verifikasi</p>
												<FormControl>
													<RadioGroup
														row
														name="verifikasi_kondisi_10"
														className="verif_10"
													>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[9]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[9]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Sesuai"
															style={{
																marginRight: "30px",
															}}
														/>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[9]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[9]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Tidak sesuai"
														/>
													</RadioGroup>
												</FormControl>
												{survey[9].verifikasi_kondisi ===
												"Tidak sesuai" ? (
													<div className="status_tidak_sesuai">
														<p>Keterangan</p>
														<TextField
															name="status_tidak_sesuai"
															variant="outlined"
															fullWidth
															autoComplete="off"
															multiline
															rows={3}
															disabled
															defaultValue={survey[9].keterangan}
														/>
													</div>
												) : (
													false
												)}
											</div>

											<div className="line_pertanyaan_11"></div>

											<div className="pertanyaan_jawaban_11">
												<div className="pertanyaan_11">
													<p>Pertanyaan</p>
													<TextField
														name="pertanyaan_11"
														variant="outlined"
														fullWidth
														defaultValue={`${kriteria[10].pertanyaan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
												<div className="jawaban_11">
													<p>Jawaban</p>
													<TextField
														name="jawaban_11"
														variant="outlined"
														fullWidth
														defaultValue={`${jawaban[10].pilihan}`}
														disabled={true}
														multiline
														rows={2}
													/>
												</div>
											</div>
											<div className="verifikasi_pertanyaan_11">
												<p>Verifikasi</p>
												<FormControl>
													<RadioGroup
														row
														name="verifikasi_kondisi_11"
														className="verif_11"
													>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[10]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[10]
																			.verifikasi_kondisi !==
																		"Sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Sesuai"
															style={{
																marginRight: "30px",
															}}
														/>
														<FormControlLabel
															control={
																<Radio
																	style={{
																		marginRight: "3px",
																	}}
																	disabled={
																		survey[10]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? true
																			: false
																	}
																	checked={
																		survey[10]
																			.verifikasi_kondisi !==
																		"Tidak sesuai"
																			? false
																			: true
																	}
																/>
															}
															label="Tidak sesuai"
														/>
													</RadioGroup>
												</FormControl>
												{survey[10].verifikasi_kondisi ===
												"Tidak sesuai" ? (
													<div className="status_tidak_sesuai">
														<p>Keterangan</p>
														<TextField
															name="status_tidak_sesuai"
															variant="outlined"
															fullWidth
															autoComplete="off"
															multiline
															rows={3}
															disabled
															defaultValue={
																survey[10].keterangan
															}
														/>
													</div>
												) : (
													false
												)}
											</div>
										</div>
									)}
								</div>
							</AccordionDetails>
						</Accordion>
					</div>

					<div className="kebijakan_bantuan">
						<Accordion>
							<AccordionSummary
								expandIcon={
									<MdExpandMore size={23} color="rgb(75, 75, 253)" />
								}
								aria-controls="panelia-content"
								id="panel1a-header"
							>
								<div className="title">
									<p>Kebijakan Bantuan</p>
									<div className="line_kebijakan"></div>
								</div>
							</AccordionSummary>
							<AccordionDetails>
								{wargaByNoKK.status_rekomendasi === "memenuhi" ? (
									<Alert severity="success" variant="outlined">
										Warga sudah dinyatakan memenuhi untuk mendapatkan
										bantuan.
									</Alert>
								) : (
									<div className="verifikasi_kebijakan">
										{isValidKebijakan ? (
											<Alert severity="warning" variant="outlined">
												Silahkan lakukan verifikasi dan mengisi
												keterangan terlebih dahulu!
											</Alert>
										) : (
											false
										)}
										<p>Verifikasi Kebijakan</p>
										<FormControl>
											<RadioGroup
												row
												name="verifikasi_kebijakan"
												className="verif_kebijakan"
												onChange={(e) =>
													setKebijakanBantuan(e.target.value)
												}
											>
												<FormControlLabel
													value="memenuhi"
													control={
														<Radio
															style={{
																marginRight: "3px",
															}}
														/>
													}
													label="Memenuhi"
												/>
											</RadioGroup>
										</FormControl>

										<div className="keterangan_kebijakan">
											<p>Keterangan</p>
											<TextField
												name="keterangan_kebijakan"
												variant="outlined"
												fullWidth
												autoComplete="off"
												multiline
												rows={3}
												onChange={(e) => {
													setKeteranganKebijakan(e.target.value);
												}}
											/>
										</div>

										<Button
											variant="contained"
											fullWidth
											style={{
												fontWeight: "bold",
												padding: 0,
												height: "40px",
												marginTop: "25px",
											}}
											onClick={() => {
												let historyKebijakanLength =
													history.length + 1;
												const date = new Date();
												const [month, day, year] = [
													date.getMonth() + 1,
													date.getDate(),
													date.getFullYear(),
												];
												const [hour, minute, seconds] = [
													date.getHours(),
													date.getMinutes(),
													date.getSeconds(),
												];

												if (
													kebijakanBantuan &&
													keteranganKebijakan
												) {
													API.updateWarga(wargaByNoKK.no_kk, {
														status_rekomendasi: "memenuhi",
														status_kebijakan: "Ya",
													});
													API.saveHistoryKebijakan({
														id_history: `HSTY_${historyKebijakanLength}`,
														user_id: kuki.get("user_id"),
														no_kk: location.state.ui,
														waktu_kebijakan: `${year}-0${month}-${day} ${hour}:${minute}:${seconds}`,
														keterangan: keteranganKebijakan,
													}).then((res) => {
														navigate(
															"/pendaftaran-bantuan-detail",
															{
																state: {
																	id_bantuan:
																		wargaByNoKK.id_bantuan,
																},
															}
														);
													});
												} else {
													setIsValidKebijakan(true);
												}
											}}
										>
											submit
										</Button>
									</div>
								)}
							</AccordionDetails>
						</Accordion>
					</div>
				</div>
			)}
		</div>
	);
};

export default WargaDetail;
