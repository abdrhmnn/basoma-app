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
import { useLocation, Link } from "react-router-dom";
import { Button, CircularProgress, Alert } from "@mui/material";
import { AES, enc } from "crypto-js";

const BantuanDetail = ({ activeNav }) => {
	const [isLoadContent, setIsLoadContent] = useState(false);

	const [bantuanByID, setBantuanByID] = useState(null);
	const [userByID, setUserByID] = useState(null);

	const location = useLocation();

	useEffect(() => {
		document.title = "Detail Bantuan";
		getUserByID();

		const params = new URLSearchParams(location.search);
		const bi = AES.decrypt(params.get("bi"), "bantuan_id").toString(enc.Utf8);

		API.getBantuanByID(bi).then((res) => {
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
									Batas pengisian kuesioner hanya satu kali, Anda sudah
									tidak bisa mengisi kuesioner pendaftaran bantuan
									lagi.
								</Alert>
							) : null}
						</div>
					)}

					{kuki.get("user_id") ? null : (
						<Alert variant="outlined" severity="warning" sx={{ mb: 2 }}>
							<span style={{ fontWeight: "bold" }}>PERHATIKAN!</span>,
							silahkan login terlebih dahulu untuk bisa melakukan
							pendaftaran.
						</Alert>
					)}

					<div className="bantuan_detail_content">
						{/* Info nama dan deskripsi bantuan */}
						<div className="info_nama_and_deskripsi">
							<h1>{bantuanByID.nama}</h1>
							<p>
								Bantuan ini diberikan oleh <span>test</span>
							</p>
							<img src={img1} alt="Bantuan Sosial Banner" />
							<h2>Deskripsi</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing
								elit. Unde perspiciatis amet, doloribus eos quo dicta
								fugiat. Magnam ipsum tenetur, dolorem dicta sed
								blanditiis. A nihil consequuntur placeat vel delectus
								natus.
							</p>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing
								elit. Unde perspiciatis amet, doloribus eos quo dicta
								fugiat. Magnam ipsum tenetur, dolorem dicta sed
								blanditiis. A nihil consequuntur placeat vel delectus
								natus.
							</p>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing
								elit. Unde perspiciatis amet, doloribus eos quo dicta
								fugiat. Magnam ipsum tenetur, dolorem dicta sed
								blanditiis. A nihil consequuntur placeat vel delectus
								natus.
							</p>
						</div>
						{/* Akhir info nama dan deskripsi bantuan */}

						{/* Info kapasitas bantuan */}
						<div className="group_kapasitas_and_btn">
							<div className="info_kapasitas">
								<div className="kapasitas">
									<h2>Kapasitas</h2>
									<p>{bantuanByID.kapasitas} Orang</p>
								</div>
							</div>
							<Button
								variant="contained"
								className="btn_daftar_bantuan"
								component={Link}
								to="/panduan-pendaftaran"
								disabled={kuki.get("user_id") ? false : true}
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
