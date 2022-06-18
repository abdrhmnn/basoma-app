import React, { useState, useEffect } from "react";

// API storage
import API from "../../api";

// npm packages
import {
	TextField,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Avatar,
	Button,
	Modal,
	Box,
	Typography,
	InputLabel,
	FormControl,
	Select,
	MenuItem,
	Alert,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import { BsPrinter } from "react-icons/bs";
import "jspdf-autotable";
import { jsPDF } from "jspdf";

const HistoryKebijakan = () => {
	const [kepalaKelurahan, setKepalaKelurahan] = useState("");
	const [dataJoinHistory, setDataJoinHistory] = useState(null);
	const [penggunaByID, setPenggunaByID] = useState(null);
	const [historyJoinWargaID, setHistoryJoinWargaID] = useState(null);
	const [alertVerifikasi, setAlertVerifikasi] = useState(false);

	const seen = new Set();

	// modal state
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setKepalaKelurahan("");
		setAlertVerifikasi(false);
		setOpen(false);
	};

	useEffect(() => {
		document.title = "History Kebijakan Bantuan";
		API.getJoinTableHistory().then((res) => {
			setDataJoinHistory(res.data);
		});
		API.getJoinTableHistoryByID(kepalaKelurahan).then((res) => {
			setHistoryJoinWargaID(res.data);
		});
		API.getUserByID(kepalaKelurahan).then((res) => {
			setPenggunaByID(res.data);
		});
	}, [kepalaKelurahan]);

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
		if (kepalaKelurahan === "") {
			setAlertVerifikasi(true);
			return;
		}

		const today = new Date();
		const img = new Image();
		img.src = "/logo_basoma.png";

		var doc = new jsPDF({ orientation: "p" });
		doc.setFontSize(13);
		doc.text("Laporan Kebijakan Bantuan", 79, 21);
		doc.setFontSize(11);
		doc.addImage(img, "PNG", 13, 10, 17, 17);
		doc.line(13, 31, 197, 31);
		doc.text(
			`Kebijakan dilakukan oleh : ${penggunaByID.nm_depan} ${penggunaByID.nm_belakang}`,
			14,
			40
		);
		doc.text(
			`Tanggal cetak : ${today.getDate()} - 0${
				today.getMonth() + 1
			} - ${today.getFullYear()}`,
			14,
			47
		);

		doc.autoTable({
			head: [
				[
					"No",
					"No KK",
					"No KTP",
					"Nama lengkap",
					"Tanggal",
					"Jam/Waktu",
					"Keterangan",
				],
			],
			body: historyJoinWargaID.map((e, i) => {
				const splitWaktuHistory = e.waktu_kebijakan.split(" ");
				const tanggal = splitWaktuHistory[0];
				const waktu = splitWaktuHistory[1];

				return [
					`${i + 1}.`,
					e.warga.no_kk,
					e.warga.no_ktp,
					e.warga.nama_lengkap,
					tanggal,
					`${waktu} WIB`,
					e.keterangan,
				];
			}),
			startY: 52,
			theme: "grid",
			columnStyles: {
				0: { halign: "center" },
				1: { halign: "left" },
				2: { halign: "left" },
				3: { halign: "left" },
				4: { halign: "center" },
				5: { halign: "center" },
				6: { halign: "left" },
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
		<div className="history_kebijakan">
			<div className="logo_app">
				<h2>Basoma</h2>
			</div>
			<div className="content">
				<div className="flex_element_bantuan">
					{/* export bantuan section */}
					<div className="history_kebijakan_bantuan">
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
										sx={{ mb: 2 }}
									>
										Pilih kepala kelurahan terlebih dahulu!
									</Alert>
								) : null}
								<Typography
									id="modal-modal-description"
									sx={{ mt: 3 }}
									component={"span"}
								>
									Kepala kelurahan
									<FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
										<InputLabel id="nilai_bobot">
											Pilih kepala kelurahan
										</InputLabel>
										<Select
											labelId="nilai_bobot"
											id="nilai_bobot"
											value={kepalaKelurahan}
											label="Pilih Kepala Kelurahan"
											onChange={(e) => {
												// console.log(e.target);
												setKepalaKelurahan(e.target.value);
											}}
										>
											{dataJoinHistory &&
												dataJoinHistory
													.filter((el, index) => {
														const duplicate = seen.has(
															el.user_id
														);
														seen.add(el.user_id);
														return !duplicate;
													})
													.map((e, i) => {
														return (
															<MenuItem
																value={e.pengguna.user_id}
																key={i}
															>
																<div className="profile_pengguna">
																	<div className="img_pengguna">
																		<Avatar
																			alt="Foto Pengguna"
																			src={
																				e.pengguna.gambar
																					? e.pengguna
																							.gambar ===
																					  "default_img.svg"
																						? `http://localhost:5000/public/${e.pengguna.gambar}`
																						: `http://localhost:5000/public/user/${e.pengguna.gambar}`
																					: "blank_img.png"
																			}
																		/>
																	</div>
																	<div className="nama_pengguna">
																		{e.pengguna.username}
																	</div>
																</div>
															</MenuItem>
														);
													})}
										</Select>
									</FormControl>
									<Button
										variant="contained"
										color="success"
										fullWidth
										onClick={() => {
											generatePdf();
										}}
									>
										cetak
									</Button>
								</Typography>
							</Box>
						</Modal>
					</div>
					{/* akhir export bantuan section */}
				</div>
				<h3>History kebijakan bantuan</h3>
				{dataJoinHistory &&
					dataJoinHistory.map((e, i) => {
						const splitWaktuHistory = e.waktu_kebijakan.split(" ");
						const tanggal = splitWaktuHistory[0];
						const waktu = splitWaktuHistory[1];

						return (
							<Accordion key={i}>
								<AccordionSummary
									expandIcon={
										<MdExpandMore size={23} color="rgb(23, 23, 23)" />
									}
									aria-controls="panelia-content"
									id="panel1a-header"
								>
									<div className="judul_history">
										<p>
											Kebijakan bantuan telah dilakukan pada tanggal{" "}
											<b>{tanggal}</b> dan jam <b>{waktu}</b> WIB.
										</p>
										<p>Lihat detail</p>
									</div>
								</AccordionSummary>
								<AccordionDetails>
									<div className="content_history">
										<div className="creator_history">
											<p>Kebijakan dilakukan oleh</p>
											<div className="profile_user">
												<div className="foto">
													<Avatar
														alt="Foto Profile"
														src={
															e.pengguna.gambar
																? e.pengguna.gambar ===
																  "default_img.svg"
																	? `http://localhost:5000/public/${e.pengguna.gambar}`
																	: `http://localhost:5000/public/user/${e.pengguna.gambar}`
																: "blank_img.png"
														}
													/>
												</div>
												<div className="data_diri">
													<div className="nm_lengkap">
														{e.pengguna.nm_depan}{" "}
														{e.pengguna.nm_belakang}
													</div>
													<div className="jabatan">
														{e.pengguna.role}
													</div>
												</div>
											</div>
										</div>

										<div className="ket_history">
											<p>Keterangan</p>
											<TextField
												name="keterangan"
												variant="outlined"
												defaultValue={e.keterangan}
												className="text_keterangan"
												disabled={true}
												fullWidth
												multiline
												rows={3}
											/>
										</div>

										<div className="changer_history">
											<div className="table_history">
												<table className="tbl_class">
													<thead className="tbl_class_head">
														<tr>
															<th>Nomor KK</th>
															<th>Nomor KTP</th>
															<th>Nama lengkap</th>
															<th>Alamat</th>
															<th>No telp</th>
														</tr>
													</thead>

													<tbody className="tbl_class_body">
														<tr>
															<td>{e.warga.no_kk}</td>
															<td>{e.warga.no_ktp}</td>
															<td>{e.warga.nama_lengkap}</td>
															<td>{e.warga.alamat}</td>
															<td>{e.warga.no_telepon}</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</AccordionDetails>
							</Accordion>
						);
					})}
			</div>
		</div>
	);
};

export default HistoryKebijakan;
