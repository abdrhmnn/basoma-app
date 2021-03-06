// styling component linked in success_pendaftaran_bantuan.scss file

import React, { useState, useEffect } from "react";

// img
import success_img from "../../images/success_img.svg";

// npm packages
import { CircularProgress, Button } from "@mui/material";
import { Link } from "react-router-dom";

const SuccessPendaftaranBantuan = () => {
	const [isLoadContent, setIsLoadContent] = useState(false);

	useEffect(() => {
		document.title = "Pendaftaran Bantuan Sosial Berhasil";
		setTimeout(() => {
			setIsLoadContent(true);
		}, 2000);
	}, []);

	return (
		<div className="success-pendaftaran-bantuan">
			{isLoadContent ? (
				<div>
					<div className="success-title">
						<h3>Basoma</h3>
					</div>
					<div className="success-content">
						<img src={success_img} alt="Pendaftaran Bantuan Berhasil" />
						<h2>Pendaftaran Bantuan Berhasil !</h2>
						<p>
							Data akan di review selama 2x24 jam, pemberitahuan akan
							ditampilkan dihalaman notifikasi atau bisa akses{" "}
							<Link
								to="/pemberitahuan"
								style={{
									color: "white",
								}}
							>
								disini!
							</Link>
						</p>
						<Button
							variant="outlined"
							component={Link}
							to="/"
							className="btn_back"
						>
							kembali ke beranda
						</Button>
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
					<CircularProgress sx={{ color: "white" }} />
				</div>
			)}
		</div>
	);
};

export default SuccessPendaftaranBantuan;
