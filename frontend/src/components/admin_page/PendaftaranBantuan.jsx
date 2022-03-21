// styling component linked in pendaftaran_bantuan.scss file

import React, { useState, useEffect } from "react";

// API storage
import API from "./../../api";

// components
import NavbarAdmin from "./NavbarAdmin";
import HeaderAdmin from "./HeaderAdmin";

// npm packages
import { TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PendaftaranBantuan = () => {
	const [bantuan, setBantuan] = useState(null);
	const [searchDataBantuan, setSearchDataBantuan] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Kelola Pendaftaran Bantuan Sosial";
		getAllBantuan();
	}, []);

	const getAllBantuan = async () => {
		const response = await API.getAllBantuan();
		setBantuan(response.data);
	};

	const handleChange = (e) => {
		setSearchDataBantuan(e.target.value);
	};

	const showBantuan = (data) => {
		return data.map((e, i) => {
			if (e.nama.toLowerCase().includes(searchDataBantuan)) {
				return (
					<Box
						key={i}
						sx={{
							height: 90,
							p: 3,
							borderRadius: 3,
						}}
						onClick={() => {
							navigate("/pendaftaran-bantuan-detail", {
								state: {
									id_bantuan: e.id_bantuan,
									alert_penerimaan: false,
								},
							});
						}}
					>
						<Typography variant="h4" style={{ fontSize: "1.7em" }}>
							{e.nama}
						</Typography>

						<div style={{ fontSize: ".9em" }}>
							<p>
								Kapasitas: <span>{e.kapasitas} orang</span>
							</p>
						</div>
					</Box>
				);
			}

			return null;
		});
	};

	return (
		<div style={{ display: "flex" }}>
			<NavbarAdmin />
			<div className="flex_header_admin">
				<HeaderAdmin />
				<div className="content_dashboard_admin">
					<h2>Data Bantuan</h2>
					<div className="wrap_tbl_pendaftaran_bantuan">
						<div className="flex_element_pendaftaran">
							<TextField
								label="Cari data berdasarkan nama"
								name="cari_pendaftaran"
								variant="outlined"
								sx={{ width: "30%" }}
								onChange={handleChange}
								autoComplete="off"
							/>
						</div>
						<div className="list_bantuan">
							{bantuan && showBantuan(bantuan)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PendaftaranBantuan;
