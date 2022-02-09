// styling component linked in bantuan.scss file

import React from "react";

// npm packages
import { Box, Typography } from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";
import { AES } from "crypto-js";

const BantuanList = ({ bantuan }) => {
	const navigate = useNavigate();

	return bantuan.map((e, i) => (
		<Box
			key={i}
			sx={{
				height: 150,
				p: 3,
				borderRadius: 3,
			}}
			onClick={() =>
				navigate({
					pathname: "/bantuan-detail",
					search: `?${createSearchParams({
						bi: AES.encrypt(e.kd_bantuan, "bantuan_id"),
					}).toString()}`,
				})
			}
		>
			{/* Nama dan penyelenggara bantuan */}
			<Typography variant="h4" style={{ fontSize: "1.9em" }}>
				{e.nama}
			</Typography>
			<p style={{ fontSize: ".9em" }}>Bantuan ini diberikan oleh: abdu</p>
			{/* Akhir nama dan penyelenggara bantuan */}

			<hr />

			{/* Kapasitas bantuan */}
			<div className="detail_bantuan">
				<div className="kapasitas">
					<p>
						Kapasitas: <span>{e.kapasitas}</span>
					</p>
				</div>
			</div>
			{/* Akhir kapasitas bantuan */}
		</Box>
	));
};

export default BantuanList;
