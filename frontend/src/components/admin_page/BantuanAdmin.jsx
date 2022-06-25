// styling component linked in kelola_bantuan_page.scss file

import React, { useState, useEffect } from "react";

// components
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

// API storage
import API from "../../api";

// npm packages
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { TextField, Button, Menu, MenuItem } from "@mui/material";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsPrinter } from "react-icons/bs";

const BantuanAdmin = () => {
	const [bantuan, setBantuan] = useState([]);
	const [valueCari, setValueCari] = useState("");

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Kelola Bantuan";
		getAllBantuan();
	}, []);

	const getAllBantuan = async () => {
		const response = await API.getAllBantuan();
		setBantuan(response.data);
	};

	const handleChange = (e) => {
		setValueCari(e.target.value);
	};

	const generatePdf = () => {
		const today = new Date();
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
		doc.setFontSize(12);
		doc.setFont("helvetica", "normal");
		doc.text("Daftar Bantuan Sosial", 85, 53);
		doc.setFontSize(11);
		doc.text(
			`Tanggal cetak : ${today.getDate()} - 0${
				today.getMonth() + 1
			} - ${today.getFullYear()}`,
			13,
			64
		);

		doc.autoTable({
			head: [["No", "Nama", "Alamat"]],
			body: bantuan.map((e, i) => {
				return [`${i + 1}.`, e.nama, e.alamat];
			}),
			startY: 69,
			margin: {
				left: 12,
				right: 12,
			},
			theme: "grid",
			columnStyles: {
				0: { halign: "center" },
				1: { halign: "center" },
				2: { halign: "left" },
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
		<div style={{ display: "flex" }}>
			<NavbarAdmin />
			<div className="flex_header_admin">
				<HeaderAdmin />
				<div className="content_dashboard_admin">
					<h2>Data Bantuan</h2>

					{/* Bantuan admin content */}
					<div className="wrap_tbl_bantuan">
						{/* Flex element tambah, cari dan export bantuan */}
						<div className="flex_element_bantuan">
							<div className="add_bantuan_flex">
								<Button
									variant="contained"
									className="btn_add_bantuan"
									component={Link}
									to="/tambah-bantuan"
								>
									<AiOutlinePlusSquare size={35} />
								</Button>

								{/* cari bantuan section */}
								<TextField
									label="Cari Data"
									name="nm_depan"
									variant="outlined"
									sx={{ width: "30%" }}
									onChange={handleChange}
									autoComplete="off"
									className="inp_cari"
								/>
							</div>
							{/* export bantuan section */}
							<div className="print_data_bantuan">
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
							{/* akhir export bantuan section */}
						</div>
						{/* Akhir flex tambah, cari dan export bantuan */}

						<table className="tbl_class">
							<thead className="tbl_class_head">
								<tr>
									<th>No</th>
									<th>Nama</th>
									<th>Alamat</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody className="tbl_class_body">
								{bantuan.map((e, i) => {
									if (e.nama.toLowerCase().includes(valueCari)) {
										return (
											<tr key={i}>
												<td>{i + 1}.</td>
												<td>{e.nama}</td>
												<td>{e.alamat}</td>
												<td>
													{/* btn edit */}
													<Button
														variant="contained"
														className="btn_edit_bantuan"
														sx={{ mr: 2 }}
														onClick={() => {
															navigate("/edit-bantuan", {
																state: e.id_bantuan,
															});
														}}
													>
														<RiEditLine />
													</Button>
													{/* akhir btn edit */}

													{/* btn delete */}
													<Button
														variant="contained"
														className="btn_delete_bantuan"
														onClick={() => {
															swal({
																title: "Yakin ingin hapus data?",
																text: "Jika iya, maka data tidak bisa dikembalikan lagi!",
																icon: "warning",
																buttons: ["Tidak", "Yakin"],
																dangerMode: true,
															}).then((willDelete) => {
																if (willDelete) {
																	API.deleteImgBantuan(
																		e.banner
																	);
																	API.deleteWargaByBantuanID(
																		e.id_bantuan
																	);
																	API.deleteBantuanByID(
																		e.id_bantuan
																	).then((res) => {
																		swal(
																			"Data berhasil dihapus!",
																			{
																				icon: "success",
																			}
																		);
																		getAllBantuan();
																	});
																}
															});
														}}
													>
														<RiDeleteBin6Line />
													</Button>
													{/* akhir btn delete */}
												</td>
											</tr>
										);
									}
									return null;
								})}
							</tbody>
						</table>
					</div>
					{/* Akhir bantuan admin content */}
				</div>
			</div>
		</div>
	);
};

export default BantuanAdmin;
