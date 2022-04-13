import React from "react";

// npm packages
import { Alert } from "@mui/material";

const HasilRekomendasiPetugas = ({ status_rekomendasi, hasil_survey }) => {
	return (
		<div>
			{status_rekomendasi === "memenuhi" ? (
				<Alert severity="success" variant="outlined">
					Warga sudah dinyatakan memenuhi untuk mendapatkan bantuan dengan
					hasil akhir sebesar {hasil_survey}%
				</Alert>
			) : (
				<Alert severity="error" variant="outlined">
					Warga sudah dinyatakan tidak memenuhi untuk mendapatkan bantuan
					dengan hasil akhir sebesar {hasil_survey}%
				</Alert>
			)}
		</div>
	);
};

export default HasilRekomendasiPetugas;
