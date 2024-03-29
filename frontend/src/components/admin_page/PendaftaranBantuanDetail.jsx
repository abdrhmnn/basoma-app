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
	const [pendaftaranBantuanByUserID, setPendaftaranBantuanByUserID] = useState(null);
	const [searchDataPendaftaran, setSearchDataPendaftaran] = useState("");
	const [dataPendaftaranLength, setDataPendaftaranLength] = useState(20);
	const [pemberitahuan, setPemberitahuan] = useState(null);

	const [statusVerifikasi, setStatusVerifikasi] = useState("");
	const [alertVerifikasi, setAlertVerifikasi] = useState(false);

	const [alertVerifikasiPeriode, setAlertVerifikasiPeriode] = useState(false);
	const [bulanSatu, setBulanSatu] = useState("");
	const [bulanDua, setBulanDua] = useState("");

	// modal state
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setStatusVerifikasi("");
		setBulanSatu("");
		setBulanDua("");
		setAlertVerifikasi(false);
		setAlertVerifikasiPeriode(false);
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

	const range = (start, end) => {
		let len = end - start + 1;
		let a = new Array(len);
		for (let i = 0; i < len; i++) a[i] = start + i;
		return a;
	}

	const generatePdf = () => {
		if (statusVerifikasi === "" || bulanSatu === "" || bulanDua === "") {
			setAlertVerifikasi(true);
			return;
		}

		if (bulanSatu > bulanDua) {
			setAlertVerifikasiPeriode(true);
			return;
		}

		const today = new Date();
		const dataRangeTanggal = range(bulanSatu, bulanDua);
		const monthNames = [
			"Januari",
			"Februari",
			"Maret",
			"April",
			"Mei",
			"Juni",
			"Juli",
			"Agustus",
			"September",
			"Oktober",
			"November",
			"Desember",
		];

		// console.log(bulanSatu);
		// console.log(bulanDua);
		// console.log(dataRangeTanggal);

		// pendaftaranBantuanByUserID.filter((el, i) => {
		// 	const tanggalDB = new Date(el.tanggal_pendaftaran);
		// 	const dataPeriode = dataRangeTanggal.includes(
		// 		tanggalDB.getMonth() + 1
		// 	);

		// 	if (dataPeriode === false) {
		// 		setAlertVerifikasi(true);
		// 	}
		// 	// console.log(typeof e.tanggal_pendaftaran);
		// 	// console.log(tanggalDB);
		// 	// console.log(tanggalDB.getMonth());
		// 	console.log(dataPeriode);
		// 	// console.log(dataRangeTanggal);
		// 	// return dataPeriode && el.status_rekomendasi === "memenuhi";
		// });
		// .map((e, i) => {
		// 	console.log(e);
		// 	// if (e) {
		// 	// 	console.log("ok");
		// 	// } else {
		// 	// 	console.log("gagal");
		// 	// }
		// });

		const img = new Image();
		img.src = "/logo_kelurahan.png";

		var doc = new jsPDF({ orientation: "p" });
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

		if (statusVerifikasi === "memenuhi") {
			doc.setFontSize(12);
			doc.setFont("helvetica", "normal");
			doc.text("Daftar Warga Penerima Bantuan", 80, 53);
			doc.setFontSize(11);
			doc.text(
				`Tanggal cetak : ${today.getDate()} - 0${
					today.getMonth() + 1
				} - ${today.getFullYear()}`,
				147,
				68
			);
			doc.text(
				`Periode pendaftaran : ${monthNames[bulanSatu - 1]} - ${
					monthNames[bulanDua - 1]
				} 2022`,
				13,
				68
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
						"Hasil Rekomendasi",
						"Kebijakan",
					],
				],
				body: pendaftaranBantuanByUserID
					.filter((el, i) => {
						const tanggalDB = new Date(el.tanggal_pendaftaran);
						const dataPeriode = dataRangeTanggal.includes(
							tanggalDB.getMonth() + 1
						);

						return dataPeriode && el.status_rekomendasi === "memenuhi";
					})
					.map((e, i) => {
						return [
							`${i + 1}.`,
							e.no_kk,
							e.nama_lengkap,
							e.alamat,
							e.no_telepon,
							e.status_rekomendasi,
							`${e.nilai_rekomendasi}%`,
							e.status_kebijakan !== "Ya" ? "Tidak" : "Ya",
						];
					}),
				startY: 73,
				margin: {
					left: 12,
					right: 12,
				},
				theme: "grid",
				columnStyles: {
					0: { halign: "center", valign: "middle" },
					1: { halign: "left", valign: "middle" },
					2: { halign: "left", valign: "middle" },
					3: { halign: "left" },
					4: { halign: "center", valign: "middle" },
					5: { halign: "center", valign: "middle" },
					6: { halign: "center", valign: "middle" },
					7: { halign: "center", valign: "middle" },
				},
				headStyles: {
					fillColor: "rgb(75, 75, 253)",
					halign: "center",
					valign: "middle",
				},
				alternateRowStyles: { fillColor: "rgb(218, 218, 218)" },
			});
		} else {
			doc.setFontSize(12);
			doc.setFont("helvetica", "normal");
			doc.text("Daftar Warga Yang Tidak Memenuhi Menerima Bantuan", 60, 53);
			doc.setFontSize(11);
			doc.text(
				`Tanggal cetak : ${today.getDate()} - 0${
					today.getMonth() + 1
				} - ${today.getFullYear()}`,
				147,
				68
			);
			doc.text(
				`Periode pendaftaran : ${monthNames[bulanSatu - 1]} - ${
					monthNames[bulanDua - 1]
				} 2022`,
				13,
				68
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
						"Hasil Rekomendasi",
					],
				],
				body: pendaftaranBantuanByUserID
					.filter((el, i) => {
						const tanggalDB = new Date(el.tanggal_pendaftaran);
						const dataPeriode = dataRangeTanggal.includes(
							tanggalDB.getMonth() + 1
						);

						return (
							dataPeriode && el.status_rekomendasi === "tidak memenuhi"
						);
					})
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
				startY: 73,
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
										sx={{ mt: 2, mb: 2 }}
									>
										Lengkapi data terlebih dahulu!
									</Alert>
								) : null}

								{alertVerifikasiPeriode ? (
									<Alert
										severity="warning"
										variant="outlined"
										sx={{ mt: 2, mb: 2 }}
									>
										Format tanggal periode tidak valid!
									</Alert>
								) : null}
								<Typography
									id="modal-modal-description"
									sx={{ mt: 3 }}
									component={"span"}
								>
									Periode pendaftaran
								</Typography>
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<FormControl fullWidth sx={{ mt: 2, mb: 2, mr: 2 }}>
										<InputLabel id="pilih_bulan_1">
											Pilih bulan
										</InputLabel>
										<Select
											labelId="pilih_bulan_1"
											id="pilih_bulan_1"
											value={bulanSatu}
											label="Pilih bulan 1"
											onChange={(e) => {
												setBulanSatu(e.target.value);
											}}
										>
											<MenuItem value={1}>Januari</MenuItem>
											<MenuItem value={2}>Februari</MenuItem>
											<MenuItem value={3}>Maret</MenuItem>
											<MenuItem value={4}>April</MenuItem>
											<MenuItem value={5}>Mei</MenuItem>
											<MenuItem value={6}>Juni</MenuItem>
											<MenuItem value={7}>Juli</MenuItem>
											<MenuItem value={8}>Agustus</MenuItem>
											<MenuItem value={9}>September</MenuItem>
											<MenuItem value={10}>Oktober</MenuItem>
											<MenuItem value={11}>November</MenuItem>
											<MenuItem value={12}>Desember</MenuItem>
										</Select>
									</FormControl>
									-
									<FormControl fullWidth sx={{ mt: 2, mb: 2, ml: 2 }}>
										<InputLabel id="pilih_bulan_2">
											Pilih bulan
										</InputLabel>
										<Select
											labelId="pilih_bulan_2"
											id="pilih_bulan_2"
											value={bulanDua}
											label="Pilih bulan 2"
											onChange={(e) => {
												setBulanDua(e.target.value);
											}}
										>
											<MenuItem value={1}>Januari</MenuItem>
											<MenuItem value={2}>Februari</MenuItem>
											<MenuItem value={3}>Maret</MenuItem>
											<MenuItem value={4}>April</MenuItem>
											<MenuItem value={5}>Mei</MenuItem>
											<MenuItem value={6}>Juni</MenuItem>
											<MenuItem value={7}>Juli</MenuItem>
											<MenuItem value={8}>Agustus</MenuItem>
											<MenuItem value={9}>September</MenuItem>
											<MenuItem value={10}>Oktober</MenuItem>
											<MenuItem value={11}>November</MenuItem>
											<MenuItem value={12}>Desember</MenuItem>
										</Select>
									</FormControl>
								</div>

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
								</Typography>
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
													<td
														style={{
															color: "red",
														}}
													>
														{e.status_rekomendasi ===
														"pending" ? (
															"Belum diverifikasi"
														) : (
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
														)}
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
