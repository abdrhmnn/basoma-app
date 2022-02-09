// styling component linked in join_us.scss file

import React from "react";

// npm packages
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const JoinUs = () => {
	return (
		<div className="join_us">
			<h1>Siap untuk membantu</h1>
			<p>
				Basoma hadir untuk membantu warga yang berhak untuk mendapatkan
				bantuan sosial
			</p>
			<Button
				variant="contained"
				className="btn_join"
				component={Link}
				to="/register"
			>
				Daftar Sekarang
			</Button>
		</div>
	);
};

export default JoinUs;
