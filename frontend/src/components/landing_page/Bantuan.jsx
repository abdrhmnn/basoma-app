// styling component linked in bantuan.scss file

import React, { useState, useEffect } from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";

// API storage
import API from "../../api";

// npm packages
import { TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Bantuan = () => {
	const [bantuan, setBantuan] = useState([]);
	const [searchDataBantuan, setSearchDataBantuan] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Cari Bantuan";
		getAllBantuan();
	}, []);

	const getAllBantuan = async () => {
		const response = await API.getAllBantuan();
		setBantuan(response.data);
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
						onClick={() =>
							navigate("/bantuan-detail", {
								state: e.kd_bantuan,
							})
						}
					>
						<Typography variant="h4" className="judul_bantuan">
							{e.nama}
						</Typography>

						<div className="kapasitas_bantuan">
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
		<div>
			<Navbar />

			{/* Component bantuan content */}
			<div className="bantuan">
				<h1>Bantuan Sosial Masyarakat</h1>

				{/* Search data section */}
				<div className="search_bantuan">
					<TextField
						label="Cari bantuan"
						name="cari_bantuan"
						variant="outlined"
						autoComplete="off"
						onChange={(e) => {
							setSearchDataBantuan(e.target.value);
						}}
					/>
				</div>
				{/* Akhir search data section */}

				<div className="bantuan_content">
					{/* Showing data based on search */}
					<div className="result_bantuan">
						{bantuan && showBantuan(bantuan)}
					</div>
					{/* Akhir showing data based on search */}
				</div>
			</div>
			{/* Akhir component bantuan content */}

			<Footer class_bantuan="bantuan_foot" />
		</div>
	);
};

export default Bantuan;
