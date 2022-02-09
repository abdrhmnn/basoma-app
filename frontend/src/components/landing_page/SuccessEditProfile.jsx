// styling component linked in success_edit_profile.scss file

import React, { useState, useEffect } from "react";

// img
import success from "../../images/success_img.svg";

// npm packages
import { Link } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";

const SuccessEditProfile = () => {
	const [isLoadContent, setIsLoadContent] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoadContent(true);
		}, 2000);
	}, []);

	return (
		<div>
			{isLoadContent ? (
				<div className="success_edit_profile">
					<img src={success} alt="Profile berhasil diubah!" />
					<h2>Profile berhasil diubah!</h2>
					<Button variant="contained" component={Link} to="/">
						kembali ke beranda
					</Button>
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

export default SuccessEditProfile;
