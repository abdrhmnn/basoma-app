// styling component linked in user_page.scss file

import React, { useState, useEffect } from "react";

// components
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

// API storage
import API from "../../api";

// npm packages
import { jsPDF } from "jspdf";
import { Button } from "@mui/material";
import "jspdf-autotable";
import ReactExport from "react-export-excel";
import swal from "sweetalert";
import { RiDeleteBin6Line, RiAdminLine } from "react-icons/ri";
import { TextField, FormControl, Select, MenuItem } from "@mui/material";

const User = () => {
	const [user, setUser] = useState([]);
	const [valueCari, setValueCari] = useState("");
	const [dataUserLength, setDataUserLength] = useState(5);
	const [warga, setWarga] = useState(null);
	const [bantuan, setBantuan] = useState(null);

	const ExcelFile = ReactExport.ExcelFile;
	const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
	const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

	useEffect(() => {
		document.title = "Kelola User";
		getAllUser();
		getAllWarga();
		getAllBantuan();
	}, []);

	const dataSetUser = user.map((e, i) => {
		return {
			nm_depan: e.nm_depan,
			nm_belakang: e.nm_belakang,
			username: e.username,
		};
	});

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

	const handleChange = (e) => {
		setValueCari(e.target.value);
	};

	const generatePdf = () => {
		var doc = new jsPDF({ orientation: "p" });
		doc.text("Data User Basoma", 80, 20);
		doc.autoTable({
			head: [["No", "Nama Depan", "Nama Belakang", "Username"]],
			body: user.map((e, i) => {
				return [i + 1, e.nm_depan, e.nm_belakang, e.username];
			}),
			startY: 30,
		});
		doc.save("data_user.pdf");
	};

	const highlightRole = (role) => {
		if (role === "admin") return <span className="role_admin">{role}</span>;

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
							<div className="btn_export_user">
								<Button
									variant="contained"
									className="generate_pdf_user"
									onClick={generatePdf}
								>
									Cetak ke PDF
								</Button>
								<ExcelFile
									element={
										<Button
											variant="contained"
											className="generate_excel_user"
										>
											Cetak ke Excel
										</Button>
									}
									filename="data_user"
								>
									<ExcelSheet data={dataSetUser} name="dataUser">
										<ExcelColumn
											label="Nama Depan"
											value="nm_depan"
										/>
										<ExcelColumn
											label="Nama Belakang"
											value="nm_belakang"
										/>
										<ExcelColumn label="Username" value="username" />
									</ExcelSheet>
								</ExcelFile>
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
									user.slice(0, dataUserLength).map((e, i) => {
										const stringData =
											e.nm_depan + e.nm_belakang + e.username;

										if (
											stringData.toLowerCase().includes(valueCari)
										) {
											return (
												<tr key={i}>
													<td>{i + 1}</td>
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
																		if (
																			e.gambar !==
																			"default_img.svg"
																		) {
																			API.deleteImgUser(
																				e.gambar
																			);
																		}

																		warga.map((data, i) => {
																			if (
																				data.user_id ===
																				e.user_id
																			) {
																				API.deleteImgKTP_User(
																					data.foto_ktp
																				);

																				API.deleteImgBangunan_User(
																					data.foto_bangunan_rumah
																				);
																			}

																			if (
																				data.user_id ===
																					e.user_id &&
																				data.status_penerimaan ===
																					"diterima"
																			) {
																				bantuan.map(
																					(
																						dataBantuan,
																						i
																					) => {
																						if (
																							data.kd_bantuan ===
																							dataBantuan.kd_bantuan
																						) {
																							API.updateKapasitasBantuan(
																								data.kd_bantuan,
																								parseInt(
																									dataBantuan.kapasitas
																								) + 1
																							);
																						}

																						return null;
																					}
																				);
																			}

																			return null;
																		});

																		API.deleteMasukanByUserID(
																			e.user_id
																		);

																		API.deletePemberitahuanByUserID(
																			e.user_id
																		);

																		API.deletePrioritasByUserID(
																			e.user_id
																		);

																		API.deleteAlternatifByUserID(
																			e.user_id
																		);

																		API.deleteWargaByUserID(
																			e.user_id
																		);

																		API.deleteUserByUserID(
																			e.user_id
																		).then((res) => {
																			swal(
																				"Data berhasil dihapus!",
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
