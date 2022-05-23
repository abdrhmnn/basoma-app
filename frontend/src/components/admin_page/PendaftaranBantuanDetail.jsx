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
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { RiHistoryFill } from "react-icons/ri";
import { GoTasklist } from "react-icons/go";
import swal from "sweetalert";

const PendaftaranBantuanDetail = () => {
	const [pendaftaranBantuanByUserID, setPendaftaranBantuanByUserID] =
		useState(null);
	const [searchDataPendaftaran, setSearchDataPendaftaran] = useState("");
	const [dataPendaftaranLength, setDataPendaftaranLength] = useState(10);
	const [pemberitahuan, setPemberitahuan] = useState(null);

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
									text: "Jika iya, maka daftar warga sudah tidak bisa diubah lagi!",
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
													"layak"
												);
											} else {
												API.savePemberitahuan(
													pemberitahuanLoop++,
													pendaftaranBantuanByUserID[i].user_id,
													"tidak layak"
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
						<Button
							variant="outlined"
							color="secondary"
							onClick={() => {
								navigate("/history_kebijakan");
							}}
							className="btn_history_kebijakan"
						>
							<RiHistoryFill size={29} />
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
