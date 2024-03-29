// styling component linked in pendaftaran_bantuan_petugas_detail.scss file

import React, { useState, useEffect } from "react";

// API storage
import API from "./../../api";

// npm packages
import {
	Button,
	TextField,
	FormControl,
	Select,
	MenuItem,
	Modal,
	Box,
	Typography,
	InputLabel,
	Alert,
} from "@mui/material";
import { jsPDF } from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPrinter } from "react-icons/bs";

const PendaftaranBantuanPetugasDetail = () => {
	const [wargaByBantuanID, setWargaByBantuanID] = useState(null);
	const [valueCari, setValueCari] = useState("");
	const [dataVerifikasiLength, setDataVerifikasiLength] = useState(20);
	const [dataJoinSurvey, setDataJoinSurvey] = useState(null);

	const [statusVerifikasi, setStatusVerifikasi] = useState("");
	const [alertVerifikasi, setAlertVerifikasi] = useState(false);

	// modal state
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setStatusVerifikasi("");
		setAlertVerifikasi(false);
		setOpen(false);
	};

	const navigate = useNavigate();
	const location = useLocation();

	const seen = new Set();

	useEffect(() => {
		document.title = "Pendaftaran Bantuan Petugas Detail";
		API.getWargaByBantuanID(location.state.id_bantuan).then((res) => {
			setWargaByBantuanID(res.data);
		});
		API.getDataJoinSurvey().then((res) => {
			setDataJoinSurvey(res.data);
		});
	}, [location]);

	const highlightRole = (role) => {
		if (role === "pending")
			return <span className="role_pending">{role}</span>;
		else if (role === "memenuhi")
			return <span className="role_memenuhi">{role}</span>;

		return <span className="role_tidak_memenuhi">{role}</span>;
	};

	const modalStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		borderRadius: 2,
		boxShadow: 24,
		p: 4,
	};

	const generatePdf = () => {
		if (statusVerifikasi === "") {
			setAlertVerifikasi(true);
			return;
		}

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

		if (statusVerifikasi !== "pending") {
			doc.setFontSize(12);
			doc.setFont("helvetica", "normal");
			doc.text("Daftar Warga Yang Sudah Diverifikasi", 72, 53);
			doc.setFontSize(11);
			doc.text(
				`Tanggal cetak : ${today.getDate()} - 0${
					today.getMonth() + 1
				} - ${today.getFullYear()}`,
				13,
				64
			);
			doc.autoTable({
				head: [
					[
						"No",
						"No KK",
						"Nama lengkap",
						"Alamat",
						"No. tlp",
						"Status Verifikasi",
						"Petugas Verifikasi",
					],
				],
				body: dataJoinSurvey
					.filter((el, index) => {
						const duplicate = seen.has(el.warga.no_kk);
						seen.add(el.warga.no_kk);
						return !duplicate;
					})
					.filter((abdu, i) => abdu.warga.status_rekomendasi !== "pending")
					.map((e, i) => {
						return [
							`${i + 1}.`,
							e.warga.no_kk,
							e.warga.nama_lengkap,
							e.warga.alamat,
							e.warga.no_telepon,
							"Sudah terverifikasi",
							`${e.pengguna.username}`,
						];
					}),
				startY: 69,
				margin: {
					left: 12,
					right: 12,
				},
				theme: "grid",
				columnStyles: {
					0: { halign: "center" },
					1: { halign: "left" },
					2: { halign: "left" },
					3: { halign: "left" },
					4: { halign: "center" },
					5: { halign: "center" },
					6: { halign: "center" },
				},
				headStyles: {
					fillColor: "rgb(75, 75, 253)",
					halign: "center",
				},
				alternateRowStyles: { fillColor: "rgb(218, 218, 218)" },
			});
		} else {
			doc.setFontSize(12);
			doc.setFont("helvetica", "normal");
			doc.text("Daftar Warga Yang Belum Diverifikasi", 72, 53);
			doc.setFontSize(11);
			doc.text(
				`Tanggal cetak : ${today.getDate()} - 0${
					today.getMonth() + 1
				} - ${today.getFullYear()}`,
				13,
				64
			);
			doc.autoTable({
				head: [
					[
						"No",
						"No KK",
						"Nama lengkap",
						"Alamat",
						"No. tlp",
						"Status Verifikasi",
					],
				],
				body: wargaByBantuanID
					.filter((abdu, i) => abdu.status_rekomendasi === "pending")
					.map((e, i) => {
						return [
							`${i + 1}.`,
							e.no_kk,
							e.nama_lengkap,
							e.alamat,
							e.no_telepon,
							"Belum terverifikasi",
						];
					}),
				startY: 69,
				margin: {
					left: 12,
					right: 12,
				},
				theme: "grid",
				columnStyles: {
					0: { halign: "center" },
					1: { halign: "left" },
					2: { halign: "left" },
					3: { halign: "left" },
					4: { halign: "center" },
					5: { halign: "center" },
					6: { halign: "center" },
				},
				headStyles: {
					fillColor: "rgb(75, 75, 253)",
					halign: "center",
				},
				alternateRowStyles: { fillColor: "rgb(218, 218, 218)" },
			});
		}
		window.open(doc.output("bloburl"), "_blank");
	};

	return (
		<div className="pendaftaran_petugas_detail">
			<div className="logo_app">
				<h2>Basoma</h2>
			</div>
			<div className="wrap_tbl_pendaftaran_petugas">
				<div className="flex_element_pendaftaran_petugas">
					<div className="cari_warga">
						{/* cari warga section */}
						<TextField
							label="Cari berdasarkan nama"
							variant="outlined"
							onChange={(e) => {
								setValueCari(e.target.value);
							}}
							autoComplete="off"
						/>
					</div>
					<div className="btn_cetak">
						<Button
							variant="outlined"
							color="primary"
							onClick={handleOpen}
							className="btn_history_kebijakan"
						>
							<BsPrinter size={29} />
						</Button>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={modalStyle}>
								<Typography
									id="modal-modal-title"
									variant="h6"
									component="h2"
								>
									Cetak laporan
								</Typography>
								{alertVerifikasi ? (
									<Alert
										severity="warning"
										variant="outlined"
										sx={{ mt: 2 }}
									>
										Pilih status verifikasi terlebih dahulu!
									</Alert>
								) : null}
								<Typography
									id="modal-modal-description"
									sx={{ mt: 3 }}
									component={"span"}
								>
									Status verifikasi
									<FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
										<InputLabel id="nilai_bobot">
											Pilih status
										</InputLabel>
										<Select
											labelId="nilai_bobot"
											id="nilai_bobot"
											value={statusVerifikasi}
											label="Nilai Bobot"
											onChange={(e) => {
												setStatusVerifikasi(e.target.value);
											}}
										>
											<MenuItem value="tidak_pending">
												Sudah terverifikasi
											</MenuItem>
											<MenuItem value="pending">
												Belum terverifikasi
											</MenuItem>
										</Select>
									</FormControl>
									<Button
										variant="contained"
										color="success"
										fullWidth
										sx={{ fontWeight: "bold" }}
										onClick={() => {
											generatePdf();
											// console.log(statusVerifikasi);
										}}
									>
										cetak
									</Button>
								</Typography>
							</Box>
						</Modal>
					</div>
				</div>
				{/* Akhir flex tambah, cari dan export bantuan */}

				<div className="table_pendaftaran_petugas">
					<table className="tbl_class">
						<thead className="tbl_class_head">
							<tr>
								<th>No</th>
								<th>Nama lengkap</th>
								<th>Alamat</th>
								<th>No. tlp</th>
								<th>Status</th>
								<th>Aksi</th>
							</tr>
						</thead>
						<tbody className="tbl_class_body">
							{wargaByBantuanID &&
								wargaByBantuanID
									.slice(0, dataVerifikasiLength)
									.map((e, i) => {
										if (
											e.nama_lengkap
												.toLowerCase()
												.includes(valueCari)
										) {
											return (
												<tr key={i}>
													<td>{i + 1}</td>
													<td style={{ textAlign: "left" }}>
														{e.nama_lengkap}
													</td>
													<td style={{ textAlign: "left" }}>
														{e.alamat}
													</td>
													<td>{e.no_telepon}</td>
													<td>
														{highlightRole(e.status_rekomendasi)}
													</td>
													<td>
														<Button
															variant="contained"
															className="btn_detail_pendaftaran_bantuan_petugas"
															onClick={() => {
																navigate(
																	"/pendaftaran-bantuan-warga-detail",
																	{
																		state: {
																			ui: e.no_kk,
																			uid: e.user_id,
																		},
																	}
																);
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
					<div className="show_length_data_verifikasi_bantuan">
						<p>Liat baris: </p>
						<FormControl>
							<Select
								id="verifikasi_bantuan_data_length"
								value={dataVerifikasiLength}
								onChange={(e) => {
									setDataVerifikasiLength(e.target.value);
								}}
							>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={20}>20</MenuItem>
								<MenuItem value={50}>50</MenuItem>
							</Select>
						</FormControl>
					</div>
					<Button
						variant="contained"
						color="error"
						onClick={() => {
							navigate("/pendaftaran-bantuan-petugas");
						}}
					>
						kembali
					</Button>
				</div>
			</div>
			{/* Akhir bantuan admin content */}
		</div>
	);
};

export default PendaftaranBantuanPetugasDetail;
