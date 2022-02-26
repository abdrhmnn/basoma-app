import React, { useState, useEffect } from "react";

// components
import NavbarAdmin from "./NavbarAdmin";
import HeaderAdmin from "./HeaderAdmin";

// API storage
import API from "../../api";

// npm packages
import { useLocation } from "react-router-dom";
import { TextField } from "@mui/material";

const WargaDetail = () => {
	const [wargaByNoKTP, setWargaByNoKTP] = useState(null);
	const [nilaiPrioritas, setNilaiPrioritas] = useState(null);
	const [nilaiCI, setNilaiCI] = useState(null);
	const [nilaiCR, setNilaiCR] = useState(null);

	const location = useLocation();

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
	}, [location]);

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
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default WargaDetail;