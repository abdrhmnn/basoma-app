// styling component linked in pemberitahuan.scss file

import React, { useState, useEffect } from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";

// Cookie storage
import kuki from "../../kuki";

// API storage
import API from "../../api";

// npm packages
import { Alert } from "@mui/material";

const Pemberitahuan = () => {
	const [wargaByUserID, setWargaByUserID] = useState(null);
	const [pemberitahuanByUserID, setPemberitahuanByUserID] = useState(null);

	useEffect(() => {
		document.title = "Pemberitahuan Bantuan Sosial";
		getWargaByUserID();
		getPemberitahuanByUserID();
	}, []);

	const getWargaByUserID = async () => {
		const response = await API.getWargaByUserID(kuki.get("user_id"));
		setWargaByUserID(response.data);
	};

	const getPemberitahuanByUserID = async () => {
		const response = await API.getPemberitahuanByUserID(kuki.get("user_id"));
		setPemberitahuanByUserID(response.data);
	};

	return (
		<div>
			<Navbar />
			<div className="pemberitahuan_content">
				<Alert
					variant="outlined"
					severity="info"
					className="alert_info_pemberitahuan"
				>
					<span style={{ fontWeight: "bold" }}>PERHATIKAN!</span>,
					Pemberitahuan mengenai hasil keputusan calon penerimaan BPNT akan
					ditampilkan disini.
				</Alert>
				{wargaByUserID && pemberitahuanByUserID && pemberitahuanByUserID ? (
					<div className="data_pemberitahuan">
						<Alert
							variant="outlined"
							severity={
								wargaByUserID.status_rekomendasi === "memenuhi"
									? "success"
									: "error"
							}
							icon={false}
							className="alert_pemberitahuan"
						>
							<div className="data_diri_pemberitahuan">
								<div className="nik_nm_lengkap_pemberitahuan">
									<div className="nik_alternatif">
										<span>Nomor Kartu Keluarga : </span>
										<span>{wargaByUserID.no_kk}</span>
									</div>
									<div className="nm_lengkap_alternatif">
										<span>Nama lengkap : </span>
										<span>{wargaByUserID.nama_lengkap}</span>
									</div>
								</div>
								<div className="alamat_status_pemberitahuan">
									<div className="alamat_alternatif">
										<span>Alamat : </span>
										<span>{wargaByUserID.alamat}</span>
									</div>
									<div className="status_alternatif">
										<span>Hasil keputusan : </span>
										<span>
											{wargaByUserID.status_rekomendasi}{" "}
											{wargaByUserID.status_rekomendasi
												? "(Diterima)"
												: "(Ditolak)"}
										</span>
									</div>
								</div>
								{wargaByUserID.status_rekomendasi ===
								"tidak memenuhi" ? (
									<div className="masukan_admin">
										<span>Keterangan : </span>
										<span>{pemberitahuanByUserID.alasan}</span>
									</div>
								) : null}
							</div>
						</Alert>
						{wargaByUserID.status_rekomendasi === "memenuhi" ? (
							<p style={{ marginTop: "40px" }}>
								<b>SELAMAT!</b>, Anda diterima sebagai calon penerima
								bantuan pangan non tunai, silahkan datang ke kelurahan
								Porisgaga untuk mengambil kartu elektronik yang dapat
								ditukarkan dengan sembako senilai Rp. 200.000 melalui
								E-warung. Pastikan anda membawa KK atau KTP asli pada
								saat pengambilan, terima kasih.
							</p>
						) : (
							<p style={{ marginTop: "40px" }}>
								<b>MOHON MAAF!</b>, Anda tidak diterima sebagai calon
								penerima bantuan pangan non tunai karena berdasarkan
								hasil akhir keputusan anda dinyatakan tidak layak untuk
								menerima bantuan, terima kasih.
							</p>
						)}
					</div>
				) : (
					<div className="tidak_ada_pemberitahuan">
						<p>Tidak ada pemberitahuan.</p>
					</div>
				)}
			</div>
			<Footer class_pemberitahuan="pemberitahuan_foot" />
		</div>
	);
};

export default Pemberitahuan;
