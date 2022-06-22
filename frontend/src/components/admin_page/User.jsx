// styling component linked in user_page.scss file

import React, { useState, useEffect } from "react";

// components
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

// API storage
import API from "../../api";

// npm packages
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import swal from "sweetalert";
import { RiDeleteBin6Line, RiAdminLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsPerson, BsPrinter } from "react-icons/bs";
import {
	TextField,
	FormControl,
	Select,
	Menu,
	MenuItem,
	Button,
} from "@mui/material";

const User = () => {
	const [user, setUser] = useState([]);
	const [valueCari, setValueCari] = useState("");
	const [dataUserLength, setDataUserLength] = useState(5);
	const [warga, setWarga] = useState(null);
	const [bantuan, setBantuan] = useState(null);
	const [survey, setSurvey] = useState(null);
	const [historyKebijakan, setHistoryKebijakan] = useState(null);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	useEffect(() => {
		document.title = "Kelola User";
		getAllUser();
		getAllWarga();
		getAllBantuan();
		getAllSurvey();
		getAllHistoryKebijakan();
	}, []);

	const getAllUser = async () => {
		const response = await API.getAllUser();
		setUser(response.data);
	};

	const getAllWarga = async () => {
		const response = await API.getAllWarga();
		setWarga(response.data);
	};

	const getAllBantuan = async () => {
		const response = await API.getAllBantuan();
		setBantuan(response.data);
	};

	const getAllSurvey = async () => {
		const response = await API.getAllSurvey();
		setSurvey(response.data);
	};

	const getAllHistoryKebijakan = async () => {
		const response = await API.getAllHistoryKebijakan();
		setHistoryKebijakan(response.data);
	};

	const handleChange = (e) => {
		setValueCari(e.target.value);
	};

	const generatePdf = () => {
		const today = new Date();
		const img = new Image();
		img.src = "/logo_basoma.png";

		var doc = new jsPDF({ orientation: "p" });
		doc.setFontSize(13);
		doc.text("Laporan Pengguna Aplikasi", 80, 21);
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
		doc.autoTable({
			head: [["No", "Nama Depan", "Nama Belakang", "Username", "Role"]],
			body: user.map((e, i) => {
				return [`${i + 1}.`, e.nm_depan, e.nm_belakang, e.username, e.role];
			}),
			startY: 44,
			theme: "grid",
			columnStyles: {
				0: { halign: "center" },
				1: { halign: "center" },
				2: { halign: "center" },
				3: { halign: "center" },
				4: { halign: "center" },
			},
			headStyles: {
				fillColor: "rgb(75, 75, 253)",
				halign: "center",
			},
			alternateRowStyles: { fillColor: "rgb(218, 218, 218)" },
		});
		window.open(doc.output("bloburl"), "_blank");
	};

	const highlightRole = (role) => {
		if (role === "admin") {
			return <span className="role_admin">{role}</span>;
		} else if (role === "petugas") {
			return <span className="role_petugas">{role}</span>;
		}

		return <span className="role_warga">{role}</span>;
	};

	return (
		<div style={{ display: "flex" }}>
			<NavbarAdmin />
			<div className="flex_header_admin">
				<HeaderAdmin />
				<div className="content_dashboard_admin">
					<h2>Data User</h2>
					<div className="wrap_tbl_user">
						<div className="flex_element_user">
							<TextField
								label="Cari Data"
								name="nm_depan"
								variant="outlined"
								sx={{ width: "30%" }}
								onChange={handleChange}
								autoComplete="off"
							/>
							<div className="print_data_user">
								<Button
									id="basic-button"
									aria-controls={open ? "basic-menu" : undefined}
									aria-haspopup="true"
									aria-expanded={open ? "true" : undefined}
									onClick={(e) => setAnchorEl(e.currentTarget)}
								>
									<BsPrinter
										size={20}
										style={{
											marginLeft: 5,
											color: "rgb(75, 75, 253)",
										}}
									/>
									<MdKeyboardArrowDown
										size={20}
										style={{
											marginLeft: 5,
											color: "rgb(117, 117, 117)",
										}}
									/>
								</Button>
								<Menu
									id="basic-menu"
									anchorEl={anchorEl}
									open={open}
									onClose={() => setAnchorEl(null)}
									MenuListProps={{
										"aria-labelledby": "basic-button",
									}}
								>
									<MenuItem
										onClick={() => {
											generatePdf();
										}}
									>
										PDF
									</MenuItem>
								</Menu>
							</div>
						</div>
						<table className="tbl_class">
							<thead className="tbl_class_head">
								<tr>
									<th>No</th>
									<th>Photo</th>
									<th>Nama Depan</th>
									<th>Nama Belakang</th>
									<th>Username</th>
									<th>Role</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody className="tbl_class_body">
								{user &&
									warga &&
									bantuan &&
									survey &&
									historyKebijakan &&
									user.slice(0, dataUserLength).map((e, i) => {
										const stringData =
											e.nm_depan + e.nm_belakang + e.username;

										if (
											stringData.toLowerCase().includes(valueCari)
										) {
											return (
												<tr key={i}>
													<td>{i + 1}.</td>
													<td width={100}>
														{e.gambar === "default_img.svg" ? (
															<img
																src={API.showIMG_DEFAULT(
																	e.gambar
																)}
																alt="Gambar Profile User"
																width={50}
															/>
														) : (
															<img
																src={API.showIMG_USER(e.gambar)}
																alt="Gambar Profile User"
																width={50}
															/>
														)}
													</td>
													<td>{e.nm_depan}</td>
													<td>{e.nm_belakang}</td>
													<td>{e.username}</td>
													<td>{highlightRole(e.role)}</td>
													<td>
														{/* set as admin button */}
														<Button
															variant="contained"
															className="btn_as_admin"
															sx={{
																mr: 1,
															}}
															disabled={
																e.role === "admin"
																	? true
																	: false
															}
															onClick={() => {
																swal({
																	title: "Yakin ingin jadikan sebagai admin?",
																	text: "Jika iya, maka user dapat mengelola aplikasi!",
																	icon: "warning",
																	buttons: ["Tidak", "Yakin"],
																}).then((willUpdate) => {
																	if (willUpdate) {
																		API.updateUser(
																			e.user_id,
																			{
																				role: "admin",
																			}
																		).then((res) => {
																			swal(
																				"User berhasil dijadikan sebagai admin!",
																				{
																					icon: "success",
																				}
																			);
																			getAllUser();
																		});
																	}
																});
															}}
														>
															<RiAdminLine />
														</Button>

														{/* set as petugas button */}
														<Button
															variant="contained"
															className="btn_as_petugas"
															sx={{
																mr: 1,
															}}
															disabled={
																e.role === "petugas"
																	? true
																	: false
															}
															onClick={() => {
																swal({
																	title: "Yakin ingin jadikan sebagai petugas?",
																	text: "Jika iya, maka user dapat memverifikasi kondisi warga!",
																	icon: "warning",
																	buttons: ["Tidak", "Yakin"],
																}).then((willUpdate) => {
																	if (willUpdate) {
																		API.updateUser(
																			e.user_id,
																			{
																				role: "petugas",
																			}
																		).then((res) => {
																			swal(
																				"User berhasil dijadikan sebagai petugas!",
																				{
																					icon: "success",
																				}
																			);
																			getAllUser();
																		});
																	}
																});
															}}
														>
															<BsPerson />
														</Button>

														{/* delete user button */}
														<Button
															variant="contained"
															className="btn_delete_user"
															onClick={() => {
																swal({
																	title: "Yakin ingin hapus data?",
																	text: "Jika iya, maka data tidak bisa dikembalikan lagi (seperti data pendaftaran dan keputusan bantuan)",
																	icon: "warning",
																	buttons: ["Tidak", "Yakin"],
																	dangerMode: true,
																}).then((willDelete) => {
																	if (willDelete) {
																		if (e.role !== "warga") {
																			if (
																				e.gambar !==
																				"default_img.svg"
																			) {
																				API.deleteImgUser(
																					e.gambar
																				);
																			}

																			API.deleteUserByUserID(
																				e.user_id
																			);

																			return swal(
																				"Data berhasil dihapus!",
																				{
																					icon: "success",
																				}
																			).then(function () {
																				getAllUser();
																			});
																		} else {
																			warga.map(
																				async (data, i) => {
																					if (
																						data.user_id ===
																						e.user_id
																					) {
																						API.deleteImgRumah(
																							data.foto_rumah
																						);

																						API.deleteImgUser(
																							e.gambar
																						);

																						API.deleteSurveyByNoKK(
																							data.no_kk
																						);

																						API.deleteHistoryByNoKK(
																							data.no_kk
																						);

																						API.deleteMasukanByUserID(
																							e.user_id
																						);

																						API.deletePemberitahuanByUserID(
																							e.user_id
																						);

																						API.deletePrioritasByUserID(
																							e.user_id
																						);

																						API.deleteWargaByUserID(
																							e.user_id
																						);

																						API.deleteUserByUserID(
																							e.user_id
																						);
																					}

																					await swal(
																						"Data berhasil dihapus!",
																						{
																							icon: "success",
																						}
																					);
																					getAllUser();
																				}
																			);
																		}
																	}
																});
															}}
														>
															<RiDeleteBin6Line />
														</Button>
													</td>
												</tr>
											);
										}
										return null;
									})}
							</tbody>
						</table>
						<div className="show_length_data_user">
							<p>Liat baris: </p>
							<FormControl>
								<Select
									id="user_data_length"
									value={dataUserLength}
									onChange={(e) => {
										setDataUserLength(e.target.value);
									}}
								>
									<MenuItem value={5}>5</MenuItem>
									<MenuItem value={10}>10</MenuItem>
									<MenuItem value={20}>20</MenuItem>
									<MenuItem value={50}>50</MenuItem>
								</Select>
							</FormControl>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;
