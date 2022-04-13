import React, { useState, useEffect } from "react";

// API storage
import API from "./../../api";

// npm packages
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const PendaftaranBantuanPetugasDetail = () => {
	const [wargaByBantuanID, SetWargaByBantuanID] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		document.title = "Pendaftaran Bantuan Petugas Detail";
		getWargaByBantuanID();
	}, []);

	const getWargaByBantuanID = async () => {
		const response = await API.getWargaByBantuanID(location.state.id_bantuan);
		SetWargaByBantuanID(response.data);
	};

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
					<div className="add_bantuan_flex">
						{/* cari bantuan section */}
						{/* <TextField
									label="Cari Data"
									name="nm_depan"
									variant="outlined"
									sx={{ width: "30%" }}
									onChange={handleChange}
									autoComplete="off"
									className="inp_cari"
								/> */}
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
								wargaByBantuanID.map((e, i) => {
									return (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{e.nama_lengkap}</td>
											<td>{e.alamat}</td>
											<td>{e.no_telepon}</td>
											<td>{highlightRole(e.status_rekomendasi)}</td>
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
								})}
						</tbody>
					</table>
				</div>
			</div>
			{/* Akhir bantuan admin content */}
		</div>
	);
};

export default PendaftaranBantuanPetugasDetail;
