// styling component linked in warga_petugas_detail.scss file

import React, { useState, useEffect } from "react";

// API storage
import API from "../../api";

// npm packages
import { useLocation, useNavigate } from "react-router-dom";
import {
	TextField,
	Button,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	FormControl,
	Radio,
	RadioGroup,
	FormControlLabel,
	Alert,
	CircularProgress,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import HasilRekomendasiPetugas from "./HasilRekomendasiPetugas";

const WargaPetugasDetail = () => {
	const [wargaByNoKK, setWargaByNoKK] = useState(null);
	const [kriteria, setKriteria] = useState(null);
	const [jawaban, setJawaban] = useState(null);
	const [survey, setSurvey] = useState(null);

	const [isValidSubmit, setIsValidSubmit] = useState(false);
	const [isLoadContent, setIsLoadContent] = useState(false);

	// state for catch verification condition
	const [verifikasiJawaban1, setVerifikasiJawaban1] = useState(null);
	const [verifikasiJawaban2, setVerifikasiJawaban2] = useState(null);
	const [verifikasiJawaban3, setVerifikasiJawaban3] = useState(null);
	const [verifikasiJawaban4, setVerifikasiJawaban4] = useState(null);
	const [verifikasiJawaban5, setVerifikasiJawaban5] = useState(null);
	const [verifikasiJawaban6, setVerifikasiJawaban6] = useState(null);
	const [verifikasiJawaban7, setVerifikasiJawaban7] = useState(null);
	const [verifikasiJawaban8, setVerifikasiJawaban8] = useState(null);
	const [verifikasiJawaban9, setVerifikasiJawaban9] = useState(null);
	const [verifikasiJawaban10, setVerifikasiJawaban10] = useState(null);
	const [verifikasiJawaban11, setVerifikasiJawaban11] = useState(null);

	// state for catch keterangan verification condition
	const [keteranganJawaban1, setKeteranganJawaban1] =
		useState("keterangan sesuai");
	const [keteranganJawaban2, setKeteranganJawaban2] =
		useState("keterangan sesuai");
	const [keteranganJawaban3, setKeteranganJawaban3] =
		useState("keterangan sesuai");
	const [keteranganJawaban4, setKeteranganJawaban4] =
		useState("keterangan sesuai");
	const [keteranganJawaban5, setKeteranganJawaban5] =
		useState("keterangan sesuai");
	const [keteranganJawaban6, setKeteranganJawaban6] =
		useState("keterangan sesuai");
	const [keteranganJawaban7, setKeteranganJawaban7] =
		useState("keterangan sesuai");
	const [keteranganJawaban8, setKeteranganJawaban8] =
		useState("keterangan sesuai");
	const [keteranganJawaban9, setKeteranganJawaban9] =
		useState("keterangan sesuai");
	const [keteranganJawaban10, setKeteranganJawaban10] =
		useState("keterangan sesuai");
	const [keteranganJawaban11, setKeteranganJawaban11] =
		useState("keterangan sesuai");

	// state for catch value of verification condition
	const [valueVerifikasi1, setValueVerifikasi1] = useState(null);
	const [valueVerifikasi2, setValueVerifikasi2] = useState(null);
	const [valueVerifikasi3, setValueVerifikasi3] = useState(null);
	const [valueVerifikasi4, setValueVerifikasi4] = useState(null);
	const [valueVerifikasi5, setValueVerifikasi5] = useState(null);
	const [valueVerifikasi6, setValueVerifikasi6] = useState(null);
	const [valueVerifikasi7, setValueVerifikasi7] = useState(null);
	const [valueVerifikasi8, setValueVerifikasi8] = useState(null);
	const [valueVerifikasi9, setValueVerifikasi9] = useState(null);
	const [valueVerifikasi10, setValueVerifikasi10] = useState(null);
	const [valueVerifikasi11, setValueVerifikasi11] = useState(null);

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Pendaftaran Bantuan Warga Detail";
		API.getWargaByNoKK(location.state.ui).then((res) =>
			setWargaByNoKK(res.data)
		);
		API.getPrioritasByUserIDandIdentitasPilihan(location.state.uid).then(
			(res) => {
				setJawaban(res.data);
			}
		);
		getAllKriteria();
		getAllSurvey();

		setTimeout(() => {
			setIsLoadContent(true);
		}, 2000);
	}, [location]);

	const getAllKriteria = async () => {
		const response = await API.getAllKriteria();
		setKriteria(response.data);
	};

	const getAllSurvey = async () => {
		const response = await API.getAllSurvey();
		setSurvey(response.data);
	};

	const showKeteranganJawaban1 = (status) => {
		if (status === "0")
			return (
				<div className="status_tidak_sesuai">
					<p>Keterangan</p>
					<TextField
						name="status_tidak_sesuai"
						variant="outlined"
						fullWidth
						autoComplete="off"
						multiline
						rows={3}
						onChange={(e) => setKeteranganJawaban1(e.target.value)}
					/>
				</div>
			);

		return null;
	};

	const showKeteranganJawaban2 = (status) => {
		if (status === "0")
			return (
				<div className="status_tidak_sesuai">
					<p>Keterangan</p>
					<TextField
						name="status_tidak_sesuai"
						variant="outlined"
						fullWidth
						autoComplete="off"
						multiline
						rows={3}
						onChange={(e) => setKeteranganJawaban2(e.target.value)}
					/>
				</div>
			);

		return null;
	};
	const showKeteranganJawaban3 = (status) => {
		if (status === "0")
			return (
				<div className="status_tidak_sesuai">
					<p>Keterangan</p>
					<TextField
						name="status_tidak_sesuai"
						variant="outlined"
						fullWidth
						autoComplete="off"
						multiline
						rows={3}
						onChange={(e) => setKeteranganJawaban3(e.target.value)}
					/>
				</div>
			);

		return null;
	};

	const showKeteranganJawaban4 = (status) => {
		if (status === "0")
			return (
				<div className="status_tidak_sesuai">
					<p>Keterangan</p>
					<TextField
						name="status_tidak_sesuai"
						variant="outlined"
						fullWidth
						autoComplete="off"
						multiline
						rows={3}
						onChange={(e) => setKeteranganJawaban4(e.target.value)}
					/>
				</div>
			);

		return null;
	};
	const showKeteranganJawaban5 = (status) => {
		if (status === "0")
			return (
				<div className="status_tidak_sesuai">
					<p>Keterangan</p>
					<TextField
						name="status_tidak_sesuai"
						variant="outlined"
						fullWidth
						autoComplete="off"
						multiline
						rows={3}
						onChange={(e) => setKeteranganJawaban5(e.target.value)}
					/>
				</div>
			);

		return null;
	};

	const showKeteranganJawaban6 = (status) => {
		if (status === "0")
			return (
				<div className="status_tidak_sesuai">
					<p>Keterangan</p>
					<TextField
						name="status_tidak_sesuai"
						variant="outlined"
						fullWidth
						autoComplete="off"
						multiline
						rows={3}
						onChange={(e) => setKeteranganJawaban6(e.target.value)}
					/>
				</div>
			);

		return null;
	};

	const showKeteranganJawaban7 = (status) => {
		if (status === "0")
			return (
				<div className="status_tidak_sesuai">
					<p>Keterangan</p>
					<TextField
						name="status_tidak_sesuai"
						variant="outlined"
						fullWidth
						autoComplete="off"
						multiline
						rows={3}
						onChange={(e) => setKeteranganJawaban7(e.target.value)}
					/>
				</div>
			);

		return null;
	};

	const showKeteranganJawaban8 = (status) => {
		if (status === "0")
			return (
				<div className="status_tidak_sesuai">
					<p>Keterangan</p>
					<TextField
						name="status_tidak_sesuai"
						variant="outlined"
						fullWidth
						autoComplete="off"
						multiline
						rows={3}
						onChange={(e) => setKeteranganJawaban8(e.target.value)}
					/>
				</div>
			);

		return null;
	};

	const showKeteranganJawaban9 = (status) => {
		if (status === "0")
			return (
				<div className="status_tidak_sesuai">
					<p>Keterangan</p>
					<TextField
						name="status_tidak_sesuai"
						variant="outlined"
						fullWidth
						autoComplete="off"
						multiline
						rows={3}
						onChange={(e) => setKeteranganJawaban9(e.target.value)}
					/>
				</div>
			);

		return null;
	};

	const showKeteranganJawaban10 = (status) => {
		if (status === "0")
			return (
				<div className="status_tidak_sesuai">
					<p>Keterangan</p>
					<TextField
						name="status_tidak_sesuai"
						variant="outlined"
						fullWidth
						autoComplete="off"
						multiline
						rows={3}
						onChange={(e) => setKeteranganJawaban10(e.target.value)}
					/>
				</div>
			);

		return null;
	};

	const showKeteranganJawaban11 = (status) => {
		if (status === "0")
			return (
				<div className="status_tidak_sesuai">
					<p>Keterangan</p>
					<TextField
						name="status_tidak_sesuai"
						variant="outlined"
						fullWidth
						autoComplete="off"
						multiline
						rows={3}
						onChange={(e) => setKeteranganJawaban11(e.target.value)}
					/>
				</div>
			);

		return null;
	};

	return (
		<div className="warga_petugas_detail">
			<div className="logo_app">
				<h2>Basoma</h2>
			</div>
			{isLoadContent ? (
				wargaByNoKK && (
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
						<div className="verifikasi_kondisi">
							<Accordion>
								<AccordionSummary
									expandIcon={
										<MdExpandMore
											size={23}
											color="rgb(75, 75, 253)"
										/>
									}
									aria-controls="panelia-content"
									id="panel1a-header"
								>
									<div className="title">
										<p>Verifikasi Kondisi</p>
										<div className="line"></div>
									</div>
								</AccordionSummary>
								<AccordionDetails>
									<div className="verifikasi_content">
										{wargaByNoKK &&
										wargaByNoKK.status_rekomendasi !== "pending" ? (
											<HasilRekomendasiPetugas
												status_rekomendasi={
													wargaByNoKK.status_rekomendasi
												}
												hasil_survey={wargaByNoKK.nilai_rekomendasi}
											/>
										) : (
											<div>
												{isValidSubmit ? (
													<Alert
														severity="warning"
														variant="outlined"
													>
														Silahkan lengkapi verifikasi
														pertanyaan terlebih dahulu!
													</Alert>
												) : null}
												{kriteria && jawaban && (
													<div className="wrap_verifikasi_content">
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
																	onChange={(e) =>
																		setVerifikasiJawaban1(
																			e.target.value
																		)
																	}
																>
																	<FormControlLabel
																		value={
																			kriteria[0]
																				.nilai_prioritas
																		}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi1(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Sesuai"
																		style={{
																			marginRight: "30px",
																		}}
																	/>
																	<FormControlLabel
																		value={0}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi1(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Tidak sesuai"
																	/>
																</RadioGroup>
															</FormControl>
															{showKeteranganJawaban1(
																verifikasiJawaban1
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
																	onChange={(e) =>
																		setVerifikasiJawaban2(
																			e.target.value
																		)
																	}
																>
																	<FormControlLabel
																		value={
																			kriteria[1]
																				.nilai_prioritas
																		}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi2(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Sesuai"
																		style={{
																			marginRight: "30px",
																		}}
																	/>
																	<FormControlLabel
																		value={0}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi2(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Tidak sesuai"
																	/>
																</RadioGroup>
															</FormControl>
															{showKeteranganJawaban2(
																verifikasiJawaban2
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
																	onChange={(e) =>
																		setVerifikasiJawaban3(
																			e.target.value
																		)
																	}
																>
																	<FormControlLabel
																		value={
																			kriteria[2]
																				.nilai_prioritas
																		}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi3(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Sesuai"
																		style={{
																			marginRight: "30px",
																		}}
																	/>
																	<FormControlLabel
																		value={0}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi3(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Tidak sesuai"
																	/>
																</RadioGroup>
															</FormControl>
															{showKeteranganJawaban3(
																verifikasiJawaban3
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
																	onChange={(e) =>
																		setVerifikasiJawaban4(
																			e.target.value
																		)
																	}
																>
																	<FormControlLabel
																		value={
																			kriteria[3]
																				.nilai_prioritas
																		}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi4(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Sesuai"
																		style={{
																			marginRight: "30px",
																		}}
																	/>
																	<FormControlLabel
																		value={0}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi4(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Tidak sesuai"
																	/>
																</RadioGroup>
															</FormControl>
															{showKeteranganJawaban4(
																verifikasiJawaban4
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
																	onChange={(e) =>
																		setVerifikasiJawaban5(
																			e.target.value
																		)
																	}
																>
																	<FormControlLabel
																		value={
																			kriteria[4]
																				.nilai_prioritas
																		}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi5(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Sesuai"
																		style={{
																			marginRight: "30px",
																		}}
																	/>
																	<FormControlLabel
																		value={0}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi5(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Tidak sesuai"
																	/>
																</RadioGroup>
															</FormControl>
															{showKeteranganJawaban5(
																verifikasiJawaban5
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
																	onChange={(e) =>
																		setVerifikasiJawaban6(
																			e.target.value
																		)
																	}
																>
																	<FormControlLabel
																		value={
																			kriteria[5]
																				.nilai_prioritas
																		}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi6(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Sesuai"
																		style={{
																			marginRight: "30px",
																		}}
																	/>
																	<FormControlLabel
																		value={0}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi6(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Tidak sesuai"
																	/>
																</RadioGroup>
															</FormControl>
															{showKeteranganJawaban6(
																verifikasiJawaban6
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
																	onChange={(e) =>
																		setVerifikasiJawaban7(
																			e.target.value
																		)
																	}
																>
																	<FormControlLabel
																		value={
																			kriteria[6]
																				.nilai_prioritas
																		}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi7(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Sesuai"
																		style={{
																			marginRight: "30px",
																		}}
																	/>
																	<FormControlLabel
																		value={0}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi7(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Tidak sesuai"
																	/>
																</RadioGroup>
															</FormControl>
															{showKeteranganJawaban7(
																verifikasiJawaban7
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
																	onChange={(e) =>
																		setVerifikasiJawaban8(
																			e.target.value
																		)
																	}
																>
																	<FormControlLabel
																		value={
																			kriteria[7]
																				.nilai_prioritas
																		}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi8(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Sesuai"
																		style={{
																			marginRight: "30px",
																		}}
																	/>
																	<FormControlLabel
																		value={0}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi8(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Tidak sesuai"
																	/>
																</RadioGroup>
															</FormControl>
															{showKeteranganJawaban8(
																verifikasiJawaban8
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
																	onChange={(e) =>
																		setVerifikasiJawaban9(
																			e.target.value
																		)
																	}
																>
																	<FormControlLabel
																		value={
																			kriteria[8]
																				.nilai_prioritas
																		}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi9(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Sesuai"
																		style={{
																			marginRight: "30px",
																		}}
																	/>
																	<FormControlLabel
																		value={0}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi9(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Tidak sesuai"
																	/>
																</RadioGroup>
															</FormControl>
															{showKeteranganJawaban9(
																verifikasiJawaban9
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
																	onChange={(e) =>
																		setVerifikasiJawaban10(
																			e.target.value
																		)
																	}
																>
																	<FormControlLabel
																		value={
																			kriteria[9]
																				.nilai_prioritas
																		}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi10(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Sesuai"
																		style={{
																			marginRight: "30px",
																		}}
																	/>
																	<FormControlLabel
																		value={0}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi10(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Tidak sesuai"
																	/>
																</RadioGroup>
															</FormControl>
															{showKeteranganJawaban10(
																verifikasiJawaban10
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
																	onChange={(e) =>
																		setVerifikasiJawaban11(
																			e.target.value
																		)
																	}
																>
																	<FormControlLabel
																		value={
																			kriteria[10]
																				.nilai_prioritas
																		}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi11(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Sesuai"
																		style={{
																			marginRight: "30px",
																		}}
																	/>
																	<FormControlLabel
																		value={0}
																		control={
																			<Radio
																				style={{
																					marginRight:
																						"3px",
																				}}
																				onChange={(e) => {
																					setValueVerifikasi11(
																						e.target
																							.labels[0]
																							.outerText
																					);
																				}}
																			/>
																		}
																		label="Tidak sesuai"
																	/>
																</RadioGroup>
															</FormControl>
															{showKeteranganJawaban11(
																verifikasiJawaban11
															)}
														</div>
													</div>
												)}
												<Button
													variant="contained"
													fullWidth
													style={{
														fontWeight: "bold",
														padding: 0,
														height: "40px",
														marginTop: "20px",
													}}
													onClick={() => {
														const arrValueVerifikasiJawaban = [];
														const arrKeteranganJawaban = [];
														let surveyLength = survey.length + 1;

														arrValueVerifikasiJawaban.push(
															valueVerifikasi1,
															valueVerifikasi2,
															valueVerifikasi3,
															valueVerifikasi4,
															valueVerifikasi5,
															valueVerifikasi6,
															valueVerifikasi7,
															valueVerifikasi8,
															valueVerifikasi9,
															valueVerifikasi10,
															valueVerifikasi11
														);

														arrKeteranganJawaban.push(
															keteranganJawaban1,
															keteranganJawaban2,
															keteranganJawaban3,
															keteranganJawaban4,
															keteranganJawaban5,
															keteranganJawaban6,
															keteranganJawaban7,
															keteranganJawaban8,
															keteranganJawaban9,
															keteranganJawaban10,
															keteranganJawaban11
														);

														if (
															verifikasiJawaban1 &&
															verifikasiJawaban2 &&
															verifikasiJawaban3 &&
															verifikasiJawaban4 &&
															verifikasiJawaban5 &&
															verifikasiJawaban6 &&
															verifikasiJawaban7 &&
															verifikasiJawaban8 &&
															verifikasiJawaban9 &&
															verifikasiJawaban10 &&
															verifikasiJawaban11
														) {
															const hasilNilaiRekomendasi =
																parseFloat(verifikasiJawaban1) +
																parseFloat(verifikasiJawaban2) +
																parseFloat(verifikasiJawaban3) +
																parseFloat(verifikasiJawaban4) +
																parseFloat(verifikasiJawaban5) +
																parseFloat(verifikasiJawaban6) +
																parseFloat(verifikasiJawaban7) +
																parseFloat(verifikasiJawaban8) +
																parseFloat(verifikasiJawaban9) +
																parseFloat(
																	verifikasiJawaban10
																) +
																parseFloat(verifikasiJawaban11);

															if (
																Math.floor(
																	(hasilNilaiRekomendasi /
																		10) *
																		1000
																) > 43
															) {
																API.updateWarga(
																	location.state.ui,
																	{
																		status_rekomendasi:
																			"memenuhi",
																	}
																);
															} else {
																API.updateWarga(
																	location.state.ui,
																	{
																		status_rekomendasi:
																			"tidak memenuhi",
																	}
																);
															}

															for (
																let i = 0;
																i <
																arrValueVerifikasiJawaban.length;
																i++
															) {
																API.updateWarga(
																	location.state.ui,
																	{
																		nilai_rekomendasi:
																			Math.floor(
																				(hasilNilaiRekomendasi /
																					10) *
																					1000
																			),
																	}
																);

																API.saveSurvey({
																	id_survey: `SRVY_${surveyLength++}`,
																	no_kk: location.state.ui,
																	verifikasi_kondisi:
																		arrValueVerifikasiJawaban[
																			i
																		],
																	keterangan:
																		arrKeteranganJawaban[i],
																	identitas_survey: i,
																}).then(() => {
																	navigate(
																		"/pendaftaran-bantuan-petugas-detail",
																		{
																			state: {
																				id_bantuan:
																					wargaByNoKK.id_bantuan,
																			},
																		}
																	);
																});
															}
														} else {
															setIsValidSubmit(true);
														}
													}}
												>
													submit
												</Button>
											</div>
										)}
									</div>
								</AccordionDetails>
							</Accordion>
						</div>
					</div>
				)
			) : (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "80vh",
					}}
				>
					<CircularProgress />
				</div>
			)}
		</div>
	);
};

export default WargaPetugasDetail;
