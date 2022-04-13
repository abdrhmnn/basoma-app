import React, { useState, useEffect } from "react";

// API storage
import API from "./../../api";

// components
import NavbarPetugas from "./NavbarPetugas";
import HeaderPetugas from "./HeaderPetugas";

// npm packages
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const PendaftaranBantuanPetugas = () => {
	const [bantuan, setBantuan] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Pendaftaran Bantuan Sosial";
		getAllBantuan();
	}, []);

	const getAllBantuan = async () => {
		const response = await API.getAllBantuan();
		setBantuan(response.data);
	};

	const showBantuan = (data) => {
		return data.map((e, i) => {
			// if (e.nama.toLowerCase().includes(searchDataBantuan)) {
			// }
			return (
				<Box
					key={i}
					sx={{
						height: 50,
						p: 3,
						borderRadius: 3,
					}}
					onClick={() => {
						navigate("/pendaftaran-bantuan-petugas-detail", {
							state: {
								id_bantuan: e.id_bantuan,
							},
						});
					}}
				>
					<Typography
						variant="h4"
						style={{ fontSize: "1.4em", marginBottom: "10px" }}
					>
						{e.nama}
					</Typography>
				</Box>
			);

			// return null;
		});
	};

	return (
		<div style={{ display: "flex" }}>
			<NavbarPetugas />
			<div className="flex_header_admin">
				<HeaderPetugas />
				<div className="content_dashboard_admin">
					<h2>Pendaftaran Bantuan</h2>

					<div className="pendaftaran_bantuan_petugas">
						<div className="list_bantuan_petugas">
							{bantuan && showBantuan(bantuan)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PendaftaranBantuanPetugas;
