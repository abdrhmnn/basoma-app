import React, { useState, useEffect } from "react";

// components
import NavbarAdmin from "./NavbarAdmin";
import HeaderAdmin from "./HeaderAdmin";

// API storage
import API from "../../api";

// npm packages
import { useLocation, useNavigate } from "react-router-dom";
import {
	TextField,
	FormControl,
	Radio,
	RadioGroup,
	FormControlLabel,
	Button,
	Alert,
	CircularProgress,
} from "@mui/material";

const WargaDetail = () => {
	const [wargaByNoKTP, setWargaByNoKTP] = useState(null);
	const [nilaiPrioritas, setNilaiPrioritas] = useState(null);
	const [nilaiCI, setNilaiCI] = useState(null);
	const [nilaiCR, setNilaiCR] = useState(null);
	const [pemberitahuan, setPemberitahuan] = useState(null);
	const [bantuanByID, setBantuanByID] = useState(null);

	const [statusPenerimaan, setStatusPenerimaan] = useState("");
	const [alasanPenerimaan, setAlasanPenerimaan] = useState("");
	const [alertKeputusan, setAlertKeputusan] = useState(false);

	const [isSubmitPenerimaan, setIsSubmitPenerimaan] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		API.getWargaByNoKTP(location.state.ui).then((res) =>
			setWargaByNoKTP(res.data)
		);
		API.getPrioritasByUserID(location.state.uid).then((res) =>
			setNilaiPrioritas(res.data.total_nilai)
		);
		API.getAlternatifByUserID(location.state.uid).then((res) => {
			setNilaiCI(res.data.nilai_ci);
			setNilaiCR(res.data.nilai_cr);
		});
		API.getAllPemberitahuan().then((res) => setPemberitahuan(res.data));
		API.getBantuanByID(location.state.bi).then((res) =>
			setBantuanByID(res.data)
		);
	}, [location]);

	const showAlasanPenerimaan = (status) => {
		if (status === "ditolak")
			return (
				<div className="status_ditolak">
					<p>Alasan</p>
					<TextField
						name="status_ditolak"
						variant="outlined"
						fullWidth
						autoComplete="off"
						multiline
						rows={3}
						onChange={(e) => setAlasanPenerimaan(e.target.value)}
					/>
				</div>
			);

		return null;
	};

	return (
		<div style={{ display: "flex" }}>
			<NavbarAdmin />
			<div className="flex_header_admin">
				<HeaderAdmin />
				<div className="content_dashboard_admin">
					<h2>Data warga</h2>
					{wargaByNoKTP && nilaiPrioritas && nilaiCI && nilaiCR && (
						<div className="wrap_detail_warga">
							<div className="nilai_perhitungan">
								<h2>Hasil perbandingan alternatif</h2>
								<div className="nilai_prio_rangking">
									<div className="nilai_prioritas">
										<p>Nilai prioritas :</p>
										<TextField
											name="nilai_prioritas"
											variant="outlined"
											fullWidth
											defaultValue={`${nilaiPrioritas}%`}
											disabled={true}
										/>
									</div>
									<div className="nilai_rangking">
										<p>Nilai rangking :</p>
										<TextField
											name="nilai_rangking"
											variant="outlined"
											fullWidth
											defaultValue={`${wargaByNoKTP.nilai_rangking}%`}
											disabled={true}
										/>
									</div>
								</div>
								<div className="nilai_ci_cr">
									<div className="nilai_ci">
										<p>Nilai CI :</p>
										<TextField
											name="nilai_ci"
											variant="outlined"
											fullWidth
											defaultValue={`${nilaiCI}`}
											disabled={true}
										/>
									</div>
									<div className="nilai_cr">
										<p>Nilai CR :</p>
										<TextField
											name="nilai_cr"
											variant="outlined"
											fullWidth
											defaultValue={`${nilaiCR}`}
											disabled={true}
										/>
									</div>
								</div>
							</div>
							<div className="data_diri_alternatif">
								<h2>Data diri alternatif</h2>
								<div className="flex_nik_nm_lengkap">
									<div className="nik">
										<p>Nomor induk keluarga :</p>
										<TextField
											name="no_ktp"
											variant="outlined"
											fullWidth
											defaultValue={`${wargaByNoKTP.no_ktp}`}
											disabled={true}
										/>
									</div>
									<div className="nm_lengkap">
										<p>Nama lengkap :</p>
										<TextField
											name="nm_lengkap"
											variant="outlined"
											fullWidth
											defaultValue={`${wargaByNoKTP.nama_lengkap}`}
											disabled={true}
										/>
									</div>
								</div>
								<div className="alamat">
									<p>Alamat tempat tinggal :</p>
									<TextField
										name="alamat"
										variant="outlined"
										fullWidth
										defaultValue={`${wargaByNoKTP.alamat}`}
										disabled={true}
										multiline
										rows={4}
									/>
								</div>
								<div className="flex_pekerjaan_penghasilan">
									<div className="pekerjaan">
										<p>Pekerjaan atau Profesi saat ini :</p>
										<TextField
											name="pekerjaan"
											variant="outlined"
											fullWidth
											defaultValue={`${wargaByNoKTP.pekerjaan}`}
											disabled={true}
										/>
									</div>
									<div className="penghasilan">
										<p>Penghasilan per-bulan :</p>
										<TextField
											name="penghasilan"
											variant="outlined"
											fullWidth
											defaultValue={`${wargaByNoKTP.penghasilan} Jt per-bulan`}
											disabled={true}
										/>
									</div>
								</div>
								<div className="flex_pendidikan_luas_rumah">
									<div className="pendidikan">
										<p>Pendidikan terakhir :</p>
										<TextField
											name="pendidikan"
											variant="outlined"
											fullWidth
											defaultValue={`${wargaByNoKTP.pendidikan}`}
											disabled={true}
										/>
									</div>
									<div className="luas_rumah">
										<p>Luas bangunan tempat tinggal :</p>
										<TextField
											name="luas_bangunan"
											variant="outlined"
											fullWidth
											defaultValue={`${wargaByNoKTP.luas_bangunan} Meter`}
											disabled={true}
										/>
									</div>
								</div>
								<div className="sumber_penerangan">
									<p>Sumber penerangan rumah :</p>
									<TextField
										name="sumber_penerangan_rumah"
										variant="outlined"
										fullWidth
										defaultValue={`${wargaByNoKTP.sumber_penerangan_rumah}`}
										disabled={true}
									/>
								</div>
								<div className="flex_foto_ktp_bangunan">
									<div className="ft_ktp">
										<p>Foto Kartu tanda penduduk :</p>
										<img
											src={API.showImgKTP(wargaByNoKTP.foto_ktp)}
											alt="Foto KTP"
										/>
									</div>
									<div className="ft_bangunan">
										<p>Foto bangunan tempat tinggal :</p>
										<img
											src={API.showImgBangunan(
												wargaByNoKTP.foto_bangunan_rumah
											)}
											alt="Foto tempat tinggal"
										/>
									</div>
								</div>
								<div className="keputusan_penerimaan">
									<h2>Penerimaan keputusan</h2>
									{alertKeputusan ? (
										<Alert
											variant="outlined"
											severity="warning"
											sx={{ mt: 2 }}
										>
											Status atau alasan penerimaan masih kosong!
										</Alert>
									) : null}
									<div className="keputusan_akhir">
										{wargaByNoKTP.status_penerimaan !== "pending" ? (
											<p>
												Warga sudah{" "}
												<b>{wargaByNoKTP.status_penerimaan}!</b>.
											</p>
										) : (
											<div>
												<p>Status penerimaan</p>
												<FormControl
													component="fieldset"
													sx={{ display: "block" }}
												>
													<RadioGroup
														row
														name="status_penerimaan"
														onChange={(e) =>
															setStatusPenerimaan(e.target.value)
														}
													>
														<FormControlLabel
															value="diterima"
															control={<Radio />}
															label="Diterima"
														/>
														<FormControlLabel
															value="ditolak"
															control={<Radio />}
															label="Ditolak"
														/>
													</RadioGroup>
												</FormControl>
												{showAlasanPenerimaan(statusPenerimaan)}
												<Button
													variant="contained"
													sx={{
														marginTop: "14px",
													}}
													type="submit"
													className={
														isSubmitPenerimaan
															? "submit_penerimaan"
															: ""
													}
													onClick={() => {
														let pemberitahuanLength =
															pemberitahuan.length + 1;

														if (!statusPenerimaan) {
															setAlertKeputusan(true);
														} else if (
															statusPenerimaan === "diterima"
														) {
															setAlertKeputusan(false);
															setIsSubmitPenerimaan(true);

															setTimeout(() => {
																setIsSubmitPenerimaan(false);
																API.updateStatusWargaByUserID(
																	wargaByNoKTP.user_id,
																	statusPenerimaan
																);
																API.savePemberitahuan(
																	pemberitahuanLength++,
																	wargaByNoKTP.user_id,
																	"kosong"
																);
																API.updateBantuan(
																	wargaByNoKTP.id_bantuan,
																	{
																		kapasitas:
																			bantuanByID.kapasitas -
																			1,
																	}
																);
																navigate(
																	"/pendaftaran-bantuan-detail",
																	{
																		state: {
																			id_bantuan:
																				wargaByNoKTP.id_bantuan,
																			alert_penerimaan: true,
																		},
																	}
																);
															}, 3000);
														} else if (
															statusPenerimaan === "ditolak" &&
															!alasanPenerimaan
														) {
															setAlertKeputusan(true);
														} else {
															setAlertKeputusan(false);
															setIsSubmitPenerimaan(true);

															setTimeout(() => {
																setIsSubmitPenerimaan(false);
																API.updateStatusWargaByUserID(
																	wargaByNoKTP.user_id,
																	statusPenerimaan
																);
																API.savePemberitahuan(
																	pemberitahuanLength++,
																	wargaByNoKTP.user_id,
																	alasanPenerimaan
																);
																navigate(
																	"/pendaftaran-bantuan-detail",
																	{
																		state: {
																			id_bantuan:
																				wargaByNoKTP.id_bantuan,
																			alert_penerimaan: true,
																		},
																	}
																);
															}, 3000);
														}
													}}
												>
													{isSubmitPenerimaan ? (
														<CircularProgress
															size={23}
															sx={{
																color: "white",
																opacity: ".6",
															}}
														/>
													) : (
														"submit"
													)}
												</Button>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default WargaDetail;
