// styling component linked in pendaftaran_bantuan_detail.scss file

import React, { useState, useEffect } from "react";

// components
import NavbarAdmin from "./NavbarAdmin";
import HeaderAdmin from "./HeaderAdmin";

// API storage
import API from "../../api";

// npm packages
import {
	TextField,
	Button,
	FormControl,
	Select,
	MenuItem,
	Alert,
	Snackbar,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const PendaftaranBantuanDetail = () => {
	const [pendaftaranBantuanByUserID, setPendaftaranBantuanByUserID] =
		useState(null);
	const [searchDataPendaftaran, setSearchDataPendaftaran] = useState("");
	const [dataPendaftaranLength, setDataPendaftaranLength] = useState(5);

	const [isOpenSnackbar, setIsOpenSnackbar] = useState(true);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		API.getWargaByBantuanID(location.state.id_bantuan).then((res) =>
			setPendaftaranBantuanByUserID(res.data)
		);
	}, [location]);

	const handleChange = (e) => {
		setSearchDataPendaftaran(e.target.value);
	};

	const highlightRole = (role) => {
		if (role === "pending")
			return <span className="role_pending">{role}</span>;
		else if (role === "diterima")
			return <span className="role_diterima">{role}</span>;

		return <span className="role_ditolak">{role}</span>;
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		location.state.alert_penerimaan = false;
		setIsOpenSnackbar(false);
	};

	return (
		<div style={{ display: "flex" }}>
			<NavbarAdmin />
			<div className="flex_header_admin">
				<HeaderAdmin />
				<div className="content_dashboard_admin">
					<h2>Data Pendaftaran Bantuan</h2>
					{location.state.alert_penerimaan ? (
						<Snackbar
							open={isOpenSnackbar}
							autoHideDuration={4000}
							onClose={handleCloseSnackbar}
						>
							<Alert
								onClose={handleCloseSnackbar}
								severity="info"
								variant="filled"
							>
								Status penerimaan berhasil diperbarui!
							</Alert>
						</Snackbar>
					) : null}
					<div className="wrap_tbl_pendaftaran_bantuan_detail">
						<div className="flex_element_pendaftaran_bantuan_detail">
							<TextField
								label="Cari data berdasarkan nama"
								name="cari_pendaftaran"
								variant="outlined"
								sx={{ width: "30%" }}
								onChange={handleChange}
								autoComplete="off"
							/>
							<div className="rekomendasi_alternatif">
								<Button
									variant="contained"
									className="rekomendasi_alternatif"
									onClick={() => {
										navigate("/rangking", {
											state: location.state.id_bantuan,
										});
									}}
								>
									Rekomendasi
								</Button>
							</div>
						</div>
						<table className="tbl_class">
							<thead className="tbl_class_head">
								<tr>
									<th>NIK</th>
									<th>Nama lengkap</th>
									<th>Pekerjaan</th>
									<th>Pendidikan terakhir</th>
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
														<td>{e.no_ktp}</td>
														<td>{e.nama_lengkap}</td>
														<td>{e.pekerjaan}</td>
														<td>{e.pendidikan}</td>
														<td>
															{highlightRole(
																e.status_penerimaan
															)}
														</td>
														<td>
															<Button
																variant="contained"
																className="btn_detail_pendaftaran"
																onClick={() => {
																	navigate("/warga-detail", {
																		state: {
																			ui: e.no_ktp,
																			uid: e.user_id,
																			bi: e.id_bantuan,
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
						<div className="show_length_data_pendaftaran">
							<p>Liat baris: </p>
							<FormControl>
								<Select
									id="pendaftaran_data_length"
									value={dataPendaftaranLength}
									onChange={(e) => {
										setDataPendaftaranLength(e.target.value);
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

export default PendaftaranBantuanDetail;
