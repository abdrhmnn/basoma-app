// styling component linked in bantuan_detail.scss file

import React, { useState, useEffect } from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";

// Cookie storage
import kuki from "../../kuki";

// API storage
import API from "../../api";

// img
import img1 from "./../../images/test.png";

// npm packages
import { useLocation, useNavigate } from "react-router-dom";
import { Button, CircularProgress, Alert } from "@mui/material";

const BantuanDetail = ({ activeNav }) => {
	const [isLoadContent, setIsLoadContent] = useState(false);

	const [bantuanByID, setBantuanByID] = useState(null);
	const [userByID, setUserByID] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (kuki.get("bantuan_id")) {
			kuki.remove("bantuan_id");
			kuki.remove("nilai_ci");
			kuki.remove("nilai_cr");
			kuki.remove("nilai_rangking");
		}

		document.title = "Detail Bantuan";
		getUserByID();

		API.getBantuanByID(location.state).then((res) => {
			setBantuanByID(res.data);
		});

		setTimeout(() => {
			setIsLoadContent(true);
		}, 2000);
	}, [location]);

	const getUserByID = async () => {
		const response = await API.getUserByID(kuki.get("user_id"));
		setUserByID(response.data);
	};

	return (
		<div>
			<Navbar dataBantuan="true" />

			{/* Component bantuan detail */}
			{isLoadContent ? (
				<div className="bantuan_detail">
					{userByID && (
						<div>
							{userByID.status_pengisian === "sudah" ? (
								<Alert
									variant="outlined"
									severity="warning"
									sx={{ mt: 2, mb: 2 }}
								>
									Anda sudah tidak bisa melakukan pendaftaran bantuan
									lagi.
								</Alert>
							) : null}
						</div>
					)}

					{kuki.get("user_id") ? null : (
						<Alert
							variant="outlined"
							severity="warning"
							sx={{ mb: 2 }}
							className="alert_bantuan_detail"
						>
							<span style={{ fontWeight: "bold" }}>PERHATIKAN!</span>,
							silahkan login terlebih dahulu untuk bisa melakukan
							pendaftaran.
						</Alert>
					)}

					<div className="bantuan_detail_content">
						{/* Info nama dan deskripsi bantuan */}
						<div className="info_nama_and_deskripsi">
							<h2>{bantuanByID.nama}</h2>
							<img
								src={API.showImgBantuan(bantuanByID.banner)}
								alt="Bantuan Sosial Banner"
							/>
							<h2>Deskripsi</h2>
							<div className="deskripsi_bantuan">
								<p>{bantuanByID.deskripsi}</p>
							</div>
						</div>
						{/* Akhir info nama dan deskripsi bantuan */}

						{/* Info kapasitas bantuan */}
						<div className="group_kapasitas_and_btn">
							<div className="info_kapasitas">
								<div className="kapasitas">
									<h2>Kapasitas</h2>
									<p>{bantuanByID.kapasitas} Orang</p>
								</div>
								<div className="alamat">
									<h2>Lokasi</h2>
									<p>{bantuanByID.alamat}</p>
								</div>
							</div>
							<Button
								variant="contained"
								className="btn_daftar_bantuan"
								disabled={kuki.get("user_id") ? false : true}
								onClick={() => {
									navigate("/panduan-pendaftaran", {
										state: location.state,
									});
								}}
							>
								Daftar
							</Button>
						</div>
						{/* Akhir info kapasitas bantuan */}
					</div>
				</div>
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
			{/* Akhir component bantuan detail */}

			<Footer
				class_bantuan_detail="bantuan_detail_foot"
				active_foot={activeNav}
			/>
		</div>
	);
};

export default BantuanDetail;
