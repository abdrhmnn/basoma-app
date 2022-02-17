import React, { useState, useEffect } from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";

// Cookie storage
import kuki from "../../kuki";

// API storage
import API from "../../api";

// npm packages
import { Alert, TextField, Box, Typography } from "@mui/material";

const Pemberitahuan = () => {
	const [valueCariPemberitahuan, setValueCariPemberitahuan] = useState("");
	const [pemberitahuan, setPemberitahuan] = useState(null);

	useEffect(() => {
		document.title = "Pemberitahuan";
		getPemberitahuanByUserID();
	}, []);

	const getPemberitahuanByUserID = async () => {
		const response = await API.getPemberitahuanByUserID(kuki.get("user_id"));
		setPemberitahuan(response.data);
	};

	const showPemberitahuan = (data) => {
		return data.map((e, i) => {
			if (e.nama.toLowerCase().includes(valueCariPemberitahuan)) {
				return (
					<Box
						key={i}
						sx={{
							height: 90,
							p: 3,
							borderRadius: 3,
						}}
						onClick={() => {
							alert("ok");
						}}
					>
						<Typography variant="h4" style={{ fontSize: "1.35em" }}>
							{e.nama}
						</Typography>

						<div className="status">
							<p>
								Status: <span>{e.status}</span>
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
			<div className="pemberitahuan_content">
				<Alert variant="outlined" severity="info">
					<span style={{ fontWeight: "bold" }}>PERHATIKAN!</span>, semua
					pemberitahuan tentang bantuan sosial dan masukan yang sudah
					diberikan akan ditampilkan disini.
				</Alert>
				<div className="cari_pemberitahuan">
					<TextField
						label="Cari berdasarkan nama"
						name="cari_pemberitahuan"
						variant="outlined"
						sx={{ width: "30%", marginRight: 3 }}
						autoComplete="off"
						onChange={(e) => {
							setValueCariPemberitahuan(e.target.value);
						}}
					/>
				</div>
				<div className="data_pemberitahuan">
					<div className="content">
						{pemberitahuan && showPemberitahuan(pemberitahuan)}
					</div>
				</div>
			</div>
			<Footer class_pemberitahuan="pemberitahuan_foot" />
		</div>
	);
};

export default Pemberitahuan;
