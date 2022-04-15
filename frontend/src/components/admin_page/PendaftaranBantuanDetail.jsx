// styling component linked in pendaftaran_bantuan_detail.scss file

import React, { useState, useEffect } from "react";

// API storage
import API from "../../api";

// npm packages
import { TextField, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { RiHistoryFill } from "react-icons/ri";

const PendaftaranBantuanDetail = () => {
	const [pendaftaranBantuanByUserID, setPendaftaranBantuanByUserID] =
		useState(null);
	// const [survey, setSurvey] = useState(null);
	const [searchDataPendaftaran, setSearchDataPendaftaran] = useState("");

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		API.getWargaByBantuanID(location.state.id_bantuan).then((res) =>
			setPendaftaranBantuanByUserID(res.data)
		);
		// API.getSurveyByNoKK().then((res) => {
		// 	setSurvey(res.data);
		// });
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
							variant="contained"
							onClick={() => {
								navigate("/history_kebijakan");
							}}
						>
							<RiHistoryFill size={25} />
						</Button>
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
								{/* <th>Hasil rekomendasi</th> */}
								<th>Status</th>
								<th>Aksi</th>
							</tr>
						</thead>
						<tbody className="tbl_class_body">
							{pendaftaranBantuanByUserID &&
								pendaftaranBantuanByUserID.map((e, i) => {
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
												{/* <td>{survey[0].nilai_rekomendasi}%</td> */}
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
				</div>
			</div>
			{/* Akhir bantuan admin content */}
		</div>
	);
};

export default PendaftaranBantuanDetail;
