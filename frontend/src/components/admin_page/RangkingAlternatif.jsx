// styling component linked in rangking.scss file

import React, { useState, useEffect } from "react";

// API storage
import API from "../../api";

// npm packages
import { TextField, Button, CircularProgress } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const RangkingAlternatif = () => {
	const [rangking, setRangking] = useState(null);
	const [cariRangking, setCariRangking] = useState("");

	const [isLoadContent, setIsLoadContent] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		document.title = "Rangking Alternatif Bantuan Sosial";
		API.getWargaByBantuanIDAndSortByNilaiRangking(location.state).then(
			(res) => setRangking(res.data)
		);

		setTimeout(() => {
			setIsLoadContent(true);
		}, 2000);
	}, [location]);

	const highlightRole = (role) => {
		if (role === "pending")
			return <span className="role_pending">{role}</span>;
		else if (role === "diterima")
			return <span className="role_diterima">{role}</span>;

		return <span className="role_ditolak">{role}</span>;
	};

	return (
		<div>
			{isLoadContent ? (
				<div className="container_rangking">
					<div className="head_rangking">
						<h2>Basoma</h2>
					</div>
					<div className="content_rangking">
						<div className="flex_element_rangking">
							<TextField
								label="Cari data berdasarkan nama"
								name="cari_rangking"
								variant="outlined"
								sx={{ width: "30%" }}
								onChange={(e) => setCariRangking(e.target.value)}
								autoComplete="off"
							/>
						</div>
						<div className="rangking_alternatif">
							<table className="tbl_class">
								<thead className="tbl_class_head">
									<tr>
										<th>Rangking</th>
										<th>NIK</th>
										<th>Nama lengkap</th>
										<th>Hasil akhir</th>
										<th>Status</th>
										<th>Aksi</th>
									</tr>
								</thead>
								<tbody className="tbl_class_body">
									{rangking &&
										rangking.map((e, i) => {
											if (
												e.nama_lengkap
													.toLowerCase()
													.includes(cariRangking)
											) {
												return (
													<tr key={i}>
														<td>{i + 1}</td>
														<td>{e.no_ktp}</td>
														<td>{e.nama_lengkap}</td>
														<td>{`${e.nilai_rangking}%`}</td>
														<td>
															{highlightRole(
																e.status_penerimaan
															)}
														</td>
														<td>
															<Button
																variant="contained"
																className="btn_detail_rangking"
																onClick={() => {
																	navigate("/warga-detail", {
																		state: {
																			ui: e.no_ktp,
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
				</div>
			) : (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh",
					}}
				>
					<CircularProgress />
				</div>
			)}
		</div>
	);
};

export default RangkingAlternatif;
