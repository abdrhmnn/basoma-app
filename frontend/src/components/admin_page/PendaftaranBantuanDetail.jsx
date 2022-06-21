// styling component linked in pendaftaran_bantuan_detail.scss file

import React, { useState, useEffect } from "react";

// API storage
import API from "../../api";

// npm packages
import {
	TextField,
	Button,
	FormControl,
	Select,
	MenuItem,
	Modal,
	Box,
	Typography,
	InputLabel,
	Alert,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import { RiHistoryFill } from "react-icons/ri";
import { GoTasklist } from "react-icons/go";
import { BsPrinter } from "react-icons/bs";
import swal from "sweetalert";

const PendaftaranBantuanDetail = () => {
	const [pendaftaranBantuanByUserID, setPendaftaranBantuanByUserID] =
		useState(null);
	const [searchDataPendaftaran, setSearchDataPendaftaran] = useState("");
	const [dataPendaftaranLength, setDataPendaftaranLength] = useState(10);
	const [pemberitahuan, setPemberitahuan] = useState(null);

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

	useEffect(() => {
		document.title = "Pendaftaran Bantuan Detail";
		API.getWargaByBantuanID(location.state.id_bantuan).then((res) =>
			setPendaftaranBantuanByUserID(res.data)
		);
		API.getAllPemberitahuan().then((res) => {
			setPemberitahuan(res.data);
		});
	}, [location]);

	const handleChange = (e) => {
		setSearchDataPendaftaran(e.target.value);
	};

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
		img.src = "/logo_basoma.png";

		var doc = new jsPDF({ orientation: "p", lineHeight: 1.5 });
		doc.setFontSize(13);
		doc.text("Laporan Hasil Verifikasi Pendaftaran Bantuan", 57, 21);
		doc.setFontSize(11);
		doc.addImage(img, "PNG", 13, 10, 17, 17);
		doc.line(13, 31, 197, 31);
		doc.text(
			`Tanggal cetak : ${today.getDate()} - 0${
				today.getMonth() + 1
			} - ${today.getFullYear()}`,
			14,
			39
		);

		if (statusVerifikasi === "memenuhi") {
			doc.autoTable({
				head: [
					[
						"No",
						"No KK",
						"Nama lengkap",
						"Alamat",
						"No. tlp",
						"Status Verifikasi",
						"Hasil Rekomendasi",
					],
				],
				body: pendaftaranBantuanByUserID
					.filter((e) => e.status_rekomendasi === "memenuhi")
					.map((e, i) => {
						return [
							`${i + 1}.`,
							e.no_kk,
							e.nama_lengkap,
							e.alamat,
							e.no_telepon,
							e.status_rekomendasi,
							`${e.nilai_rekomendasi}%`,
						];
					}),
				startY: 44,
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
			doc.autoTable({
				head: [
					[
						"No",
						"No KK",
						"Nama lengkap",
						"Alamat",
						"No. tlp",
						"Status Verifikasi",
						"Hasil Rekomendasi",
					],
				],
				body: pendaftaranBantuanByUserID
					.filter((e) => e.status_rekomendasi !== "memenuhi")
					.map((e, i) => {
						return [
							`${i + 1}.`,
							e.no_kk,
							e.nama_lengkap,
							e.alamat,
							e.no_telepon,
							e.status_rekomendasi,
							`${e.nilai_rekomendasi}%`,
						];
					}),
				startY: 44,
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
		<div className="pendaftaran_bantuan_detail">
			<div className="logo_app">
				<h2>Basoma</h2>
			</div>
			<div className="wrap_tbl_pendaftaran_detail">
				<div className="flex_element_pendaftaran_detail">
					<div className="cari_data_warga">
						{/* cari bantuan section */}
						<TextField
							label="Cari berdasarkan nama"
							name="nm_depan"
							variant="outlined"
							onChange={handleChange}
							autoComplete="off"
							className="inp_cari"
						/>
					</div>
					<div className="history_kebijakan_bantuan">
						<Button
							variant="outlined"
							color="success"
							onClick={() => {
								let pemberitahuanLoop = pemberitahuan + 1;
								swal({
									title: "Konfirmasi calon penerima bantuan",
									text: "Jika iya, maka hasil keputusan sudah tidak bisa diubah lagi!",
									icon: "warning",
									buttons: ["Tidak", "Ya"],
								}).then((willApprove) => {
									if (willApprove) {
										for (
											let i = 0;
											i < pendaftaranBantuanByUserID.length;
											i++
										) {
											if (
												pendaftaranBantuanByUserID[i]
													.status_rekomendasi === "memenuhi"
											) {
												API.savePemberitahuan(
													pemberitahuanLoop++,
													pendaftaranBantuanByUserID[i].user_id,
													"memenuhi"
												);
											} else {
												API.savePemberitahuan(
													pemberitahuanLoop++,
													pendaftaranBantuanByUserID[i].user_id,
													"tidak memenuhi"
												);
											}

											swal("Konfirmasi berhasil dilakukan!", {
												icon: "success",
											});
										}
									}
								});
							}}
							className="btn_history_kebijakan"
							sx={{ mr: 2 }}
						>
							<GoTasklist size={29} />
						</Button>

						{/* btn 2 */}
						<Button
							variant="outlined"
							color="secondary"
							onClick={() => {
								navigate("/history_kebijakan");
							}}
							className="btn_history_kebijakan"
							sx={{ mr: 2 }}
						>
							<RiHistoryFill size={29} />
						</Button>

						{/* btn 3 */}
						<Button
							variant="outlined"
							color="info"
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
											<MenuItem value="memenuhi">Memenuhi</MenuItem>
											<MenuItem value="tidak_memenuhi">
												Tidak memenuhi
											</MenuItem>
										</Select>
									</FormControl>
									<Button
										variant="contained"
										color="success"
										fullWidth
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

				<div className="table_pendaftaran_detail">
					<table className="tbl_class">
						<thead className="tbl_class_head">
							<tr>
								<th>No</th>
								<th>Nomor KK</th>
								<th>Nama lengkap</th>
								<th>Alamat</th>
								<th>No. tlp</th>
								<th>Hasil rekomendasi</th>
								<th>Status</th>
								<th>Aksi</th>
							</tr>
						</thead>
						<tbody className="tbl_class_body">
							{pendaftaranBantuanByUserID &&
								pendaftaranBantuanByUserID
									.slice(0, dataPendaftaranLength)
									.map((e, i) => {
										if (
											e.nama_lengkap
												.toLowerCase()
												.includes(searchDataPendaftaran)
										) {
											return (
												<tr key={i}>
													<td>{i + 1}</td>
													<td>{e.no_kk}</td>
													<td>{e.nama_lengkap}</td>
													<td>{e.alamat}</td>
													<td>{e.no_telepon}</td>
													<td>{e.nilai_rekomendasi}%</td>
													<td>
														{highlightRole(e.status_rekomendasi)}
													</td>
													<td>
														<Button
															variant="contained"
															className="btn_detail_pendaftaran_bantuan"
															onClick={() => {
																navigate("/warga-detail", {
																	state: {
																		ui: e.no_kk,
																		uid: e.user_id,
																	},
																});
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
					<div className="show_length_data_pendaftaran_detail">
						<p>Liat baris: </p>
						<FormControl>
							<Select
								id="pendaftaran_detail_data_length"
								value={dataPendaftaranLength}
								onChange={(e) => {
									setDataPendaftaranLength(e.target.value);
								}}
							>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={20}>20</MenuItem>
								<MenuItem value={50}>50</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
			</div>
			{/* Akhir bantuan admin content */}
		</div>
	);
};

export default PendaftaranBantuanDetail;
