// styling component linked in page_awal_kuesioner.scss file

import React from "react";

// npm packages
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const PageAwalKuesioner = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<div className="panduan">
			<div className="logo_app">
				<h2>Basoma</h2>
			</div>
			<div className="panduan_pendaftaran">
				<h1>Sebelum melakukan pendaftaran</h1>
				<p>Silahkan lengkapi beberapa pertanyaan yang akan diberikan</p>
				<Button
					variant="contained"
					onClick={() =>
						navigate("/kuesioner-pendaftaran", {
							state: location.state,
						})
					}
				>
					mulai
				</Button>
			</div>
		</div>
	);
};

export default PageAwalKuesioner;
