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
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";

const HistoryKebijakan = () => {
	const [history, setHistory] = useState(null);
	const [user, setUser] = useState(null);
	const [warga, setWarga] = useState(null);
	const [historyUserID, setHistoryUserID] = useState(null);
	const [historyNoKK, setHistoryNoKK] = useState(null);
	const [historyKet, setHistoryKet] = useState(null);

	useEffect(() => {
		document.title = "History Kebijakan Bantuan";
		API.getAllHistoryKebijakan().then((res) => {
			setHistory(res.data);
		});
		API.getAllUser().then((res) => {
			setUser(res.data);
		});
		API.getAllWarga().then((res) => {
			setWarga(res.data);
		});
	}, []);

	return (
		<div className="history_kebijakan">
			<div className="logo_app">
				<h2>Basoma</h2>
			</div>
			<div className="content">
				<h3>History kebijakan bantuan</h3>
				{history &&
					// coba pakai for untuk dptin loop user_id dan check duplicates values
					history.map((e, i) => {
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
									onClick={() => {
										setHistoryUserID(e.user_id);
										setHistoryNoKK(e.no_kk);
										setHistoryKet(e.keterangan);
									}}
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
											{user &&
												user.map((e, i) => {
													if (e.user_id === historyUserID) {
														return (
															<div
																className="profile_user"
																key={i}
															>
																<div className="foto">
																	<Avatar
																		alt="Foto Profile"
																		src={
																			e.gambar
																				? e.gambar ===
																				  "default_img.svg"
																					? `http://localhost:5000/public/${e.gambar}`
																					: `http://localhost:5000/public/user/${e.gambar}`
																				: "blank_img.png"
																		}
																	/>
																</div>
																<div className="data_diri">
																	<div className="nm_lengkap">
																		{e.nm_depan}{" "}
																		{e.nm_belakang}
																	</div>
																	<div className="jabatan">
																		{e.role}
																	</div>
																</div>
															</div>
														);
													}

													return null;
												})}
										</div>

										<div className="ket_history">
											<p>Keterangan</p>
											<TextField
												name="keterangan"
												variant="outlined"
												defaultValue={historyKet}
												className="text_keterangan"
												disabled={true}
												fullWidth
												multiline
												rows={3}
											/>
										</div>

										<div className="changer_history">
											<div className="table_history" key={i}>
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
														{warga &&
															warga.map((e, i) => {
																if (e.no_kk === historyNoKK) {
																	return (
																		<tr key={i}>
																			<td>{e.no_kk}</td>
																			<td>{e.no_ktp}</td>
																			<td>
																				{e.nama_lengkap}
																			</td>
																			<td>{e.alamat}</td>
																			<td>{e.no_telepon}</td>
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
								</AccordionDetails>
							</Accordion>
						);
					})}
			</div>
		</div>
	);
};

export default HistoryKebijakan;
