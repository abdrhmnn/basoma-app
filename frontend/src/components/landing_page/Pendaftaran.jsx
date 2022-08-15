// styling component linked in pendaftaran.scss file

import React, { useState, useEffect } from "react";

// API storage
import API from "../../api";

// Cookie storage
import kuki from "../../kuki";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";

// npm packages
import {
	TextField,
	Button,
	FormControl,
	Select,
	MenuItem,
	CircularProgress,
} from "@mui/material";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import SuccessUpdatePendaftaran from "./SuccessUpdatePendaftaran";

const Pendaftaran = () => {
	const [wargaByUserID, setWargaByUserID] = useState(null);
	const [kriteria, setKriteria] = useState(null);
	const [survey, setSurvey] = useState(null);
	const [history, setHistory] = useState(null);
	const [jawaban, setJawaban] = useState(null);
	const [isLoadContent, setIsLoadContent] = useState(false);
	const [isSuccessUpdate, setIsSuccessUpdate] = useState(false);

	// state for change disable status data diri
	const [disableStatus1, setDisableStatus1] = useState(true);
	const [disableStatus2, setDisableStatus2] = useState(true);
	const [disableStatus3, setDisableStatus3] = useState(true);
	const [disableStatus4, setDisableStatus4] = useState(true);
	const [disableStatus5, setDisableStatus5] = useState(true);

	// state for catch updated status data diri
	const [updateStatus1, setUpdateStatus1] = useState("");
	const [updateStatus2, setUpdateStatus2] = useState("");
	const [updateStatus3, setUpdateStatus3] = useState("");
	const [updateStatus4, setUpdateStatus4] = useState("");
	const [updateStatus5, setUpdateStatus5] = useState("");

	// state for change disable status kondisi
	const [disableKondisi1, setDisableKondisi1] = useState(true);
	const [disableKondisi2, setDisableKondisi2] = useState(true);
	const [disableKondisi3, setDisableKondisi3] = useState(true);
	const [disableKondisi4, setDisableKondisi4] = useState(true);
	const [disableKondisi5, setDisableKondisi5] = useState(true);
	const [disableKondisi6, setDisableKondisi6] = useState(true);
	const [disableKondisi7, setDisableKondisi7] = useState(true);
	const [disableKondisi8, setDisableKondisi8] = useState(true);
	const [disableKondisi9, setDisableKondisi9] = useState(true);
	const [disableKondisi10, setDisableKondisi10] = useState(true);
	const [disableKondisi11, setDisableKondisi11] = useState(true);

	// state for catch updated status kondisi
	const [updateKondisi1, setUpdateKondisi1] = useState("");
	const [updateKondisi2, setUpdateKondisi2] = useState("");
	const [updateKondisi3, setUpdateKondisi3] = useState("");
	const [updateKondisi4, setUpdateKondisi4] = useState("");
	const [updateKondisi5, setUpdateKondisi5] = useState("");
	const [updateKondisi6, setUpdateKondisi6] = useState("");
	const [updateKondisi7, setUpdateKondisi7] = useState("");
	const [updateKondisi8, setUpdateKondisi8] = useState("");
	const [updateKondisi9, setUpdateKondisi9] = useState("");
	const [updateKondisi10, setUpdateKondisi10] = useState("");
	const [updateKondisi11, setUpdateKondisi11] = useState("");

	useEffect(() => {
		document.title = "Pendaftaran Bantuan";
		getWargaByUserID();
		getAllKriteria();
		getAllJawaban();
		getAllSurvey();
		getAllHistory();

		setTimeout(() => {
			setIsLoadContent(true);
		}, 2000);
	}, []);

	const getWargaByUserID = async () => {
		const response = await API.getWargaByUserID(kuki.get("user_id"));
		setWargaByUserID(response.data);
	};

	const getAllKriteria = async () => {
		const response = await API.getAllKriteria();
		setKriteria(response.data);
	};

	const getAllJawaban = async () => {
		const response = await API.getPrioritasByUserIDandIdentitasPilihan(
			kuki.get("user_id")
		);
		setJawaban(response.data);
	};

	const getAllSurvey = async () => {
		const response = await API.getAllSurvey();
		setSurvey(response.data);
	};

	const getAllHistory = async () => {
		const response = await API.getAllHistoryKebijakan();
		setHistory(response.data);
	};

	return (
		<div>
			<Navbar />

			{isLoadContent ? (
				wargaByUserID &&
				kriteria &&
				jawaban &&
				survey &&
				history && (
					<div className="pendaftaran">
						{isSuccessUpdate ? (
							<SuccessUpdatePendaftaran />
						) : (
							<div>
								<h1>Data Diri</h1>
								<div className="data_diri_update">
									<div className="no_kk_update">
										<div className="txt_field no_margin">
											<p>Nomor kartu keluarga</p>
											<TextField
												name="no_kk_update"
												variant="outlined"
												fullWidth
												defaultValue={`${wargaByUserID.no_kk}`}
												disabled={disableStatus1}
												onChange={(e) => {
													setUpdateStatus1(e.target.value);
												}}
											/>
										</div>
										<div className="btn_update_warga">
											<Button
												variant="outlined"
												color="success"
												onClick={() => {
													setDisableStatus1(!disableStatus1);
												}}
											>
												{disableStatus1 ? (
													<BiMessageSquareEdit size={29} />
												) : (
													<MdOutlineCancel size={29} />
												)}
											</Button>
										</div>
									</div>
									<div className="no_ktp_update">
										<div className="txt_field">
											<p>Nomor kartu tanda penduduk</p>
											<TextField
												name="no_ktp_update"
												variant="outlined"
												fullWidth
												defaultValue={`${wargaByUserID.no_ktp}`}
												disabled={disableStatus2}
												onChange={(e) => {
													setUpdateStatus2(e.target.value);
												}}
											/>
										</div>
										<div className="btn_update_warga">
											<Button
												variant="outlined"
												color="success"
												onClick={() => {
													setDisableStatus2(!disableStatus2);
												}}
											>
												{disableStatus2 ? (
													<BiMessageSquareEdit size={29} />
												) : (
													<MdOutlineCancel size={29} />
												)}
											</Button>
										</div>
									</div>
									<div className="nama_lengkap_update">
										<div className="txt_field">
											<p>Nama lengkap</p>
											<TextField
												name="nama_lengkap_update"
												variant="outlined"
												fullWidth
												defaultValue={`${wargaByUserID.nama_lengkap}`}
												disabled={disableStatus3}
												onChange={(e) => {
													setUpdateStatus3(e.target.value);
												}}
											/>
										</div>
										<div className="btn_update_warga">
											<Button
												variant="outlined"
												color="success"
												onClick={() => {
													setDisableStatus3(!disableStatus3);
												}}
											>
												{disableStatus3 ? (
													<BiMessageSquareEdit size={29} />
												) : (
													<MdOutlineCancel size={29} />
												)}
											</Button>
										</div>
									</div>
									<div className="alamat_lengkap_update">
										<div className="txt_field">
											<p>Alamat lengkap</p>
											<TextField
												name="alamat_update"
												variant="outlined"
												fullWidth
												defaultValue={`${wargaByUserID.alamat}`}
												disabled={disableStatus4}
												onChange={(e) => {
													setUpdateStatus4(e.target.value);
												}}
											/>
										</div>
										<div className="btn_update_warga">
											<Button
												variant="outlined"
												color="success"
												onClick={() => {
													setDisableStatus4(!disableStatus4);
												}}
											>
												{disableStatus4 ? (
													<BiMessageSquareEdit size={29} />
												) : (
													<MdOutlineCancel size={29} />
												)}
											</Button>
										</div>
									</div>
									<div className="no_telepon_update">
										<div className="txt_field">
											<p>Nomor telepon</p>
											<TextField
												name="no_telepon_update"
												variant="outlined"
												fullWidth
												defaultValue={`${wargaByUserID.no_telepon}`}
												disabled={disableStatus5}
												onChange={(e) => {
													setUpdateStatus5(e.target.value);
												}}
											/>
										</div>
										<div className="btn_update_warga">
											<Button
												variant="outlined"
												color="success"
												onClick={() => {
													setDisableStatus5(!disableStatus5);
												}}
											>
												{disableStatus5 ? (
													<BiMessageSquareEdit size={29} />
												) : (
													<MdOutlineCancel size={29} />
												)}
											</Button>
										</div>
									</div>
								</div>

								<h1>Pendaftaran Kondisi</h1>
								<div className="kondisi_warga_update">
									<div className="pertanyaan_jawaban">
										{/* pertanyaan 1 */}
										<div className="pertanyaan">
											<p>Pertanyaan</p>
											<TextField
												name="pertanyaan"
												variant="outlined"
												fullWidth
												defaultValue={`${kriteria[0].pertanyaan}`}
												disabled={true}
												multiline
												rows={2}
											/>
										</div>
										<div className="wrap_flex_update_jawaban">
											<div className="jawaban">
												<p>Jawaban</p>
												<FormControl fullWidth>
													<Select
														sx={{ minHeight: 78 }}
														labelId="jawaban"
														id="jawaban"
														value={
															updateKondisi1 === ""
																? jawaban[0].pilihan
																: updateKondisi1
														}
														disabled={disableKondisi1}
														onChange={(e) => {
															setUpdateKondisi1(e.target.value);
														}}
													>
														<MenuItem value="Ya">Ya</MenuItem>
														<MenuItem value="Tidak">
															Tidak
														</MenuItem>
													</Select>
												</FormControl>
											</div>
											<div className="btn_update_kondisi_warga">
												<Button
													variant="outlined"
													color="success"
													onClick={() => {
														setDisableKondisi1(!disableKondisi1);
													}}
												>
													{disableKondisi1 ? (
														<BiMessageSquareEdit size={29} />
													) : (
														<MdOutlineCancel size={29} />
													)}
												</Button>
											</div>
										</div>
									</div>

									{/* pertanyaan 2 */}
									<div className="pertanyaan_jawaban">
										<div className="pertanyaan margin_atas">
											<p>Pertanyaan</p>
											<TextField
												name="pertanyaan"
												variant="outlined"
												fullWidth
												defaultValue={`${kriteria[1].pertanyaan}`}
												disabled={true}
												multiline
												rows={2}
											/>
										</div>
										<div className="wrap_flex_update_jawaban">
											<div className="jawaban margin_atas">
												<p>Jawaban</p>
												<FormControl fullWidth>
													<Select
														sx={{ minHeight: 78 }}
														labelId="jawaban"
														id="jawaban"
														value={
															updateKondisi2 === ""
																? jawaban[1].pilihan
																: updateKondisi2
														}
														disabled={disableKondisi2}
														onChange={(e) => {
															setUpdateKondisi2(e.target.value);
														}}
													>
														<MenuItem value="Ya">Ya</MenuItem>
														<MenuItem value="Tidak">
															Tidak
														</MenuItem>
													</Select>
												</FormControl>
											</div>
											<div className="btn_update_kondisi_warga">
												<Button
													variant="outlined"
													color="success"
													onClick={() => {
														setDisableKondisi2(!disableKondisi2);
													}}
												>
													{disableKondisi2 ? (
														<BiMessageSquareEdit size={29} />
													) : (
														<MdOutlineCancel size={29} />
													)}
												</Button>
											</div>
										</div>
									</div>
									{/* pertanyaan 3 */}
									<div className="pertanyaan_jawaban">
										<div className="pertanyaan margin_atas">
											<p>Pertanyaan</p>
											<TextField
												name="pertanyaan"
												variant="outlined"
												fullWidth
												defaultValue={`${kriteria[2].pertanyaan}`}
												disabled={true}
												multiline
												rows={2}
											/>
										</div>
										<div className="wrap_flex_update_jawaban">
											<div className="jawaban margin_atas">
												<p>Jawaban</p>
												<FormControl fullWidth>
													<Select
														sx={{ minHeight: 78 }}
														labelId="jawaban"
														id="jawaban"
														value={
															updateKondisi3 === ""
																? jawaban[2].pilihan
																: updateKondisi3
														}
														disabled={disableKondisi3}
														onChange={(e) => {
															setUpdateKondisi3(e.target.value);
														}}
													>
														<MenuItem value="Ya">Ya</MenuItem>
														<MenuItem value="Tidak">
															Tidak
														</MenuItem>
													</Select>
												</FormControl>
											</div>
											<div className="btn_update_kondisi_warga">
												<Button
													variant="outlined"
													color="success"
													onClick={() => {
														setDisableKondisi3(!disableKondisi3);
													}}
												>
													{disableKondisi3 ? (
														<BiMessageSquareEdit size={29} />
													) : (
														<MdOutlineCancel size={29} />
													)}
												</Button>
											</div>
										</div>
									</div>
									{/* pertanyaan 4 */}
									<div className="pertanyaan_jawaban">
										<div className="pertanyaan margin_atas">
											<p>Pertanyaan</p>
											<TextField
												name="pertanyaan"
												variant="outlined"
												fullWidth
												defaultValue={`${kriteria[3].pertanyaan}`}
												disabled={true}
												multiline
												rows={2}
											/>
										</div>
										<div className="wrap_flex_update_jawaban">
											<div className="jawaban margin_atas">
												<p>Jawaban</p>
												<FormControl fullWidth>
													<Select
														sx={{ minHeight: 78 }}
														labelId="jawaban"
														id="jawaban"
														value={
															updateKondisi4 === ""
																? jawaban[3].pilihan
																: updateKondisi4
														}
														disabled={disableKondisi4}
														onChange={(e) => {
															setUpdateKondisi4(e.target.value);
														}}
													>
														<MenuItem value="Ya">Ya</MenuItem>
														<MenuItem value="Tidak">
															Tidak
														</MenuItem>
													</Select>
												</FormControl>
											</div>
											<div className="btn_update_kondisi_warga">
												<Button
													variant="outlined"
													color="success"
													onClick={() => {
														setDisableKondisi4(!disableKondisi4);
													}}
												>
													{disableKondisi4 ? (
														<BiMessageSquareEdit size={29} />
													) : (
														<MdOutlineCancel size={29} />
													)}
												</Button>
											</div>
										</div>
									</div>
									{/* pertanyaan 5 */}
									<div className="pertanyaan_jawaban">
										<div className="pertanyaan margin_atas">
											<p>Pertanyaan</p>
											<TextField
												name="pertanyaan"
												variant="outlined"
												fullWidth
												defaultValue={`${kriteria[4].pertanyaan}`}
												disabled={true}
												multiline
												rows={2}
											/>
										</div>
										<div className="wrap_flex_update_jawaban">
											<div className="jawaban margin_atas">
												<p>Jawaban</p>
												<FormControl fullWidth>
													<Select
														sx={{ minHeight: 78 }}
														labelId="jawaban"
														id="jawaban"
														value={
															updateKondisi5 === ""
																? jawaban[4].pilihan
																: updateKondisi5
														}
														disabled={disableKondisi5}
														onChange={(e) => {
															setUpdateKondisi5(e.target.value);
														}}
													>
														<MenuItem value="Ya">Ya</MenuItem>
														<MenuItem value="Tidak">
															Tidak
														</MenuItem>
													</Select>
												</FormControl>
											</div>
											<div className="btn_update_kondisi_warga">
												<Button
													variant="outlined"
													color="success"
													onClick={() => {
														setDisableKondisi5(!disableKondisi5);
													}}
												>
													{disableKondisi5 ? (
														<BiMessageSquareEdit size={29} />
													) : (
														<MdOutlineCancel size={29} />
													)}
												</Button>
											</div>
										</div>
									</div>
									{/* pertanyaan 6 */}
									<div className="pertanyaan_jawaban">
										<div className="pertanyaan margin_atas">
											<p>Pertanyaan</p>
											<TextField
												name="pertanyaan"
												variant="outlined"
												fullWidth
												defaultValue={`${kriteria[5].pertanyaan}`}
												disabled={true}
												multiline
												rows={2}
											/>
										</div>
										<div className="wrap_flex_update_jawaban">
											<div className="jawaban margin_atas">
												<p>Jawaban</p>
												<FormControl fullWidth>
													<Select
														sx={{ minHeight: 78 }}
														labelId="jawaban"
														id="jawaban"
														value={
															updateKondisi6 === ""
																? jawaban[5].pilihan
																: updateKondisi6
														}
														disabled={disableKondisi6}
														onChange={(e) => {
															setUpdateKondisi6(e.target.value);
														}}
													>
														<MenuItem value="Ya">Ya</MenuItem>
														<MenuItem value="Tidak">
															Tidak
														</MenuItem>
													</Select>
												</FormControl>
											</div>
											<div className="btn_update_kondisi_warga">
												<Button
													variant="outlined"
													color="success"
													onClick={() => {
														setDisableKondisi6(!disableKondisi6);
													}}
												>
													{disableKondisi6 ? (
														<BiMessageSquareEdit size={29} />
													) : (
														<MdOutlineCancel size={29} />
													)}
												</Button>
											</div>
										</div>
									</div>
									{/* pertanyaan 7 */}
									<div className="pertanyaan_jawaban">
										<div className="pertanyaan margin_atas">
											<p>Pertanyaan</p>
											<TextField
												name="pertanyaan"
												variant="outlined"
												fullWidth
												defaultValue={`${kriteria[6].pertanyaan}`}
												disabled={true}
												multiline
												rows={2}
											/>
										</div>
										<div className="wrap_flex_update_jawaban">
											<div className="jawaban margin_atas">
												<p>Jawaban</p>
												<FormControl fullWidth>
													<Select
														sx={{ minHeight: 78 }}
														labelId="jawaban"
														id="jawaban"
														value={
															updateKondisi7 === ""
																? jawaban[6].pilihan
																: updateKondisi7
														}
														disabled={disableKondisi7}
														onChange={(e) => {
															setUpdateKondisi7(e.target.value);
														}}
													>
														<MenuItem value="Ya">Ya</MenuItem>
														<MenuItem value="Tidak">
															Tidak
														</MenuItem>
													</Select>
												</FormControl>
											</div>
											<div className="btn_update_kondisi_warga">
												<Button
													variant="outlined"
													color="success"
													onClick={() => {
														setDisableKondisi7(!disableKondisi7);
													}}
												>
													{disableKondisi7 ? (
														<BiMessageSquareEdit size={29} />
													) : (
														<MdOutlineCancel size={29} />
													)}
												</Button>
											</div>
										</div>
									</div>
									{/* pertanyaan 8 */}
									<div className="pertanyaan_jawaban">
										<div className="pertanyaan margin_atas">
											<p>Pertanyaan</p>
											<TextField
												name="pertanyaan"
												variant="outlined"
												fullWidth
												defaultValue={`${kriteria[7].pertanyaan}`}
												disabled={true}
												multiline
												rows={2}
											/>
										</div>
										<div className="wrap_flex_update_jawaban">
											<div className="jawaban margin_atas">
												<p>Jawaban</p>
												<FormControl fullWidth>
													<Select
														sx={{ minHeight: 78 }}
														labelId="jawaban"
														id="jawaban"
														value={
															updateKondisi8 === ""
																? jawaban[7].pilihan
																: updateKondisi8
														}
														disabled={disableKondisi8}
														onChange={(e) => {
															setUpdateKondisi8(e.target.value);
														}}
													>
														<MenuItem value="Ya">Ya</MenuItem>
														<MenuItem value="Tidak">
															Tidak
														</MenuItem>
													</Select>
												</FormControl>
											</div>
											<div className="btn_update_kondisi_warga">
												<Button
													variant="outlined"
													color="success"
													onClick={() => {
														setDisableKondisi8(!disableKondisi8);
													}}
												>
													{disableKondisi8 ? (
														<BiMessageSquareEdit size={29} />
													) : (
														<MdOutlineCancel size={29} />
													)}
												</Button>
											</div>
										</div>
									</div>
									{/* pertanyaan 9 */}
									<div className="pertanyaan_jawaban">
										<div className="pertanyaan margin_atas">
											<p>Pertanyaan</p>
											<TextField
												name="pertanyaan"
												variant="outlined"
												fullWidth
												defaultValue={`${kriteria[8].pertanyaan}`}
												disabled={true}
												multiline
												rows={2}
											/>
										</div>
										<div className="wrap_flex_update_jawaban">
											<div className="jawaban margin_atas">
												<p>Jawaban</p>
												<FormControl fullWidth>
													<Select
														sx={{ minHeight: 78 }}
														labelId="jawaban"
														id="jawaban"
														value={
															updateKondisi9 === ""
																? jawaban[8].pilihan
																: updateKondisi9
														}
														disabled={disableKondisi9}
														onChange={(e) => {
															setUpdateKondisi9(e.target.value);
														}}
													>
														<MenuItem value="Ya">Ya</MenuItem>
														<MenuItem value="Tidak">
															Tidak
														</MenuItem>
													</Select>
												</FormControl>
											</div>
											<div className="btn_update_kondisi_warga">
												<Button
													variant="outlined"
													color="success"
													onClick={() => {
														setDisableKondisi9(!disableKondisi9);
													}}
												>
													{disableKondisi9 ? (
														<BiMessageSquareEdit size={29} />
													) : (
														<MdOutlineCancel size={29} />
													)}
												</Button>
											</div>
										</div>
									</div>
									{/* pertanyaan 10 */}
									<div className="pertanyaan_jawaban">
										<div className="pertanyaan margin_atas">
											<p>Pertanyaan</p>
											<TextField
												name="pertanyaan"
												variant="outlined"
												fullWidth
												defaultValue={`${kriteria[9].pertanyaan}`}
												disabled={true}
												multiline
												rows={2}
											/>
										</div>
										<div className="wrap_flex_update_jawaban">
											<div className="jawaban margin_atas">
												<p>Jawaban</p>
												<FormControl fullWidth>
													<Select
														sx={{ minHeight: 78 }}
														labelId="jawaban"
														id="jawaban"
														value={
															updateKondisi10 === ""
																? jawaban[9].pilihan
																: updateKondisi10
														}
														disabled={disableKondisi10}
														onChange={(e) => {
															setUpdateKondisi10(e.target.value);
														}}
													>
														<MenuItem value="Ya">Ya</MenuItem>
														<MenuItem value="Tidak">
															Tidak
														</MenuItem>
													</Select>
												</FormControl>
											</div>
											<div className="btn_update_kondisi_warga">
												<Button
													variant="outlined"
													color="success"
													onClick={() => {
														setDisableKondisi10(
															!disableKondisi10
														);
													}}
												>
													{disableKondisi10 ? (
														<BiMessageSquareEdit size={29} />
													) : (
														<MdOutlineCancel size={29} />
													)}
												</Button>
											</div>
										</div>
									</div>
									{/* pertanyaan 11 */}
									<div className="pertanyaan_jawaban">
										<div className="pertanyaan margin_atas">
											<p>Pertanyaan</p>
											<TextField
												name="pertanyaan"
												variant="outlined"
												fullWidth
												defaultValue={`${kriteria[10].pertanyaan}`}
												disabled={true}
												multiline
												rows={2}
											/>
										</div>
										<div className="wrap_flex_update_jawaban">
											<div className="jawaban margin_atas">
												<p>Jawaban</p>
												<FormControl fullWidth>
													<Select
														sx={{ minHeight: 78 }}
														labelId="jawaban"
														id="jawaban"
														value={
															updateKondisi11 === ""
																? jawaban[10].pilihan
																: updateKondisi11
														}
														disabled={disableKondisi11}
														onChange={(e) => {
															setUpdateKondisi11(e.target.value);
														}}
													>
														<MenuItem value="Ya">Ya</MenuItem>
														<MenuItem value="Tidak">
															Tidak
														</MenuItem>
													</Select>
												</FormControl>
											</div>
											<div className="btn_update_kondisi_warga">
												<Button
													variant="outlined"
													color="success"
													onClick={() => {
														setDisableKondisi11(
															!disableKondisi11
														);
													}}
												>
													{disableKondisi11 ? (
														<BiMessageSquareEdit size={29} />
													) : (
														<MdOutlineCancel size={29} />
													)}
												</Button>
											</div>
										</div>
									</div>
									<Button
										variant="contained"
										color="success"
										fullWidth
										onClick={() => {
											const updateDataNoKK =
												updateStatus1 === ""
													? wargaByUserID.no_kk
													: updateStatus1;
											const updateDataNoKTP =
												updateStatus2 === ""
													? wargaByUserID.no_ktp
													: updateStatus2;
											const updateDataNama =
												updateStatus3 === ""
													? wargaByUserID.nama_lengkap
													: updateStatus3;
											const updateDataAlamat =
												updateStatus4 === ""
													? wargaByUserID.alamat
													: updateStatus4;
											const updateDataNoTlp =
												updateStatus5 === ""
													? wargaByUserID.no_telepon
													: updateStatus5;

											const jawabanKondisi1 =
												updateKondisi1 === ""
													? jawaban[0].pilihan
													: updateKondisi1;
											const jawabanKondisi2 =
												updateKondisi2 === ""
													? jawaban[1].pilihan
													: updateKondisi2;
											const jawabanKondisi3 =
												updateKondisi3 === ""
													? jawaban[2].pilihan
													: updateKondisi3;
											const jawabanKondisi4 =
												updateKondisi4 === ""
													? jawaban[3].pilihan
													: updateKondisi4;
											const jawabanKondisi5 =
												updateKondisi5 === ""
													? jawaban[4].pilihan
													: updateKondisi5;
											const jawabanKondisi6 =
												updateKondisi6 === ""
													? jawaban[5].pilihan
													: updateKondisi6;
											const jawabanKondisi7 =
												updateKondisi7 === ""
													? jawaban[6].pilihan
													: updateKondisi7;
											const jawabanKondisi8 =
												updateKondisi8 === ""
													? jawaban[7].pilihan
													: updateKondisi8;
											const jawabanKondisi9 =
												updateKondisi9 === ""
													? jawaban[8].pilihan
													: updateKondisi9;
											const jawabanKondisi10 =
												updateKondisi10 === ""
													? jawaban[9].pilihan
													: updateKondisi10;
											const jawabanKondisi11 =
												updateKondisi11 === ""
													? jawaban[10].pilihan
													: updateKondisi11;

											const jawabanArrKondisi = [];
											jawabanArrKondisi.push(
												jawabanKondisi1,
												jawabanKondisi2,
												jawabanKondisi3,
												jawabanKondisi4,
												jawabanKondisi5,
												jawabanKondisi6,
												jawabanKondisi7,
												jawabanKondisi8,
												jawabanKondisi9,
												jawabanKondisi10,
												jawabanKondisi11
											);

											for (let i = 0; i < jawaban.length; i++) {
												if (
													jawaban[i].user_id ===
													kuki.get("user_id")
												) {
													API.updatePrioritas(i, {
														pilihan: jawabanArrKondisi[i],
													});
												}
											}

											for (let i = 0; i < survey.length; i++) {
												if (
													survey[i].no_kk === wargaByUserID.no_kk
												) {
													API.deleteSurveyByNoKK(
														wargaByUserID.no_kk
													);
												}
											}

											for (let i = 0; i < history.length; i++) {
												if (
													history[i].no_kk === wargaByUserID.no_kk
												) {
													API.deleteHistoryByNoKK(
														wargaByUserID.no_kk
													);
												}
											}

											API.deletePemberitahuanByUserID(
												kuki.get("user_id")
											);

											API.updateWargaByUserID(kuki.get("user_id"), {
												no_kk: updateDataNoKK,
												no_ktp: updateDataNoKTP,
												nama_lengkap: updateDataNama,
												alamat: updateDataAlamat,
												no_telepon: updateDataNoTlp
											}).then(() => {
												setIsSuccessUpdate(true);
											});
										}}
										sx={{
											fontWeight: "bold",
											marginTop: "40px",
											padding: "8px",
										}}
									>
										simpan
									</Button>
								</div>
							</div>
						)}
						{/* Component pendaftaran content */}

						{/* Akhir component pendaftaran content */}
					</div>
				)
			) : (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "80vh",
					}}
				>
					<CircularProgress />
				</div>
			)}

			<Footer class_about="about_foot" />
		</div>
	);
};

export default Pendaftaran;
