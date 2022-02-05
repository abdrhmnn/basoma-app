import React, { useState, useEffect } from "react";

// img
import thanks from "./../../images/thanks.svg";

// npm packages
import { Link } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";

const SuccessRegister = () => {
	const [isLoad, setIsLoad] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoad(true);
		}, 2000);
	}, []);

	return (
		<div>
			{isLoad ? (
				<div className="success_register">
					<div className="register_success">
						<img src={thanks} alt="Terima Kasih" />
						<h1>Pendaftaran berhasil!</h1>
						<p>Silahkan login ke dalam aplikasi</p>
						<Button
							variant="contained"
							component={Link}
							to="/login"
							className="btn_kembali_login"
						>
							Kembali ke login
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

export default SuccessRegister;
