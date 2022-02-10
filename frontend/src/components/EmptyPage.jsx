// styling component linked in empty_page.scss file

import React, { useState, useEffect } from "react";

// img
import not_found from "../images/page_not_found.svg";

// npm packages
import { Link } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";

const EmptyPage = () => {
	const [isLoadContent, setIsLoadContent] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoadContent(true);
		}, 2000);
	}, []);

	return (
		<div>
			{isLoadContent ? (
				<div className="empty_page">
					<h2>Basoma</h2>
					<div className="flex_empty_page">
						<img src={not_found} alt="Halaman tidak ditemukan" />
						<h2>Halaman tidak ditemukan!</h2>
						<Button variant="contained" component={Link} to="/">
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
					<CircularProgress />
				</div>
			)}
		</div>
	);
};
export default EmptyPage;
