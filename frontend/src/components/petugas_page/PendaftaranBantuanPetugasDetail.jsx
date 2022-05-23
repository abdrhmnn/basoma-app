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
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const PendaftaranBantuanPetugasDetail = () => {
	const [wargaByBantuanID, setWargaByBantuanID] = useState(null);
	const [valueCari, setValueCari] = useState("");
	const [dataVerifikasiLength, setDataVerifikasiLength] = useState(10);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		document.title = "Pendaftaran Bantuan Petugas Detail";
		API.getWargaByBantuanID(location.state.id_bantuan).then((res) => {
			setWargaByBantuanID(res.data);
		});
	}, [location]);

	const highlightRole = (role) => {
		if (role === "pending")
			return <span className="role_pending">{role}</span>;
		else if (role === "memenuhi")
			return <span className="role_memenuhi">{role}</span>;

		return <span className="role_tidak_memenuhi">{role}</span>;
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
							sx={{ width: "30%" }}
							onChange={(e) => {
								setValueCari(e.target.value);
							}}
							autoComplete="off"
						/>
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
													<td>{e.nama_lengkap}</td>
													<td>{e.alamat}</td>
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
