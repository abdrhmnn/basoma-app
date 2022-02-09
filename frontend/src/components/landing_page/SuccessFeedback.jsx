// styling component linked in feed_success.scss file

import React, { useState, useEffect } from "react";

// img
import thanks from "./../../images/thanks.svg";

// npm packages
import { Link } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";

const SuccessFeedback = () => {
	const [isLoadContent, setIsLoadContent] = useState(false);

	useEffect(() => {
		document.title = "Tentang Bantuan Sosial Masyarakat";
		setTimeout(() => {
			setIsLoadContent(true);
		}, 2000);
	}, []);

	return (
		<div>
			{isLoadContent ? (
				<div className="feed_success">
					<div className="flex_success">
						<img src={thanks} alt="Terima Kasih" />
						<h1>Terima kasih!</h1>
						<p>Sudah memberikan masukan untuk aplikasi ini</p>
						<Button
							variant="contained"
							component={Link}
							to="/"
							className="btn_kembali"
						>
							Kembali ke beranda
						</Button>
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
		</div>
	);
};

export default SuccessFeedback;
