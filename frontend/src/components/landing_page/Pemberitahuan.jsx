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
					Pemberitahuan tentang bantuan sosial akan ditampilkan disini.
				</Alert>
				{wargaByUserID && pemberitahuanByUserID && pemberitahuanByUserID ? (
					<div className="data_pemberitahuan">
						<Alert
							variant="outlined"
							severity={
								wargaByUserID.status_penerimaan === "diterima"
									? "success"
									: "error"
							}
							icon={false}
							className="alert_pemberitahuan"
						>
							<div className="data_diri_pemberitahuan">
								<div className="nik_nm_lengkap_pemberitahuan">
									<div className="nik_alternatif">
										<span>Nomor Induk Kependudukan : </span>
										<span>{wargaByUserID.no_ktp}</span>
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
										<span>{wargaByUserID.status_penerimaan}</span>
									</div>
								</div>
								{wargaByUserID.status_penerimaan === "ditolak" ? (
									<div className="masukan_admin">
										<span>Pesan dari admin : </span>
										<span>{pemberitahuanByUserID.alasan}</span>
									</div>
								) : null}
							</div>
						</Alert>
						{wargaByUserID.status_penerimaan === "diterima" ? (
							<p style={{ marginTop: "40px" }}>
								<b>SELAMAT!</b>, Anda diterima untuk sebagai calon
								penerima bantuan sosial, silahkan datang ke lokasi
								bantuan, terima kasih
							</p>
						) : (
							<p style={{ marginTop: "40px" }}>
								<b>MOHON MAAF!</b>, Anda tidak diterima sebagai calon
								penerima bantuan sosial, terima kasih
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
